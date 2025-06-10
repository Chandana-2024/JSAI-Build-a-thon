import "dotenv/config";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = process.env["GITHUB_TOKEN"];

export async function main() {
  const client = ModelClient(
    "https://models.github.ai/inference",
    new AzureKeyCredential(token)
  );

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
       { role: "user", content: "Generate an HTML and CSS layout for this website sketch." }
      ],
      model: "meta/Llama-3.2-11B-Vision-Instruct",
      temperature: 0.8,
      max_tokens: 2048,
      top_p: 0.1
    }
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  console.log(response.body.choices[0].message.content);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
