import { Ai } from "@githubnext/ai";

const ai = new Ai();

export async function onRequest(context) {
  const body = await context.request.json();
  const prompt = body.prompt || "Say something smart";

  const result = await ai.completions(prompt);

  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
}
