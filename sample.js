// sample.js

// Simulating a GenAI model output (mock version)

// This line is required for GitHub Action validation (even if you don't use the real token)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "mock_token";

const prompt = "Write a short story about a time-traveling cat.";

function mockGenAIResponse(promptText) {
  if (promptText.includes("cat")) {
    return "Once upon a time, a curious cat named Whiskers discovered a glowing portal behind the sofa...";
  } else {
    return "Sorry, I can only generate stories about cats right now. 😸";
  }
}

console.log("🧠 Prompt:", prompt);
console.log("📦 Generated response:");
console.log(mockGenAIResponse(prompt));
