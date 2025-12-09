import type { EventContext } from "@cloudflare/workers-types";

interface ScoreBody {
  userId: string;
  activeWeekNumber: number;
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

    const { userId, amount, activeWeekNumber } = body;

    // Validate required fields
    if (!userId || amount === undefined) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: userId, amount",
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
    const [score] = await context.env.pickleball_score_tracker_database
      .prepare("SELECT * FROM Scores WHERE userId = ? AND weekNumber = ?")
      .bind(userId, activeWeekNumber)
      .run();

    if (score) {
      // Update existing score
      await context.env.pickleball_score_tracker_database
        .prepare("UPDATE Scores SET amount = ?, active = ? WHERE scoreId = ?")
        .bind(amount, true, score.scoreId)
        .run();

      return new Response(
        JSON.stringify({
          message: "Score updated successfully",
          scoreId: score.scoreId,
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
          "INSERT INTO Scores (scoreId, userId, weekNumber, amount) VALUES (?, ?, ?, ?)"
        )
        .bind(scoreId, userId, activeWeekNumber, amount)
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
