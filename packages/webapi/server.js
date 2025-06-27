import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import { AzureChatOpenAI } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";

// ⬇️ Import AgentService for agent mode
import { AgentService } from "./agentService.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Initialize AgentService
const agentService = new AgentService();

// Session memory storage
const sessionMemories = {};

// Get or create in-memory chat session
function getSessionMemory(sessionId) {
  if (!sessionMemories[sessionId]) {
    const history = new ChatMessageHistory();
    sessionMemories[sessionId] = new BufferMemory({
      chatHistory: history,
      returnMessages: true,
      memoryKey: "chat_history",
    });
  }
  return sessionMemories[sessionId];
}

// Mock PDF loader for RAG
function loadPDF() {
  return true; // mock
}

// Mock document retriever for RAG
function retrieveRelevantContent(message) {
  return [
    "This is mock RAG content. In real usage, relevant PDF content would go here.",
  ];
}

// Mock LangChain model setup
const chatModel = new AzureChatOpenAI({
  azureOpenAIApiKey: process.env.AZURE_INFERENCE_SDK_KEY || "mock-key",
  azureOpenAIApiInstanceName: process.env.INSTANCE_NAME || "mock-instance",
  azureOpenAIApiDeploymentName: process.env.DEPLOYMENT_NAME || "mock-deployment",
  azureOpenAIApiVersion: "2024-08-01-preview",
  temperature: 1,
  maxTokens: 4096,
});

// 🧠 POST /chat: Handles basic, RAG, and agent modes
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  const useRAG = req.body.useRAG === undefined ? true : req.body.useRAG;
  const sessionId = req.body.sessionId || "default";
  const mode = req.body.mode || "basic";

  try {
    // ⬇️ Handle Agent Mode
    if (mode === "agent") {
      const agentResponse = await agentService.processMessage(sessionId, userMessage);
      return res.json({
        reply: agentResponse.reply,
        sources: []
      });
    }

    // ⬇️ Handle RAG/Basic mode
    let sources = [];

    const memory = getSessionMemory(sessionId);
    const memoryVars = await memory.loadMemoryVariables({});

    if (useRAG) {
      loadPDF(); // mock
      sources = retrieveRelevantContent(userMessage);
    }

    const systemMessage = useRAG
      ? {
          role: "system",
          content: sources.length > 0
            ? `You are a helpful assistant. Use ONLY the info below:\n\n---\n${sources.join('\n\n')}\n---`
            : `You are a helpful assistant. The document doesn't answer this. Reply politely.`,
        }
      : {
          role: "system",
          content: "You are a helpful and knowledgeable assistant.",
        };

    const messages = [
      systemMessage,
      ...(memoryVars.chat_history || []),
      { role: "user", content: userMessage },
    ];

    // 🧪 Mock model response (instead of calling actual Azure OpenAI)
    const response = { content: `Mock response to: "${userMessage}"` };

    await memory.saveContext({ input: userMessage }, { output: response.content });

    res.json({ reply: response.content, sources });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Model call failed",
      message: err.message,
      reply: "Sorry, I encountered an error. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
