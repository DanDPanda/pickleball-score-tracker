import type { EventContext } from "@cloudflare/workers-types";
import type { User } from "../../src/types/user";
import type { Week } from "../../src/types/week";

export const onRequest = async (
  context: EventContext<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { pickleball_score_tracker_database: any },
    "",
    { message: string }
  >
) => {
  const userEmail =
    context.request.headers.get("Cf-Access-Authenticated-User-Email") ||
    "dan.v.dinh@gmail.com";

  const [userResults, scoresResults, weeksResults] = await Promise.all([
    context.env.pickleball_score_tracker_database
      .prepare("SELECT * FROM Users")
      .bind()
      .run(),
    context.env.pickleball_score_tracker_database
      .prepare("SELECT * FROM Scores")
      .bind()
      .run(),
    context.env.pickleball_score_tracker_database
      .prepare("SELECT * FROM Weeks")
      .bind()
      .run(),
  ]);

  const activeWeek = weeksResults.results.find((week: Week) => week.active);
  let user = userResults.results.find((user: User) => user.email === userEmail);

  if (!user) {
    user = await context.env.pickleball_score_tracker_database
      .prepare(
        "INSERT INTO Users (userId, email, facilitator) VALUES (?, ?, ?)"
      )
      .bind(crypto.randomUUID(), userEmail, false)
      .run();
  }

  return new Response(
    JSON.stringify({
      user,
      userScores: scoresResults.results.filter(
        (score: { userId: string }) => score.userId === user.userId
      ),
      scores: scoresResults.results,
      users: userResults.results,
      activeWeekNumber: activeWeek.weekNumber,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};
