import type { EventContext } from "@cloudflare/workers-types";

interface WeekBody {
  activeWeekNumber: number;
}

export const onRequestPost = async (
  context: EventContext<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { pickleball_score_tracker_database: any },
    "",
    { message: string }
  >
) => {
  const body: WeekBody = await context.request.json();

  const { activeWeekNumber } = body;
  try {
    // Update existing week
    await context.env.pickleball_score_tracker_database
      .prepare("UPDATE Weeks SET active = false")
      .bind()
      .run();

    const uuid = crypto.randomUUID();

    await context.env.pickleball_score_tracker_database
      .prepare(
        "INSERT INTO Weeks (weekId, weekNumber, startDate, active) VALUES (?, ?, ?, true)"
      )
      .bind(uuid, activeWeekNumber + 1, new Date().toISOString())
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
