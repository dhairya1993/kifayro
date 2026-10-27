import { isAllowedDestinationUrl } from './url-validator.ts';

/**
 * Amazon Associates Program Configuration & Integration Constants
 */
export const AMAZON_ASSOCIATES_STORE_ID = 'kifayrodeals-21';
export const AMAZON_ASSOCIATES_DISCLOSURE = 'As an Amazon Associate I earn from qualifying purchases.';

export interface AffiliateLinkValidationResult {
  isValid: boolean;
  sanitizedUrl: string | null;
  error?: string;
  isAmazonAssociates: boolean;
  hasTrackingTag: boolean;
  trackingTag?: string;
}

/**
 * Validates and preserves an affiliate link generated through authorized publisher tools
 * (e.g. Amazon Associates SiteStripe or Associates Central).
 * 
 * Rules:
 * 1. Must use HTTPS.
 * 2. Hostname must be within the allowlisted merchant domains.
 * 3. Preserves all authorized query parameters (does NOT strip or guess parameters).
 * 4. Rejects credentials in URL and non-standard ports.
 * 5. Flags whether the link belongs to Amazon Associates and whether tracking is present.
 */
export function validateAndPreserveAffiliateUrl(rawUrl: unknown): AffiliateLinkValidationResult {
  if (typeof rawUrl !== 'string' || !rawUrl.trim()) {
    return {
      isValid: false,
      sanitizedUrl: null,
      error: 'Empty or non-string destination URL provided.',
      isAmazonAssociates: false,
      hasTrackingTag: false,
    };
  }

  const trimmed = rawUrl.trim();

  // Validate using core platform allowlist security
  if (!isAllowedDestinationUrl(trimmed)) {
    return {
      isValid: false,
      sanitizedUrl: null,
      error: 'Destination URL failed host allowlist or HTTPS security validation.',
      isAmazonAssociates: false,
      hasTrackingTag: false,
    };
  }

  try {
    const parsed = new URL(trimmed);
    const hostname = parsed.hostname.toLowerCase();
    const isAmazon = hostname === 'amazon.in' || hostname === 'www.amazon.in' || hostname === 'amzn.to' || hostname === 'amzn.in';
    const tag = parsed.searchParams.get('tag');

    return {
      isValid: true,
      sanitizedUrl: parsed.toString(),
      isAmazonAssociates: isAmazon,
      hasTrackingTag: Boolean(tag),
      trackingTag: tag || undefined,
    };
  } catch (err) {
    return {
      isValid: false,
      sanitizedUrl: null,
      error: (err as Error).message,
      isAmazonAssociates: false,
      hasTrackingTag: false,
    };
  }
}

/**
 * Standard external link attributes for outbound commercial and merchant destinations.
 */
export const OUTBOUND_LINK_ATTRIBUTES = {
  rel: 'noopener noreferrer nofollow',
  target: '_blank',
} as const;

/**
 * Checks whether an Amazon Associates tracking ID is the assigned Store ID under review.
 */
export function isAssignedStoreId(storeId: string): boolean {
  return typeof storeId === 'string' && storeId.trim().toLowerCase() === AMAZON_ASSOCIATES_STORE_ID.toLowerCase();
}

/**
 * Returns the exact statutory Amazon Associates disclosure statement.
 */
export function getAssociatesDisclosure(): string {
  return AMAZON_ASSOCIATES_DISCLOSURE;
}

/**
 * Validates whether an outbound destination is a direct merchant preview without active tracking parameters.
 */
export function isDirectMerchantLinkWithoutTracking(rawUrl: string): boolean {
  const result = validateAndPreserveAffiliateUrl(rawUrl);
  return result.isValid && !result.hasTrackingTag;
}
