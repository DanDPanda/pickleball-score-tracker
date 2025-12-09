import type { EventContext } from "@cloudflare/workers-types";
import type { User } from "../../src/types/user";

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

  const [userResults, weeksResults] = await Promise.all([
    context.env.pickleball_score_tracker_database
      .prepare("SELECT * FROM Users")
      .bind()
      .run(),
    context.env.pickleball_score_tracker_database
      .prepare("SELECT * FROM Weeks")
      .bind()
      .run(),
  ]);

  let user = userResults.results.find((user: User) => user.email === userEmail);

  if (!user) {
    user = await context.env.pickleball_score_tracker_database
      .prepare(
        "INSERT INTO Users (userId, email, facilitator) VALUES (?, ?, ?)"
      )
      .bind(crypto.randomUUID(), userEmail, false)
      .run();
  }

  const scoresResults = await context.env.pickleball_score_tracker_database
    .prepare("SELECT * FROM Scores")
    .bind()
    .run();

  return new Response(
    JSON.stringify({
      user,
      weeks: weeksResults.results,
      scores: scoresResults.results,
      users: userResults.results,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};
