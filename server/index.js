const express = require("express");
const path = require("path");
const cors = require("cors");
const { getFullConstitutionText } = require("./constitution");
const { LEGISLATION_CATALOG, JURISDICTIONS, CATEGORIES } = require("./legislation/catalog");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const clientDist = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientDist));

app.get("/api/catalog", (req, res) => {
  res.json({
    legislation: LEGISLATION_CATALOG.map(({ id, title, jurisdiction, year, category, description, keywords }) => ({
      id, title, jurisdiction, year, category, description, keywords
    })),
    jurisdictions: JURISDICTIONS,
    categories: CATEGORIES,
  });
});

function buildSystemPrompt(selectedLegislation) {
  const hasConstitution = selectedLegislation.some(l => l.id === "constitution");
  const otherLegislation = selectedLegislation.filter(l => l.id !== "constitution");

  let prompt = `You are an expert Australian legal research assistant. You will be given a user's topic query and asked to find all relevant provisions across selected Australian legislation.

Your task is to:
1. Identify EVERY section/provision of the selected legislation that is relevant to the user's topic.
2. For each relevant provision, provide:
   - The Act it comes from (full title)
   - The section number
   - The section title or heading
   - A clear, plain-English summary (2-4 sentences) explaining what the provision says and why it's relevant
   - The verbatim text of the provision (as accurately as possible)
   - The relevance level: "high", "moderate", or "tangential"

You MUST respond with valid JSON only, no markdown, no explanation outside the JSON. Use this exact structure:

{
  "topic": "the user's topic",
  "overview": "A 2-4 sentence overview of how Australian law addresses this topic across the selected legislation",
  "results": [
    {
      "act": "Full Act Title",
      "jurisdiction": "federal or nsw",
      "section": "51",
      "title": "Section title",
      "summary": "Plain English summary...",
      "relevance": "high",
      "verbatim": "The exact text of the provision..."
    }
  ],
  "resultCount": 3
}

If no provisions are relevant, return:
{
  "topic": "the user's topic",
  "overview": "The selected legislation does not directly address this topic.",
  "results": [],
  "resultCount": 0
}

Important rules:
- Include ALL relevant provisions, not just the most obvious ones.
- Sort results by relevance (high first, then moderate, then tangential).
- Group results by Act when multiple sections from the same Act are relevant.
- Be thorough but accurate — do not invent sections that don't exist.
- The "verbatim" field should contain the actual text of the provision as accurately as you can recall it.`;

  if (hasConstitution) {
    prompt += `\n\nIMPORTANT: For the Australian Constitution, you have the EXACT verbatim text provided below. Use it for perfectly accurate quotations. For all other legislation, draw on your knowledge to cite sections as accurately as possible.`;
  }

  if (otherLegislation.length > 0) {
    prompt += `\n\nYou are searching the following legislation:\n`;
    for (const leg of otherLegislation) {
      prompt += `- ${leg.title} (${leg.year}) — ${leg.description}\n`;
    }
  }

  return prompt;
}

function buildUserMessage(topic, selectedLegislation) {
  const hasConstitution = selectedLegislation.some(l => l.id === "constitution");

  let content = "";
  if (hasConstitution) {
    const constitutionText = getFullConstitutionText();
    content += `Here is the full text of the Australian Constitution:\n\n${constitutionText}\n\n---\n\n`;
  }

  const actNames = selectedLegislation.map(l => l.title).join(", ");
  content += `Please find all provisions relevant to the following topic across the selected legislation (${actNames}):\n\n"${topic}"`;

  return content;
}

async function callClaude(topic, selectedLegislation) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === "your-api-key-here") {
    throw new Error("ANTHROPIC_API_KEY is not configured on the server.");
  }

  const systemPrompt = buildSystemPrompt(selectedLegislation);
  const userMessage = buildUserMessage(topic, selectedLegislation);

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
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    let errorMsg = `Anthropic API error (${response.status})`;
    try {
      const parsed = JSON.parse(body);
      if (parsed?.error?.message) errorMsg = parsed.error.message;
    } catch (_) {}
    console.error("Anthropic raw error:", response.status, body);
    throw { status: response.status, message: errorMsg };
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
  const { topic, legislationIds } = req.body;

  if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
    return res.status(400).json({ error: "Please provide a topic to search." });
  }

  const ids = Array.isArray(legislationIds) && legislationIds.length > 0
    ? legislationIds
    : ["constitution"];

  const selectedLegislation = LEGISLATION_CATALOG.filter(l => ids.includes(l.id));

  if (selectedLegislation.length === 0) {
    return res.status(400).json({ error: "No valid legislation selected." });
  }

  try {
    const result = await callClaude(topic.trim(), selectedLegislation);
    res.json(result);
  } catch (err) {
    console.error("API Error:", err.status, err.message || err);

    if (err.status === 401) {
      return res.status(500).json({ error: "Invalid API key. Check your ANTHROPIC_API_KEY." });
    }
    if (err.status === 429) {
      return res.status(429).json({ error: "Rate limited. Please wait a moment and try again." });
    }
    if (err instanceof SyntaxError) {
      return res.status(500).json({ error: "Failed to parse the AI response. Please try again." });
    }

    res.status(500).json({
      error: err.message || "Something went wrong while searching.",
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
