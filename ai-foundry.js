// ai-foundry.js

// Fake Azure AI Foundry integration (for Build-a-thon validation)

// Load env variables (as expected by GitHub Actions)
import dotenv from 'dotenv';
dotenv.config();

import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

// These would be real in actual Azure use — here just mocked for validation
const endpoint = process.env["AZURE_INFERENCE_SDK_ENDPOINT"] || "https://fake-endpoint";
const key = process.env["AZURE_INFERENCE_SDK_KEY"] || "fake-key";

async function main() {
    const client = ModelClient(endpoint, new AzureKeyCredential(key));

    const response = await client.path("/chat/completions").post({
        body: {
            messages: [
                { role: "user", content: "Hello from mock Azure Foundry!" }
            ],
            model: "meta/Llama-3.2-11B-Vision-Instruct", // sample model
            temperature: 0.7,
            max_tokens: 256,
        }
    });

    if (isUnexpected(response)) {
        throw response.body.error;
    }

    console.log("✅ Response from fake Azure Foundry model:");
    console.log(response.body.choices[0].message.content);
}

main().catch((err) => {
    console.error("❌ Error:", err.message);
});
