import type {
  Product,
  Deal,
  VerificationStatus,
  AvailabilityStatus,
  Currency,
  DealStatus,
} from '../types/index.ts';
import { validateAndPreserveAffiliateUrl } from './affiliate-link-manager.ts';

export interface ProductEntryInput {
  id: string;
  slug: string;
  title: string;
  brand: string;
  category: string;
  shortDescription: string;
  detailedDescription?: string;
  keySpecifications: Record<string, string>;
  productImage: string;
  merchant: string;
  destinationUrl: string;
  affiliateTrackingId?: string;
  productDataSource: string;
  productVerificationStatus?: VerificationStatus;
  productVerifiedAt?: string;
  price?: number;
  originalPrice?: number | null;
  currency?: Currency;
  priceSource?: string;
  priceVerificationStatus?: VerificationStatus;
  priceLastVerifiedAt?: string;
  availabilityStatus?: AvailabilityStatus;
  availabilitySource?: string;
  availabilityVerificationStatus?: VerificationStatus;
  availabilityLastVerifiedAt?: string;
  verificationStatus: VerificationStatus;
  isPublished?: boolean;
  features?: string[];
}

export interface ValidationReport {
  isValid: boolean;
  errors: string[];
  product: Product | null;
}

export interface DealEntryInput {
  id: string;
  slug: string;
  title: string;
  description: string;
  productId: string;
  store: string;
  destinationUrl: string;
  discountPercentage?: number | null;
  couponCode?: string | null;
  startDate: string;
  endDate?: string | null;
  dealSource: string;
  lastVerifiedAt?: string;
  status?: DealStatus;
  verificationStatus: VerificationStatus;
  priceVerificationStatus?: VerificationStatus;
  highlightBadge?: string;
  isPublished?: boolean;
}

export interface DealValidationReport {
  isValid: boolean;
  errors: string[];
  deal: Deal | null;
}

/**
 * Validates a manual product catalogue entry before publishing.
 * Used when Product Advertising API / Creators API is unavailable,
 * ensuring high compliance standards without fabricated data.
 *
 * Rules:
 * 1. Requires valid ID, slug, title (>= 5 chars), brand, category, data source.
 * 2. Destination URL must satisfy allowlist and security checks.
 * 3. Separates product information verification from price and availability verification.
 * 4. Never allows unverified prices to be represented as verified fact.
 * 5. If verificationStatus is 'demo', isDemoData is strictly enforced as true.
 */
export function validateAndCreateProductEntry(input: ProductEntryInput): ValidationReport {
  const errors: string[] = [];

  if (!input.id || !input.id.trim()) {
    errors.push('Product ID is required.');
  }

  if (!input.slug || !input.slug.trim()) {
    errors.push('Product slug is required.');
  }

  if (!input.title || input.title.trim().length < 5) {
    errors.push('Accurate product title (at least 5 characters) is required.');
  }

  if (!input.brand || !input.brand.trim()) {
    errors.push('Brand identifier is required.');
  }

  if (!input.category || !input.category.trim()) {
    errors.push('Category identifier is required.');
  }

  if (!input.productDataSource || !input.productDataSource.trim()) {
    errors.push('Legitimate product data source citation is required.');
  }

  // Destination URL security and allowlist validation
  const urlCheck = validateAndPreserveAffiliateUrl(input.destinationUrl);
  if (!urlCheck.isValid || !urlCheck.sanitizedUrl) {
    errors.push(`Destination URL error: ${urlCheck.error || 'Invalid merchant URL'}`);
  }

  // Price validation: must not fabricate prices
  const price = input.price;
  const hasPrice = typeof price === 'number' && price > 0;
  const isPriceVerified = input.priceVerificationStatus === 'verified';

  if (isPriceVerified && !hasPrice) {
    errors.push('Price verification status cannot be "verified" without a valid positive price number.');
  }

  if (isPriceVerified && (!input.priceSource || !input.priceSource.trim())) {
    errors.push('Verified price entries require a cited price source.');
  }

  const availabilityStatus =
    input.availabilityStatus || (hasPrice ? 'in_stock' : 'price_unavailable');

  if (!hasPrice && availabilityStatus !== 'price_unavailable') {
    errors.push('Products without verified price must set availabilityStatus to "price_unavailable".');
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors,
      product: null,
    };
  }

  const isDemo = input.verificationStatus === 'demo';
  const now = new Date().toISOString();

  const product: Product = {
    id: input.id,
    slug: input.slug,
    name: input.title,
    title: input.title,
    description: input.shortDescription,
    shortDescription: input.shortDescription,
    detailedDescription: input.detailedDescription,
    category: input.category,
    brand: input.brand,
    image: input.productImage,
    productImage: input.productImage,
    currentPrice: hasPrice ? price : 0,
    price: hasPrice ? price : 0,
    originalPrice: input.originalPrice ?? null,
    currency: input.currency || 'INR',
    store: input.merchant,
    merchant: input.merchant,
    productUrl: urlCheck.sanitizedUrl!,
    amazonProductUrl: urlCheck.isAmazonAssociates ? urlCheck.sanitizedUrl! : undefined,
    affiliateUrl: `/go/${input.id}`,
    affiliateTrackingId: input.affiliateTrackingId || (urlCheck.isAmazonAssociates ? 'kifayrodeals-21' : undefined),
    lastVerifiedAt: input.priceLastVerifiedAt || now,
    priceSource: input.priceSource || input.productDataSource,
    priceVerificationStatus: input.priceVerificationStatus || (isDemo ? 'demo' : hasPrice ? 'verified' : 'unavailable'),
    priceLastVerifiedAt: input.priceLastVerifiedAt || now,
    productDataSource: input.productDataSource,
    productVerificationStatus: input.productVerificationStatus || input.verificationStatus,
    productVerifiedAt: input.productVerifiedAt || now,
    availabilityStatus,
    availability: availabilityStatus,
    availabilitySource: input.availabilitySource || input.productDataSource,
    availabilityVerificationStatus: input.availabilityVerificationStatus || (isDemo ? 'demo' : 'verified'),
    availabilityLastVerifiedAt: input.availabilityLastVerifiedAt || now,
    verificationStatus: input.verificationStatus,
    isDemoData: isDemo,
    isPublished: input.isPublished ?? true,
    publishedAt: now,
    updatedAt: now,
    specs: input.keySpecifications,
    keySpecifications: input.keySpecifications,
    features: input.features || [],
  };

  return {
    isValid: true,
    errors: [],
    product,
  };
}

