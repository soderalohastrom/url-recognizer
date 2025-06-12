# URL Recognizer - Hahe Wai Mana'o

A proof-of-concept application that uses AI to interpret vague human descriptions of websites and generate probable URLs.

## Features

- Recognizes URLs from various types of descriptions:
  - Explicit mentions (e.g., "example.com")
  - Keyword-based guessing ("that test site")
  - Contextual clues ("cats on a sailboat website")
  - Domain confusion ("was it .org or .io?")
  - Vague memories ("blue bird logo social site")

- Provides confidence levels (high/medium/low)
- Shows explanations of reasoning
- Suggests alternative possibilities
- Displays site favicons when available

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env.local` and add your Cerebras API key:
```bash
cp .env.example .env.local
```

3. Run the development server:
```bash
npm run dev
```

The app will run on port 5180 by default.

## Technology Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Cerebras AI SDK
- Vercel AI SDK

## Project Structure

```
url-recognizer/
├── src/
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── api/                 # API endpoints (if needed)
└── url-recognizer-system-prompt.txt  # LLM system prompt
```

## Hawaiian Concept

**Hahe Wai Mana'o** - "Finding Memories of Water"
- Hahe: to search for, to seek
- Wai: water (metaphor for the fluid nature of the internet)
- Mana'o: thought, memory, intention

This name reflects the app's purpose of helping users find websites that flow through their memory like water.

## GitHub Repository

[https://github.com/soderalohastrom/url-recognizer](https://github.com/soderalohastrom/url-recognizer)
