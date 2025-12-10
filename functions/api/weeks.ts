import { GameScore } from "./../../src/types/GameScore";
import type { EventContext } from "@cloudflare/workers-types";

export const onRequestPost = async (
  context: EventContext<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { pickleball_score_tracker_database: any },
    "",
    { message: string }
  >
) => {
  try {
    const activeWeek = await context.env.pickleball_score_tracker_database
      .prepare("SELECT * FROM Weeks WHERE active = true")
      .bind()
      .first();

    // Get all players who have scores and scores from the active week
    const [playersResults, activeGameScoreResults] = await Promise.all([
      context.env.pickleball_score_tracker_database
        .prepare(
          "SELECT DISTINCT Players.* FROM Players INNER JOIN GameScores ON Players.playerId = GameScores.playerId"
        )
        .bind()
        .run(),
      context.env.pickleball_score_tracker_database
        .prepare("SELECT * FROM GameScores WHERE active = true")
        .bind()
        .run(),
    ]);

    const players = playersResults.results;
    const activeGameScores = activeGameScoreResults.results;

    const weeklyScores: Record<string, number> = players.reduce(
      (accum: Record<string, number>, gameScore: GameScore) => ({
        ...accum,
        [gameScore.playerId]: activeGameScores.reduce(
          (accum: number, score: GameScore) =>
            accum + (score.playerId === gameScore.playerId ? score.points : 0),
          0
        ),
      }),
      {}
    );

    // Find minimum score from active week
    const minScore =
      Object.keys(weeklyScores).length > 0
        ? Math.min(...Object.values(weeklyScores))
        : 0;

    // Add minimum score for players who didn't submit
    if (Object.keys(weeklyScores).length > 0) {
      const insertStatements = Object.keys(weeklyScores).map(
        (playerId: string) =>
          context.env.pickleball_score_tracker_database
            .prepare(
              "INSERT INTO WeeklyScores (weeklyScoreId, playerId, weekId, weekNumber, points) VALUES (?, ?, ?, ?, ?)"
            )
            .bind(
              crypto.randomUUID(),
              playerId,
              activeWeek.weekId,
              activeWeek.weekNumber,
              weeklyScores[playerId] || minScore
            )
      );

      await context.env.pickleball_score_tracker_database.batch(
        insertStatements
      );
    }

    await context.env.pickleball_score_tracker_database
      .prepare("UPDATE GameScores SET previous = false")
      .bind()
      .run();

    // Update existing week
    await Promise.all([
      await context.env.pickleball_score_tracker_database
        .prepare(
          "UPDATE GameScores SET active = false, previous = true WHERE active = true"
        )
        .bind()
        .run(),
      await context.env.pickleball_score_tracker_database
        .prepare("UPDATE Weeks SET active = false")
        .bind()
        .run(),
    ]);

    const uuid = crypto.randomUUID();

    await context.env.pickleball_score_tracker_database
      .prepare(
        "INSERT INTO Weeks (weekId, weekNumber, startDate, active) VALUES (?, ?, ?, true)"
      )
      .bind(uuid, activeWeek.weekNumber + 1, new Date().toISOString())
      .run();

    return new Response(
      JSON.stringify({
        message: "Week updated successfully",
        weekId: uuid,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log("error :>> ", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process week",
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
    await context.env.pickleball_score_tracker_database
      .prepare("DELETE FROM GameScores")
      .bind()
      .run();

    await context.env.pickleball_score_tracker_database
      .prepare("DELETE FROM WeeklyScores")
      .bind()
      .run();

    await context.env.pickleball_score_tracker_database
      .prepare("DELETE FROM Weeks")
      .bind()
      .run();

    await context.env.pickleball_score_tracker_database
      .prepare(
        "INSERT INTO Weeks (weekId, weekNumber, startDate, active) VALUES (?, 1, ?, true)"
      )
      .bind(crypto.randomUUID(), new Date().toISOString())
      .run();

    return new Response(JSON.stringify({ message: "Season has been reset" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to reset season",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
