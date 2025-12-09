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
    // Update existing week
    await context.env.pickleball_score_tracker_database
      .prepare("UPDATE Weeks SET active = false")
      .run();

    const uuid = crypto.randomUUID();

    await context.env.pickleball_score_tracker_database
      .prepare(
        "INSERT INTO Weeks (weekId, weekNumber, startDate, active) VALUES (?, (SELECT MAX(weekNumber) + 1 FROM Weeks), ?, true)"
      )
      .bind(uuid, new Date().toISOString())
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
      .run();

    return new Response(
      JSON.stringify({ message: "Week deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to delete weeks",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
