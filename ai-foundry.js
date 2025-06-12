// ai-foundry.js
import dotenv from 'dotenv';
dotenv.config();

// Simulated Azure AI Inference response
function fakeAzureInference(prompt) {
  console.log(`Prompt sent to model: ${prompt}`);
  // Mocked response
  return {
    message: "This is a fake response from a simulated Azure AI model.",
    status: "success"
  };
}

// Call the function with a sample prompt
const result = fakeAzureInference("Hello AI, how are you?");
console.log("Simulated Azure Response:", result);
