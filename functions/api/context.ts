import type { EventContext } from "@cloudflare/workers-types";

export const onRequest = (
  context: EventContext<"", "", { message: string }>
) => {
  const userEmail = context.request.headers.get(
    "Cf-Access-Authenticated-User-Email"
  );

  if (userEmail) {
    return new Response(JSON.stringify({ email: userEmail }), {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify({ message: "User not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
};
