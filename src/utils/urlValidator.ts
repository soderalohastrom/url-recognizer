// URL validation and variation utilities

export interface URLValidationResult {
  url: string;
  valid: boolean;
  status?: number;
  error?: string;
}

// Generate common URL variations
export function generateURLVariations(baseUrl: string): string[] {
  const variations: string[] = [baseUrl];
  
  // Extract domain parts
  const url = new URL(baseUrl);
  const hostname = url.hostname;
  const parts = hostname.split('.');
  const domainName = parts[parts.length - 2]; // e.g., "kelleherinternational" from "kelleherinternational.com"
  
  // If domain has no special characters, try adding common separators
  if (domainName && !domainName.includes('-') && !domainName.includes('_')) {
    // Try to find word boundaries (simple heuristic)
    const words = domainName.match(/[A-Z]?[a-z]+|[A-Z]+(?=[A-Z][a-z]|\b)/g) || [];
    
    if (words.length > 1) {
      // Try hyphenated version
      const hyphenated = words.join('-').toLowerCase();
      variations.push(`https://${hyphenated}.${parts[parts.length - 1]}`);
      
      // Try underscore version
      const underscored = words.join('_').toLowerCase();
      variations.push(`https://${underscored}.${parts[parts.length - 1]}`);
      
      // Try camelCase variations
      const camelCase = words[0].toLowerCase() + words.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
      variations.push(`https://${camelCase}.${parts[parts.length - 1]}`);
    }
  }
  
  // If domain has hyphens, try without them
  if (domainName && domainName.includes('-')) {
    const noHyphens = domainName.replace(/-/g, '');
    variations.push(`https://${noHyphens}.${parts[parts.length - 1]}`);
  }
  
  // Try common TLD variations if .com
  if (parts[parts.length - 1] === 'com') {
    variations.push(baseUrl.replace('.com', '.org'));
    variations.push(baseUrl.replace('.com', '.net'));
    variations.push(baseUrl.replace('.com', '.io'));
  }
  
  // Try with/without www
  if (!hostname.startsWith('www.')) {
    variations.push(baseUrl.replace('://', '://www.'));
  } else {
    variations.push(baseUrl.replace('://www.', '://'));
  }
  
  // Remove duplicates
  return [...new Set(variations)];
}

// Validate URL using Microlink API (since we're already using it)
export async function validateURLWithMicrolink(url: string): Promise<URLValidationResult> {
  try {
    const response = await fetch(
      `https://api.microlink.io/?url=${encodeURIComponent(url)}`,
      { signal: AbortSignal.timeout(5000) } // 5 second timeout
    );
    
    if (!response.ok) {
      return { url, valid: false, status: response.status };
    }
    
    const data = await response.json();
    return { 
      url, 
      valid: data.status === 'success',
      status: response.status 
    };
  } catch (error) {
    return { 
      url, 
      valid: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

// Find first valid URL from variations
export async function findValidURL(
  baseUrl: string, 
  maxAttempts: number = 3
): Promise<{ url: string; validated: boolean; attempts: URLValidationResult[] }> {
  const variations = generateURLVariations(baseUrl).slice(0, maxAttempts);
  const attempts: URLValidationResult[] = [];
  
  for (const url of variations) {
    const result = await validateURLWithMicrolink(url);
    attempts.push(result);
    
    if (result.valid) {
      return { url, validated: true, attempts };
    }
  }
  
  // Return original URL if no valid variation found
  return { url: baseUrl, validated: false, attempts };
}
