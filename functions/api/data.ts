import type { EventContext } from "@cloudflare/workers-types";
import type { Player } from "../../src/types/Player";
import { getIdentity } from "@cloudflare/pages-plugin-cloudflare-access/api";

export const onRequest = async (
  context: EventContext<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { pickleball_score_tracker_database: any },
    "",
    { message: string }
  >
) => {
  try {
    console.log("context :>> ", context);
    const identity = await getIdentity(context);
    console.log("context.request.headers :>> ", identity);
    const playerEmail = identity?.email;

    const [
      playersResults,
      activePlayersResults,
      weeklyScoresResults,
      gameScoresResults,
      weeksResults,
    ] = await Promise.all([
      context.env.pickleball_score_tracker_database
        .prepare("SELECT * FROM Players")
        .bind()
        .run(),
      context.env.pickleball_score_tracker_database
        .prepare(
          "SELECT DISTINCT Players.* FROM Players INNER JOIN WeeklyScores ON Players.playerId = WeeklyScores.playerId"
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

    let player = playersResults.results.find(
      (player: Player) => player.email === playerEmail
    );

    if (!player) {
      const playerId = crypto.randomUUID();
      await context.env.pickleball_score_tracker_database
        .prepare(
          "INSERT INTO Players (playerId, email, facilitator) VALUES (?, ?, ?)"
        )
        .bind(playerId, playerEmail, false)
        .run();

      player = await context.env.pickleball_score_tracker_database
        .prepare("SELECT * FROM Players WHERE email = ?")
        .bind(playerEmail)
        .first();
    }

    return new Response(
      JSON.stringify({
        player,
        weeklyScores: weeklyScoresResults.results,
        gameScores: gameScoresResults.results,
        players: activePlayersResults.results,
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
