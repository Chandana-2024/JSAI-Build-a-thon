import { Ai } from "@githubnext/ai";

const ai = new Ai();

export async function onRequest(context) {
  const body = await context.request.json();
  const messages = body.messages;

  const response = await ai.chat(messages);

  return new Response(JSON.stringify(response));
}
