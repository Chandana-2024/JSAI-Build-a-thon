// ai-foundry.js
import dotenv from "dotenv";
dotenv.config();

// This simulates a request to Azure AI Foundry
async function fakeAzureRequest() {
  const modelName = "gpt-3.5-turbo";
  console.log(`Pretending to connect to model: ${modelName}`);
  console.log("✅ Azure model response: Hello from your deployed AI model!");
}

fakeAzureRequest();
