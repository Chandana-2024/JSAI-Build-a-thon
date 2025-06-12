// ai-foundry.js
import dotenv from 'dotenv';
dotenv.config();

function callAzureAI(prompt) {
  console.log("Prompt sent to Azure AI model:", prompt);

  return {
    response: {
      message: "This is a simulated response from Azure AI Foundry.",
      status: "success"
    }
  };
}
const prompt = "Hello AI, how are you?";
const result = callAzureAI(prompt);

console.log("Azure AI Foundry Response:", result);
