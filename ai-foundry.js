// ai-foundry.js

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Simulated Azure AI Foundry inference call
function callAzureAI(userPrompt) {
  console.log("Prompt sent to Azure AI model:", userPrompt);

  // Properly structured fake response
  return {
    response: {
      message: "This is a simulated response from Azure AI Foundry.",
      status: "success"
    }
  };
}

// Call the function with a sample prompt
const userPrompt = "Hello AI, how are you?";
const result = callAzureAI(userPrompt);

console.log("Azure AI Foundry Response:", result);
