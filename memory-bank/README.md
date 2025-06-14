# Memory Bank

This directory contains the project's memory bank - a comprehensive documentation system that captures all essential knowledge about the URL Recognizer project.

## Purpose
The Memory Bank ensures project continuity by maintaining detailed documentation of:
- Project goals and requirements
- Technical decisions and patterns
- Current state and progress
- Lessons learned

## Structure

### Core Files
1. **[projectbrief.md](./projectbrief.md)** - Foundation document defining project scope and requirements
2. **[productContext.md](./productContext.md)** - Why this exists and how it should work
3. **[techContext.md](./techContext.md)** - Technical stack and development setup
4. **[systemPatterns.md](./systemPatterns.md)** - Architecture and design patterns
5. **[activeContext.md](./activeContext.md)** - Current work focus and recent changes
6. **[progress.md](./progress.md)** - What's done, what's left, and evolution of decisions

## Usage Guidelines

### When to Read
- Start of any new development session
- When making architectural decisions
- Before implementing new features
- When debugging complex issues

### When to Update
- After implementing significant changes
- When discovering new patterns
- When user requirements change
- When technical constraints are identified

### Update Process
1. Review ALL files to understand current state
2. Document changes in appropriate files
3. Keep activeContext.md current with latest work
4. Update progress.md with completed/new tasks

## Key Insights Captured
- Cerebras AI has strict schema limitations (no nullable types/arrays)
- URL validation significantly improves success rates
- Visual feedback (screenshots) crucial for user confidence
- Many business domains use hyphens that users forget
- Microlink API works well for both validation and screenshots

## Quick Reference

### Running the Project
```bash
npm install
npm run dev  # Runs on port 5180
```

### Key Technologies
- React + TypeScript + Vite
- Cerebras AI (llama-4-scout-17b-16e-instruct)
- Microlink API (screenshots & validation)
- Tailwind CSS

### GitHub Repository
https://github.com/soderalohastrom/url-recognizer
