import { User } from "../../src/types/user";
import { Score } from "./../../src/types/score";
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

    // Get all users who have scores and scores from the active week
    const [usersResults, activeScoresResults] = await Promise.all([
      context.env.pickleball_score_tracker_database
        .prepare(
          "SELECT DISTINCT Users.* FROM Users INNER JOIN Scores ON Users.userId = Scores.userId"
        )
        .bind()
        .run(),
      context.env.pickleball_score_tracker_database
        .prepare("SELECT * FROM Scores WHERE active = true")
        .bind()
        .run(),
    ]);

    const allUsers = usersResults.results;
    const activeScores = activeScoresResults.results;

    // Find minimum score from active week
    const minScore =
      activeScores.length > 0
        ? Math.min(...activeScores.map((score: Score) => score.amount))
        : 0;

    // Find users who didn't submit scores
    const usersWithScores = new Set(
      activeScores.map((score: Score) => score.userId)
    );
    const usersWithoutScores = allUsers.filter(
      (user: User) => !usersWithScores.has(user.userId)
    );

    // Add minimum score for users who didn't submit
    if (usersWithoutScores.length > 0) {
      const insertStatements = usersWithoutScores.map((user: User) =>
        context.env.pickleball_score_tracker_database
          .prepare(
            "INSERT INTO Scores (scoreId, userId, weekNumber, amount, active) VALUES (?, ?, ?, ?, ?)"
          )
          .bind(
            crypto.randomUUID(),
            user.userId,
            activeWeek.weekNumber,
            minScore,
            false
          )
      );

      await context.env.pickleball_score_tracker_database.batch(
        insertStatements
      );
    }

    // Update existing week
    await context.env.pickleball_score_tracker_database
      .prepare("UPDATE Weeks SET active = false")
      .bind()
      .run();

    await context.env.pickleball_score_tracker_database
      .prepare("UPDATE Scores SET active = false")
      .bind()
      .run();

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
      .prepare("DELETE FROM Weeks")
      .bind()
      .run();

    await context.env.pickleball_score_tracker_database
      .prepare("DELETE FROM Scores")
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
