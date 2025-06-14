# Project Brief - URL Recognizer

## Project Name
URL Recognizer - Hahe Wai Mana'o (Finding Memories of Water)

## Core Purpose
Create an AI-powered tool that interprets vague human descriptions of websites and generates probable URLs, helping users find websites they can't quite remember.

## Key Requirements
1. **Natural Language Understanding**: Accept any description of a website, from explicit URLs to vague memories
2. **Smart URL Generation**: Use LLM to guess likely URLs based on descriptions
3. **Validation Loop**: Test generated URLs and try variations until finding a working one
4. **Visual Feedback**: Show confidence levels, explanations, and website previews
5. **Simple Interface**: Clean, two-panel design for input and results

## Success Criteria
- Successfully recognizes explicit URLs with high confidence
- Can guess URLs from contextual clues (e.g., "blue bird social media" → twitter.com)
- Auto-corrects common URL variations (hyphens, underscores, TLDs)
- Provides visual confirmation with screenshots
- Maintains fast response times despite validation loops

## Technical Constraints
- Must work with Cerebras AI free tier
- Must handle Microlink API rate limits gracefully
- Should run on port 5180
- Must avoid complex Zod schemas (no nullable types or arrays)

## Scope Boundaries
- This is a proof-of-concept (PoC), not production software
- Focus on functionality over aesthetics
- No user accounts or data persistence
- No need for comprehensive error handling beyond basic UX
