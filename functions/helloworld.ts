import { EventContext } from "@cloudflare/workers-types";

export function onRequest(context: EventContext): Response {
  const userEmail = context.request.headers.get(
    "Cf-Access-Authenticated-User-Email"
  );

  return new Response(userEmail);
}
