# Australian Constitution Search

Search any topic to find relevant sections of the Australian Constitution with plain-English summaries, powered by Claude.

## Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Add your Anthropic API key to `server/.env`:

```
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
```

3. Start the dev server:

```bash
npm run dev
```

The app opens at [http://localhost:5173](http://localhost:5173).

## How it works

The full Australian Constitution text is embedded in the server. When you search a topic, the server sends the entire Constitution to Claude along with your query. Claude identifies all relevant sections, summarizes them in plain English, and returns structured results with section citations and verbatim text.
