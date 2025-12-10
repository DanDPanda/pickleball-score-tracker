import type { EventContext } from "@cloudflare/workers-types";
import { GameScore } from "../../src/types/GameScore";

interface ScoreBody {
  playerId: string;
  gamesScores: GameScore[];
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

    const { playerId, gamesScores } = body;

    // Validate required fields
    if (!playerId || !gamesScores) {
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
    const activeGameScores = await context.env.pickleball_score_tracker_database
      .prepare("SELECT * FROM GameScores WHERE playerId = ? AND active = true")
      .bind(playerId)
      .first();

    if (activeGameScores) {
      const statements = gamesScores.map((gameScore) => {
        return context.env.pickleball_score_tracker_database
          .prepare("UPDATE GameScores SET gameNumber = ?, points = ?")
          .bind(gameScore.gameNumber, gameScore.points);
      });

      await context.env.pickleball_score_tracker_database.batch(statements);

      return new Response(
        JSON.stringify({
          message: "Scores updated successfully",
          count: gamesScores.length,
        }),
        {
          status: 201,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      // Create new scores as batch
      const statements = gamesScores.map((gameScore) => {
        const scoreId = crypto.randomUUID();
        return context.env.pickleball_score_tracker_database
          .prepare(
            "INSERT INTO GameScores (scoreId, playerId, gameNumber, points, active) VALUES (?, ?, ?, ?, ?)"
          )
          .bind(
            scoreId,
            playerId,
            gameScore.gameNumber,
            gameScore.points,
            true
          );
      });

      await context.env.pickleball_score_tracker_database.batch(statements);

      return new Response(
        JSON.stringify({
          message: "Scores created successfully",
          count: gamesScores.length,
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
