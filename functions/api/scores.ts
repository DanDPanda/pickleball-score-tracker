import type { EventContext } from "@cloudflare/workers-types";

interface ScoreBody {
  userId: string;
  weekNumber: number;
  amount: number;
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
    const body: ScoreBody = await context.request.json();

    const { userId, weekNumber, amount } = body;

    // Validate required fields
    if (!userId || weekNumber === undefined || amount === undefined) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: userId, weekNumber, amount",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Validate amount is within valid range
    if (amount < 0 || amount > 99) {
      return new Response(
        JSON.stringify({ error: "Amount must be between 0 and 99" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if score already exists for this user and week
    const existingScore = await context.env.pickleball_score_tracker_database
      .prepare("SELECT * FROM Scores WHERE userId = ? AND weekNumber = ?")
      .bind(userId, weekNumber)
      .first();

    if (existingScore) {
      // Update existing score
      await context.env.pickleball_score_tracker_database
        .prepare(
          "UPDATE Scores SET amount = ?, active = ? WHERE scoreId = ?"
        )
        .bind(amount, true, existingScore.scoreId)
        .run();

      return new Response(
        JSON.stringify({
          message: "Score updated successfully",
          scoreId: existingScore.scoreId,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      // Create new score
      const scoreId = crypto.randomUUID();

      await context.env.pickleball_score_tracker_database
        .prepare(
          "INSERT INTO Scores (scoreId, userId, weekNumber, amount, active) VALUES (?, ?, ?, ?, ?)"
        )
        .bind(scoreId, userId, weekNumber, amount, true)
        .run();

      return new Response(
        JSON.stringify({
          message: "Score created successfully",
          scoreId,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to process score",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const onRequestDelete = async (
  context: EventContext<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { pickleball_score_tracker_database: any },
    "",
    { message: string }
  >
) => {
  try {
    const url = new URL(context.request.url);
    const scoreId = url.searchParams.get("scoreId");
    const userId = url.searchParams.get("userId");
    const weekNumber = url.searchParams.get("weekNumber");

    // Allow deletion by scoreId OR by userId + weekNumber
    if (!scoreId && (!userId || !weekNumber)) {
      return new Response(
        JSON.stringify({
          error: "Must provide either scoreId OR both userId and weekNumber",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (scoreId) {
      // Delete by scoreId
      const result = await context.env.pickleball_score_tracker_database
        .prepare("DELETE FROM Scores WHERE scoreId = ?")
        .bind(scoreId)
        .run();

      if (result.meta.changes === 0) {
        return new Response(
          JSON.stringify({ error: "Score not found" }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    } else {
      // Delete by userId and weekNumber
      const result = await context.env.pickleball_score_tracker_database
        .prepare("DELETE FROM Scores WHERE userId = ? AND weekNumber = ?")
        .bind(userId, parseInt(weekNumber!))
        .run();

      if (result.meta.changes === 0) {
        return new Response(
          JSON.stringify({ error: "Score not found" }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    return new Response(
      JSON.stringify({ message: "Score deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to delete score",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
