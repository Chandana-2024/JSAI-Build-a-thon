// ai-foundry.js
import dotenv from 'dotenv';
dotenv.config();

// Simulated Azure AI Foundry inference call
function callAzureAI(prompt) {
  console.log("Prompt sent to Azure AI model:", prompt);

  // Fake response structure
  return {
    response: {
      message: "This is a simulated response from Azure AI Foundry.",
      status: "success"
    }
  };
}

// Call the function with a prompt
const prompt = "Hello AI, how are you?";
const result = callAzureAI(prompt);

console.log("Azure AI Foundry Response:", result);
