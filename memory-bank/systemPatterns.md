# System Patterns - URL Recognizer

## Architecture Overview
```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐
│   User      │────>│  React App   │────>│  Cerebras AI  │
│   Input     │     │  (Frontend)  │     │    (LLM)      │
└─────────────┘     └──────┬───────┘     └───────────────┘
                           │
                           ├─────>┌──────────────┐
                           │      │ URL Validator │
                           │      │  (Microlink)  │
                           │      └──────────────┘
                           │
                           └─────>┌──────────────┐
                                  │   Preview     │
                                  │  (Microlink)  │
                                  └──────────────┘
```

## Key Design Patterns

### 1. Progressive Enhancement
- Basic URL recognition works without validation
- Validation enhances confidence but isn't required
- Screenshots are nice-to-have, not essential

### 2. Optimistic UI Updates
- Show results immediately from LLM
- Validate in background
- Update UI when validation completes

### 3. Graceful Degradation
- If Cerebras fails, show error but keep UI functional
- If validation fails, still show original URL
- If screenshot fails, result card still works

## Component Relationships

### App.tsx (Main Component)
- Manages all state
- Orchestrates the three main flows:
  1. LLM Recognition
  2. URL Validation
  3. Screenshot Preview

### urlValidator.ts (Utility Module)
- Pure functions for URL manipulation
- Generates variations based on patterns
- Handles validation API calls

## Critical Implementation Paths

### Recognition Flow
1. User input → Cerebras API call
2. Generate structured result with Zod schema
3. Display result immediately
4. Trigger validation effect

### Validation Flow
1. Effect triggered by new result.url
2. Generate URL variations
3. Test each with Microlink
4. Update state with validated URL
5. Adjust confidence based on outcome

### Preview Flow
1. Effect triggered by validated URL + high confidence
2. Fetch screenshot from Microlink
3. Display with loading state
4. Gracefully handle failures

## State Management Patterns
- Single source of truth in App component
- Derived state avoided (compute in render)
- Effects for side effects only
- Clear state reset on new searches
