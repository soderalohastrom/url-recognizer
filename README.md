# URL Recognizer - Hahe Wai Mana'o

A proof-of-concept application that uses AI to interpret vague human descriptions of websites and generate probable URLs.

# URL Recognizer - Hahe Wai Mana'o

A proof-of-concept application that uses AI to interpret vague human descriptions of websites and generate probable URLs.

## Features

- **Smart URL Recognition** from various description types:
  - Explicit mentions (e.g., "example.com")
  - Keyword-based guessing ("that test site")
  - Contextual clues ("cats on a sailboat website")
  - Domain confusion ("was it .org or .io?")
  - Vague memories ("blue bird logo social site")

- **URL Validation & Auto-Correction**:
  - Automatically validates recognized URLs
  - Tests variations (hyphenated, underscored, different TLDs)
  - Shows corrected URL when a variation works
  - Example: `kelleherinternational.com` → `kelleher-international.com`

- **Visual Feedback**:
  - Confidence levels (high/medium/low)
  - Live validation status
  - Site favicons
  - **Website screenshot previews** for high-confidence results (via Microlink API)

- **Intelligent Variation Testing**:
  - Tries hyphenated versions for compound words
  - Tests with/without underscores
  - Checks common TLD alternatives (.com, .org, .net, .io)
  - Validates with/without www prefix

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

## Microlink API Integration

The app uses the Microlink API to fetch website screenshots for high-confidence URL results. This provides a visual preview of the website directly in the result card.

To add your Microlink API key:
1. Get an API key from [microlink.io](https://microlink.io)
2. In `src/App.tsx`, find the TODO comment in the `fetchPreview` function
3. Uncomment and add your API key there

The app works without an API key but may have rate limits.

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
