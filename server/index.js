const express = require("express");
const path = require("path");
const cors = require("cors");
const { getFullConstitutionText } = require("./constitution");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const clientDist = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientDist));

const SYSTEM_PROMPT = `You are a constitutional law research assistant specializing in the Australian Constitution. You will be given the full text of the Australian Constitution and a user's topic query.

Your task is to:
1. Identify EVERY section of the Australian Constitution that is relevant to the user's topic.
2. For each relevant section, provide:
   - The section number
   - The section title
   - The chapter (and part, if applicable) it belongs to
   - A clear, plain-English summary (2-4 sentences) explaining what the section says and why it's relevant to the topic
   - The verbatim text of the section

You MUST respond with valid JSON only, no markdown, no explanation outside the JSON. Use this exact structure:

{
  "topic": "the user's topic",
  "overview": "A 2-3 sentence overview of how the Constitution addresses this topic overall",
  "results": [
    {
      "section": "51",
      "title": "Legislative powers of the Parliament",
      "chapter": "Chapter I — The Parliament",
      "part": "Part V — Powers of the Parliament",
      "summary": "Plain English summary...",
      "relevance": "high or moderate or tangential",
      "verbatim": "The exact text from the Constitution..."
    }
  ],
  "resultCount": 3
}

If no sections are relevant, return:
{
  "topic": "the user's topic",
  "overview": "The Australian Constitution does not directly address this topic.",
  "results": [],
  "resultCount": 0
}

Important:
- Include ALL relevant sections, not just the most obvious ones. Consider both direct and indirect relevance.
- Sort results by relevance (high first, then moderate, then tangential).
- Be thorough but accurate — do not invent or hallucinate sections that don't exist.
- The "verbatim" field must contain the exact text from the Constitution, not a paraphrase.`;

async function callClaude(topic) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === "your-api-key-here") {
    throw new Error("ANTHROPIC_API_KEY is not configured on the server.");
  }

  const constitutionText = getFullConstitutionText();

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Here is the full text of the Australian Constitution:\n\n${constitutionText}\n\n---\n\nPlease find all sections relevant to the following topic: "${topic}"`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw { status: response.status, message: `Anthropic API ${response.status}: ${body}` };
  }

  const data = await response.json();
  let text = data.content[0].text;

  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    text = jsonMatch[1].trim();
  }

  return JSON.parse(text);
}

app.post("/api/search", async (req, res) => {
  const { topic } = req.body;

  if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
    return res.status(400).json({ error: "Please provide a topic to search." });
  }

  try {
    const result = await callClaude(topic.trim());
    res.json(result);
  } catch (err) {
    console.error("API Error:", err.message || err);

    const status = err.status || 500;
    if (status === 401) {
      return res.status(401).json({ error: "Invalid API key. Check your ANTHROPIC_API_KEY." });
    }
    if (status === 429) {
      return res.status(429).json({ error: "Rate limited. Please wait a moment and try again." });
    }
    if (err instanceof SyntaxError) {
      return res.status(500).json({ error: "Failed to parse the AI response. Please try again." });
    }

    res.status(status).json({
      error: err.message || "Something went wrong while searching the Constitution.",
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
