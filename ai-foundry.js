function fakeAzureInference(prompt) {
  console.log(`Prompt sent to model: ${prompt}`);
  return {
    message: "This is a fake response from a simulated Azure AI model.",
    status: "success"
  };
}
const result = fakeAzureInference("Hello AI, how are you?");
console.log("Simulated Azure Response:", result);
