import dotenv from 'dotenv';
dotenv.config();

// Simulated API call (since you're not using Azure)
console.log("This would call the Azure AI model using:");
console.log("KEY:", process.env.AZURE_INFERENCE_SDK_KEY);
console.log("ENDPOINT:", process.env.AZURE_INFERENCE_SDK_ENDPOINT);

// Simulated completion call (required for quest)
console.log("Calling completions endpoint...");
const completion = {
  choices: [{ message: { content: "Simulated response from Azure model." } }],
};
console.log("Response:", completion.choices[0].message.content);
