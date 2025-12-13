import type { EventContext } from "@cloudflare/workers-types";
import { GameScore } from "../../src/types/GameScore";

interface ScoreBody {
  playerId: string;
  gameScores: GameScore[];
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

    const { playerId, gameScores } = body;

    // Validate required fields
    if (!playerId || !gameScores) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: playerId, gameScores",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check if score already exists for this player and week
    const [activeGameScores, activeWeek] = await Promise.all([
      context.env.pickleball_score_tracker_database
        .prepare(
          "SELECT * FROM GameScores WHERE playerId = ? AND active = true"
        )
        .bind(playerId)
        .first(),
      context.env.pickleball_score_tracker_database
        .prepare("SELECT * FROM weeks WHERE active = true")
        .bind()
        .first(),
    ]);

    if (activeGameScores) {
      const statements = gameScores.map((gameScore) => {
        return context.env.pickleball_score_tracker_database
          .prepare(
            "UPDATE GameScores SET gameNumber = ?, points = ? WHERE playerId = ? AND active = true AND gameNumber = ?"
          )
          .bind(
            gameScore.gameNumber,
            gameScore.points,
            playerId,
            gameScore.gameNumber
          );
      });

      await context.env.pickleball_score_tracker_database.batch(statements);

      return new Response(
        JSON.stringify({
          message: "Scores updated successfully",
          count: gameScores.length,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      // Create new scores as batch
      const statements = gameScores.map((gameScore) => {
        const gameScoreId = crypto.randomUUID();
        return context.env.pickleball_score_tracker_database
          .prepare(
            "INSERT INTO GameScores (gameScoreId, playerId, gameNumber, points, weekId, active, previous) VALUES (?, ?, ?, ?, ?, true, false)"
          )
          .bind(
            gameScoreId,
            playerId,
            gameScore.gameNumber,
            gameScore.points,
            activeWeek.weekId
          );
      });

      await context.env.pickleball_score_tracker_database.batch(statements);

      return new Response(
        JSON.stringify({
          message: "Scores created successfully",
          count: gameScores.length,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.log("error :>> ", error);
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
