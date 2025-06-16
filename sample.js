import dotenv from "dotenv";
import fetch from "node-fetch";
import fs from "fs";

dotenv.config();

const token = process.env.GITHUB_TOKEN;

async function callGitHubModel() {
  const imageBytes = fs.readFileSync("contoso_layout_sketch.jpg");
  const base64Image = imageBytes.toString("base64");

  const response = await fetch("https://api.github.com/models/github-llm/gpt-4-vision-preview/infer", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2023-07-07"
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Generate HTML and CSS code for this hand-drawn website layout." },
            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
          ]
        }
      ]
    })
  });

  const result = await response.json();
  console.log(result.choices[0].message.content);
}

callGitHubModel();
