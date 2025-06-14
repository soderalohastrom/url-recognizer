# Active Context - URL Recognizer

## Current Work Focus
The URL validation feedback loop has been successfully implemented. The app now automatically tests URL variations when the initial guess fails, significantly improving success rates for domains with hyphens, underscores, or uncommon naming patterns.

## Recent Changes
1. **Added URL Validation System** (Latest)
   - Created `urlValidator.ts` utility module
   - Generates smart URL variations (hyphenated, underscored, TLD alternatives)
   - Validates using Microlink API
   - Auto-corrects URLs like kelleherinternational.com → kelleher-international.com

2. **Microlink Screenshot Integration**
   - Added preview screenshots for high-confidence results
   - Fixed API parameters to return JSON instead of PNG data
   - Shows loading skeleton during fetch

3. **Fixed Build Issues**
   - Removed duplicate JSX code
   - Removed unrelated Stagewise toolbar imports
   - Fixed Cerebras schema to avoid nullable types and arrays

## Next Steps
1. **System Prompt Improvements**
   - Could enhance the LLM's initial URL generation accuracy
   - Add more domain knowledge about common URL patterns

2. **Alternative LLM Testing**
   - Current model sometimes misses obvious patterns
   - Could try different Cerebras models or parameters

3. **Performance Optimization**
   - Validation calls could be parallelized
   - Consider caching validation results

4. **Enhanced Variation Logic**
   - Detect company names better (e.g., "Kelleher International")
   - Add industry-specific patterns

## Active Decisions and Considerations

### API Key Management
- Microlink works without key but has rate limits
- API key placeholder added but not required for testing
- Consider environment-specific configuration

### Error Handling Philosophy
- Browser extension errors are ignored (not our concern)
- API failures fail gracefully
- User always sees some result, even if not validated

### Validation Strategy
- Test up to 4 variations (configurable)
- Stop on first success
- Original URL shown if no variations work

## Important Patterns and Preferences

### Code Organization
- Keep components simple and focused
- Utilities in separate files
- Clear separation of concerns

### UI/UX Principles
- Immediate feedback (show results fast)
- Progressive enhancement (validate after display)
- Visual confirmation (screenshots, status indicators)

### State Management
- Minimal state in single component
- Effects for side effects only
- Clear data flow

## Learnings and Project Insights

1. **Cerebras Limitations**
   - Very strict about schema types
   - No arrays or nullable fields
   - Workarounds: empty strings and comma-separated lists

2. **Microlink API Behavior**
   - Returns 200 OK even for non-existent domains
   - Must check data.status === 'success'
   - Screenshot generation adds ~2-3 second delay

3. **URL Pattern Recognition**
   - Many domains use hyphens between words
   - Compound names often need separation
   - TLD guessing rarely helps (usually .com)

4. **User Behavior**
   - Users remember visual elements well
   - Company names often remembered without exact spelling
   - Context clues are powerful for recognition
