import { useState, useEffect } from 'react';

interface URLResult {
  url: string;
  confidence: 'high' | 'medium' | 'low';
  explanation: string;
  alternatives_list: string;
  needs_verification: boolean;
}

interface MicrolinkData {
  title?: string;
  description?: string;
  screenshot?: {
    url: string;
  };
}

function App() {
  const [inputText, setInputText] = useState<string>('');
  const [result, setResult] = useState<URLResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<MicrolinkData | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState<boolean>(false);

  const handleRecognizeURL = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);
    setPreviewData(null);

    try {
      const { createCerebras } = await import('@ai-sdk/cerebras');
      const { generateObject } = await import('ai');
      const { z } = await import('zod');

      const cerebras = createCerebras({
        apiKey: import.meta.env.VITE_CEREBRAS_API_KEY,
      });

      const urlResultSchema = z.object({
        url: z.string().describe('Best guess URL or empty string if no match'),
        confidence: z.enum(['high', 'medium', 'low']).describe('Confidence level of the URL guess'),
        explanation: z.string().describe('Brief rationale for the URL guess'),
        alternatives_list: z.string().describe('Comma-separated list of alternative URL possibilities'),
        needs_verification: z.boolean().describe('Whether the URL needs verification'),
      });

      const { object: urlResult } = await generateObject({
        model: cerebras('llama-4-scout-17b-16e-instruct'),
        schema: urlResultSchema,
        system: `You are a "URL Decipherer" specialized in interpreting human descriptions of websites to generate probable URLs. Your goal is to transform vague, fragmented, or contextual hints into actionable links.

**Core Instructions:**

1. **Input Handling:**
   - Accept text where a URL is implied but not explicit
   - Detect keywords: "site," "webpage," "URL," "domain," or contextual phrases

2. **Decipher Logic:**
   - **Explicit Mentions** (e.g., "example.com"): Output with high confidence
   - **Keyword Guessing**: Extract core terms and generate domain candidates
   - **Contextual Search**: Use semantic clues to combine keywords
   - **Domain Confusion**: List alternatives when TLD is uncertain
   - **Vague Descriptions**: Propose 1-3 best guesses
   - **No Match**: Use empty string "" for url field when no match found

3. **Domain Strategies:**
   - Prioritize .com, then .org/.net/.io
   - Consider known sites first (e.g., "video site" → youtube.com)
   - Combine keywords creatively (e.g., "cats sailboat" → catsailing.com)
4. **Output Requirements:**
   - Always include https:// protocol when URL is found
   - Use empty string "" for url field when no match
   - Set confidence based on match certainty
   - Provide clear explanation of reasoning
   - List alternatives as comma-separated string (e.g., "https://example.org,https://example.io")
   - Set needs_verification to true when confidence < high`,
        prompt: inputText,
      });

      setResult(urlResult);

    } catch (err) {
      console.error('Error recognizing URL:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getThumbnailUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch {
      return null;
    }
  };

  // Fetch preview when we have a high-confidence URL
  useEffect(() => {
    const fetchPreview = async () => {
      if (!result?.url || result.confidence !== 'high' || !result.url.trim()) return;
      
      setIsLoadingPreview(true);
      try {
        // TODO: Add your Microlink API key here when you have it
        // const MICROLINK_API_KEY = 'your-api-key-here';
        // const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(result.url)}&screenshot=true&meta=false&embed=screenshot.url&apikey=${MICROLINK_API_KEY}`;
        
        const response = await fetch(
          `https://api.microlink.io/?url=${encodeURIComponent(result.url)}&screenshot=true&meta=false&embed=screenshot.url`
        );
        const data = await response.json();
        
        if (data.status === 'success' && data.data) {
          setPreviewData(data.data);
        }
      } catch (err) {
        console.error('Error fetching preview:', err);
        // Silently fail - preview is a nice-to-have feature
      } finally {
        setIsLoadingPreview(false);
      }
    };

    fetchPreview();
  }, [result]);
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <div className="w-1/2 flex flex-col p-8 bg-white border-r border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">URL Recognizer</h1>
        <p className="text-sm text-gray-600 mb-6">Hahe Wai Mana'o - Finding Memories of Water</p>
        
        <textarea
          className="w-full flex-grow p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Describe a website you're trying to remember...&#10;&#10;Examples:&#10;• &quot;That site with the blue bird logo&quot;&#10;• &quot;Was it example.org or example.io?&quot;&#10;• &quot;Cats on a sailboat website&quot;"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
        />
        <button
          onClick={handleRecognizeURL}
          disabled={isLoading || !inputText.trim()}
          className="mt-4 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Thinking...' : 'Find URL'}
        </button>
      </div>

      <div className="w-1/2 p-8 overflow-y-auto bg-gray-50">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {!isLoading && !result && !error && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center">
              Your URL recognition result will appear here.
            </p>
          </div>
        )}
        
        {result && (
          <div className="space-y-4">
            {/* Main Result Card */}
            {result.url && result.url.trim() && (
              <div className={`p-6 rounded-lg border-2 ${getConfidenceColor(result.confidence)}`}>
                <div className="flex items-start space-x-4">
                  {getThumbnailUrl(result.url) && (
                    <img
                      src={getThumbnailUrl(result.url)!}
                      alt="Site favicon"
                      className="w-16 h-16 rounded-lg shadow-sm flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">Found URL</h3>
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-xl break-all"
                    >
                      {result.url}
                    </a>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        result.confidence === 'high' ? 'bg-green-200 text-green-800' :
                        result.confidence === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-red-200 text-red-800'
                      }`}>
                        {result.confidence} confidence
                      </span>
                      {result.needs_verification && (
                        <span className="text-sm text-gray-600">⚠️ Needs verification</span>
                      )}
                    </div>
                    
                    {/* Screenshot Preview - Only for high confidence */}
                    {result.confidence === 'high' && (
                      <div className="mt-4">
                        {isLoadingPreview && (
                          <div className="bg-gray-100 rounded-lg p-4 animate-pulse">
                            <div className="h-32 bg-gray-200 rounded"></div>
                            <p className="text-sm text-gray-500 mt-2">Loading preview...</p>
                          </div>
                        )}
                        {previewData?.screenshot?.url && !isLoadingPreview && (
                          <div className="relative group">
                            <img
                              src={previewData.screenshot.url}
                              alt={`Preview of ${result.url}`}
                              className="w-full rounded-lg shadow-md border border-gray-200 transition-transform group-hover:scale-[1.02]"
                              style={{ maxHeight: '200px', objectFit: 'cover', objectPosition: 'top' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none"></div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* No Match Card */}
            {(!result.url || !result.url.trim()) && (
              <div className="p-6 rounded-lg border-2 border-gray-200 bg-white">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">No Match Found</h3>
                <p className="text-gray-600">
                  Couldn't find a matching URL. Try adding more specific details like:
                </p>
                <ul className="mt-2 list-disc list-inside text-gray-600">
                  <li>Purpose of the website</li>                  <li>Visual elements you remember</li>
                  <li>Specific keywords from the domain</li>
                </ul>
              </div>
            )}

            {/* Explanation */}
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-1">How I figured it out:</h4>
              <p className="text-gray-600">{result.explanation}</p>
            </div>

            {/* Alternatives */}
            {result.alternatives_list && result.alternatives_list.trim() && (
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-700 mb-2">Other possibilities:</h4>
                <div className="space-y-2">
                  {result.alternatives_list.split(',').map((alt, index) => (
                    <a
                      key={index}
                      href={alt.trim()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-800 underline"
                    >
                      {alt.trim()}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;