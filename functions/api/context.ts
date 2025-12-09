import type { EventContext } from "@cloudflare/workers-types";

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

  const [userResults, weeksResults, seasonsResults] = await Promise.all([
    context.env.pickleball_score_tracker_database
      .prepare("SELECT * FROM Users WHERE email = ?")
      .bind(userEmail)
      .run(),
    context.env.pickleball_score_tracker_database
      .prepare("SELECT * FROM Weeks")
      .bind()
      .all(),
    context.env.pickleball_score_tracker_database
      .prepare("SELECT * FROM Seasons")
      .bind()
      .all(),
  ]);

  let user = userResults.results[0];

  if (!user) {
    user = await context.env.pickleball_score_tracker_database
      .prepare(
        "INSERT INTO Users (userId, email, facilitator) VALUES (?, ?, ?)"
      )
      .bind(crypto.randomUUID(), userEmail, false)
      .run();
  }

  const scoresResults = await context.env.pickleball_score_tracker_database
    .prepare("SELECT * FROM Scores WHERE userId = ?")
    .bind(user.userId)
    .all();

  return new Response(
    JSON.stringify({
      user,
      weeks: weeksResults.results,
      seasons: seasonsResults.results,
      scores: scoresResults.results,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};
