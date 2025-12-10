import type { EventContext } from "@cloudflare/workers-types";

interface GamePoint {
  gameNumber: number;
  points: number;
}

interface GameScoresBody {
  userId: string;
  gamePoints: GamePoint[];
}

export const onRequestPost = async (
  context: EventContext<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { pickleball_score_tracker_database: any },
    "",
    { message: string }
  >
) => {
  try {
    const body: GameScoresBody = await context.request.json();

    const { userId, gamePoints } = body;

    // Validate required fields
    if (!userId || !gamePoints || !Array.isArray(gamePoints)) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: userId, gamePoints (array)",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate gamePoints array is not empty
    if (gamePoints.length === 0) {
      return new Response(
        JSON.stringify({ error: "gamePoints array cannot be empty" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate each game point
    for (const gamePoint of gamePoints) {
      if (
        gamePoint.gameNumber === undefined ||
        gamePoint.points === undefined
      ) {
        return new Response(
          JSON.stringify({
            error: "Each game point must have gameNumber and points",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      if (gamePoint.points < 0 || gamePoint.points > 99) {
        return new Response(
          JSON.stringify({ error: "Points must be between 0 and 99" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // Get the active week
    const activeWeek = await context.env.pickleball_score_tracker_database
      .prepare("SELECT * FROM Weeks WHERE active = true")
      .bind()
      .first();

    if (!activeWeek) {
      return new Response(
        JSON.stringify({ error: "No active week found" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Prepare batch upsert statements
    const upsertStatements = [];

    for (const gamePoint of gamePoints) {
      // Check if game score already exists
      const existingScore = await context.env.pickleball_score_tracker_database
        .prepare(
          "SELECT * FROM GameScores WHERE userId = ? AND weekId = ? AND gameNumber = ?"
        )
        .bind(userId, activeWeek.weekId, gamePoint.gameNumber)
        .first();

      if (existingScore) {
        // Update existing score
        upsertStatements.push(
          context.env.pickleball_score_tracker_database
            .prepare(
              "UPDATE GameScores SET points = ?, active = ?, previous = ? WHERE gameScoreId = ?"
            )
            .bind(
              gamePoint.points,
              true,
              false,
              existingScore.gameScoreId
            )
        );
      } else {
        // Insert new score
        const gameScoreId = crypto.randomUUID();
        upsertStatements.push(
          context.env.pickleball_score_tracker_database
            .prepare(
              "INSERT INTO GameScores (gameScoreId, userId, weekId, gameNumber, points, active, previous) VALUES (?, ?, ?, ?, ?, ?, ?)"
            )
            .bind(
              gameScoreId,
              userId,
              activeWeek.weekId,
              gamePoint.gameNumber,
              gamePoint.points,
              true,
              false
            )
        );
      }
    }

    // Execute batch upsert
    await context.env.pickleball_score_tracker_database.batch(upsertStatements);

    return new Response(
      JSON.stringify({
        message: "Game scores upserted successfully",
        count: gamePoints.length,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to process game scores",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
