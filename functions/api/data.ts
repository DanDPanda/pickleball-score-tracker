import type { EventContext } from "@cloudflare/workers-types";
import type { User } from "../../src/types/User";

export const onRequest = async (
  context: EventContext<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { pickleball_score_tracker_database: any },
    "",
    { message: string }
  >
) => {
  try {
    const userEmail =
      context.request.headers.get("Cf-Access-Authenticated-User-Email") ||
      "dan.v.dinh@gmail.com";

    const [
      usersResults,
      activeUsersResults,
      weeklyScoresResults,
      gameScoresResults,
      weeksResults,
    ] = await Promise.all([
      context.env.pickleball_score_tracker_database
        .prepare("SELECT * FROM Users")
        .bind()
        .run(),
      context.env.pickleball_score_tracker_database
        .prepare(
          "SELECT DISTINCT Users.* FROM Users INNER JOIN WeeklyScores ON Users.userId = WeeklyScores.userId"
        )
        .bind()
        .run(),
      context.env.pickleball_score_tracker_database
        .prepare("SELECT * FROM WeeklyScores")
        .bind()
        .run(),
      context.env.pickleball_score_tracker_database
        .prepare(
          "SELECT * FROM GameScores WHERE active = true OR previous = true"
        )
        .bind()
        .run(),
      context.env.pickleball_score_tracker_database
        .prepare("SELECT * FROM Weeks")
        .bind()
        .run(),
    ]);

    let user = usersResults.results.find(
      (user: User) => user.email === userEmail
    );

    if (!user) {
      const userId = crypto.randomUUID();
      await context.env.pickleball_score_tracker_database
        .prepare(
          "INSERT INTO Users (userId, email, facilitator) VALUES (?, ?, ?)"
        )
        .bind(userId, userEmail, false)
        .run();

      user = await context.env.pickleball_score_tracker_database
        .prepare("SELECT * FROM Users WHERE email = ?")
        .bind(userEmail)
        .first();
    }

    return new Response(
      JSON.stringify({
        user,
        weeklyScores: weeklyScoresResults.results,
        gameScores: gameScoresResults.results,
        users: activeUsersResults.results,
        weeks: weeksResults.results,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.log("error :>> ", error);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch data",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
