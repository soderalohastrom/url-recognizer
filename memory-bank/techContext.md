# Tech Context - URL Recognizer

## Technology Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite (configured for port 5180)
- **Styling**: Tailwind CSS
- **AI Integration**: Cerebras AI SDK (llama-4-scout-17b-16e-instruct model)
- **AI Framework**: Vercel AI SDK
- **Schema Validation**: Zod
- **Preview Service**: Microlink API

## Development Setup
```bash
# Install dependencies
npm install

# Run development server (port 5180)
npm run dev

# Build for production
npm run build
```

## Key Technical Decisions

### 1. Cerebras Schema Constraints
- Cannot use nullable types - use empty strings instead
- Cannot use arrays - use comma-separated strings
- Keep schemas simple with primitive types only

### 2. URL Validation Architecture
- Client-side validation using Microlink API
- Generates variations programmatically (urlValidator.ts)
- Tests up to 4 variations before giving up
- Uses existing Microlink integration to avoid CORS issues

### 3. API Integration
- Cerebras API key via environment variable (VITE_CEREBRAS_API_KEY)
- Microlink API works without key (free tier limits)
- Graceful degradation if APIs unavailable

### 4. State Management
- Simple React useState hooks
- No external state management needed
- Effects for validation and preview fetching

## Dependencies
```json
{
  "@ai-sdk/cerebras": "^0.0.2",
  "ai": "^3.1.9",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "zod": "^3.23.8"
}
```

## Tool Usage Patterns
- Dynamic imports for AI SDKs to reduce initial bundle
- AbortSignal for timeout handling
- Tailwind utility classes for all styling
- TypeScript for type safety throughout