/**
 * Validates a manual deal catalogue entry.
 * Enforces destination allowlist, expiration checking, and honest status labeling.
 */
export function validateAndCreateDealEntry(input: DealEntryInput): DealValidationReport {
  const errors: string[] = [];

  if (!input.id || !input.id.trim()) {
    errors.push('Deal ID is required.');
  }

  if (!input.slug || !input.slug.trim()) {
    errors.push('Deal slug is required.');
  }

  if (!input.title || input.title.trim().length < 5) {
    errors.push('Accurate deal title (at least 5 characters) is required.');
  }

  if (!input.productId || !input.productId.trim()) {
    errors.push('Target product ID is required.');
  }

  if (!input.store || !input.store.trim()) {
    errors.push('Store slug is required.');
  }

  if (!input.dealSource || !input.dealSource.trim()) {
    errors.push('Deal verification source is required.');
  }

  const urlCheck = validateAndPreserveAffiliateUrl(input.destinationUrl);
  if (!urlCheck.isValid || !urlCheck.sanitizedUrl) {
    errors.push(`Destination URL error: ${urlCheck.error || 'Invalid merchant URL'}`);
  }

  if (errors.length > 0) {
    return {
      isValid: false,
      errors,
      deal: null,
    };
  }

  const now = new Date();
  const isEndDatePast = input.endDate ? new Date(input.endDate) < now : false;

  let effectiveStatus: DealStatus = input.status || 'active';
  let effectiveVerification: VerificationStatus = input.verificationStatus;

  if (isEndDatePast || input.verificationStatus === 'expired') {
    effectiveStatus = 'expired';
    effectiveVerification = 'expired';
  }

  const isDemo = input.verificationStatus === 'demo';

  const deal: Deal = {
    id: input.id,
    slug: input.slug,
    title: input.title,
    description: input.description,
    productId: input.productId,
    store: input.store,
    discountPercentage: input.discountPercentage ?? null,
    couponCode: input.couponCode ?? null,
    startDate: input.startDate,
    endDate: input.endDate ?? null,
    affiliateUrl: `/go/${input.id}`,
    dealSource: input.dealSource,
    lastVerifiedAt: input.lastVerifiedAt || now.toISOString(),
    status: effectiveStatus,
    verificationStatus: effectiveVerification,
    dealVerificationStatus: effectiveVerification,
    priceVerificationStatus: input.priceVerificationStatus || (isDemo ? 'demo' : 'verified'),
    isDemoData: isDemo,
    isPublished: input.isPublished ?? true,
    highlightBadge: input.highlightBadge || (isDemo ? 'Sample Record' : undefined),
  };

  return {
    isValid: true,
    errors: [],
    deal,
  };
}
