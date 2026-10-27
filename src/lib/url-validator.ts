/**
 * Destination URL Validator & Allowlist Security Module
 * Strict HTTPS enforcement and domain allowlisting for outbound merchant links.
 */

export const ALLOWED_DESTINATION_HOSTS = new Set([
  'amazon.in',
  'www.amazon.in',
  'amzn.to',
  'amzn.in',
  'flipkart.com',
  'www.flipkart.com',
  'dl.flipkart.com',
  'croma.com',
  'www.croma.com',
  'reliancedigital.in',
  'www.reliancedigital.in',
  'tatacliq.com',
  'www.tatacliq.com',
  'myntra.com',
  'www.myntra.com',
  'nykaa.com',
  'www.nykaa.com',
  'ajio.com',
  'www.ajio.com',
  'vijaysales.com',
  'www.vijaysales.com',
]);

/**
 * Validates destination URLs against strict security criteria:
 * 1. Must be a valid parseable URL string.
 * 2. Protocol must be strictly HTTPS (rejects http:, javascript:, data:, etc.).
 * 3. URL must NOT contain user credentials (username or password).
 * 4. Port must be standard HTTPS port (empty or 443).
 * 5. Hostname must exactly match an allowlisted merchant domain.
 */
export function isAllowedDestinationUrl(rawUrl: unknown): boolean {
  if (typeof rawUrl !== 'string' || !rawUrl.trim()) {
    return false;
  }

  try {
    const parsed = new URL(rawUrl);

    // 1. Strict HTTPS protocol
    if (parsed.protocol !== 'https:') {
      return false;
    }

    // 2. Reject credentials in URL (e.g., https://amazon.in@evil.example or https://user:pass@amazon.in)
    if (parsed.username || parsed.password) {
      return false;
    }

    // 3. Port check: allow only default HTTPS port (empty string in WHATWG URL or '443')
    if (parsed.port !== '' && parsed.port !== '443') {
      return false;
    }

    // 4. Exact hostname matching against allowlist
    const hostname = parsed.hostname.toLowerCase();
    if (!ALLOWED_DESTINATION_HOSTS.has(hostname)) {
      return false;
    }

    // 5. Open redirect prevention: inspect nested destination trampoline parameters
    const nestedParam =
      parsed.searchParams.get('url') ||
      parsed.searchParams.get('redirect') ||
      parsed.searchParams.get('location') ||
      parsed.searchParams.get('dest') ||
      parsed.searchParams.get('target');

    if (nestedParam) {
      try {
        const nestedUrl = new URL(nestedParam);
        if (!ALLOWED_DESTINATION_HOSTS.has(nestedUrl.hostname.toLowerCase())) {
          return false;
        }
      } catch {
        // If it's a relative path on the same merchant site (e.g. /dp/123), that is safe
      }
    }

    return true;
  } catch {
    return false;
  }
}
