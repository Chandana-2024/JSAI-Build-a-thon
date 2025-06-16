// sample.js

import dotenv from "dotenv";
import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

dotenv.config();

const token = process.env.GITHUB_TOKEN;

if (!token) {
  console.error("❌ GITHUB_TOKEN is missing from environment variables.");
  process.exit(1);
}

const client = ModelClient("https://api.github.com", new AzureKeyCredential(token));

async function callModel() {
  try {
    const result = await client
      .path("/models/github-llm/gpt-3.5-turbo/infer")
      .post({
        body: {
          messages: [
            {
              role: "user",
              content: "Create an HTML page with a heading and a paragraph."
            }
          ]
        }
      });

    const response = await result.body;

    console.log("🔍 Full API Response:\n", JSON.stringify(response, null, 2));

    if (!response.choices || response.choices.length === 0) {
        console.error("❌ No choices returned from the model.");
        return;
    }


    console.log("✅ Generated HTML:\n");
    console.log(response.choices[0].message.content);
  } catch (err) {
    console.error("❌ Error calling model:", err.message);
  }
}

callModel();
