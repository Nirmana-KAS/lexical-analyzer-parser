import { ParseResult } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Helper function: Fetch with retry logic
async function fetchWithRetry(
  url: string, 
  options: RequestInit, 
  retries = 3
): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fetch(url, options);
    } catch (error) {
      // If this is the last retry, throw the error
      if (i === retries - 1) {
        throw error;
      }
      // Wait before retrying (exponential backoff: 1s, 2s, 3s)
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error('Max retries reached');
}

// Main function: Parse expression with timeout and retry
export async function parseExpression(expression: string): Promise<ParseResult> {
  try {
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout

    const response = await fetchWithRetry(
      `${API_BASE_URL}/api/parse`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression }),
        signal: controller.signal,
      },
      3 // 3 retries
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle timeout specifically
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out after 30 seconds. Please try again.');
    }
    
    // Handle other errors
    throw new Error(`Failed to parse expression: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Health check function with timeout
export async function checkHealth(): Promise<{ status: string; message: string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

    const response = await fetchWithRetry(
      `${API_BASE_URL}/api/health`,
      {
        signal: controller.signal,
      },
      2 // 2 retries for health check
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Health check timed out');
    }
    throw new Error(`Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
