export type Currency = 'INR';

export type AvailabilityStatus =
  | 'in_stock'
  | 'out_of_stock'
  | 'limited_stock'
  | 'price_unavailable';

export type VerificationStatus =
  | 'demo'
  | 'verified'
  | 'expired'
  | 'unavailable';

export type DealStatus = 'active' | 'expired' | 'upcoming';

export type AffiliateStatus =
  | 'demo'
  | 'pending_approval'
  | 'connected'
  | 'disabled';

export interface VerificationRecord {
  status: VerificationStatus;
  source: string;
  lastVerifiedAt: string;
  isVerified: boolean;
  notes?: string;
}

export interface DetailedProductVerification {
  productDetails: VerificationRecord;
  price: VerificationRecord & { priceAmount: number | null; currency: Currency };
  availability: VerificationRecord & { availabilityStatus: AvailabilityStatus };
}

export interface StorePriceComparison {
  storeSlug: string;
  storeName: string;
  price: number;
  originalPrice?: number;
  productUrl: string;
  affiliateUrl: string;
  availability: AvailabilityStatus;
  lastVerifiedAt: string;
  deliveryInfo?: string;
  bankOffers?: string;
  isVerified?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  title?: string;
  description: string;
  shortDescription?: string;
  detailedDescription?: string;
  category: string;
  brand: string;
  image: string;
  productImage?: string;
  currentPrice: number;
  price?: number;
  originalPrice: number | null;
  currency: Currency;
  store: string;
  merchant?: string;
  productUrl: string;
  amazonProductUrl?: string;
  affiliateUrl: string;
  affiliateTrackingId?: string;
  lastVerifiedAt: string;
  priceSource: string;
  productDataSource?: string;
  productVerifiedAt?: string;
  productVerificationStatus?: VerificationStatus;
  priceSourceUrl?: string;
  priceVerificationStatus?: VerificationStatus;
  priceLastVerifiedAt?: string;
  availabilityStatus: AvailabilityStatus;
  availability?: AvailabilityStatus;
  availabilitySource?: string;
  availabilityVerificationStatus?: VerificationStatus;
  availabilityLastVerifiedAt?: string;
  verificationStatus: VerificationStatus;
  isDemoData: boolean;
  isPublished?: boolean;
  publishedAt?: string;
  updatedAt?: string;
  specs?: Record<string, string>;
  keySpecifications?: Record<string, string>;
  features?: string[];
  comparisons?: StorePriceComparison[];
  bestDealNote?: string;
}

export interface Deal {
  id: string;
  slug: string;
  title: string;
  description: string;
  productId: string;
  store: string;
  discountPercentage: number | null;
  couponCode: string | null;
  startDate: string;
  endDate: string | null;
  affiliateUrl: string;
  dealSource: string;
  lastVerifiedAt: string;
  status: DealStatus;
  verificationStatus: VerificationStatus;
  dealVerificationStatus?: VerificationStatus;
  priceVerificationStatus?: VerificationStatus;
  isDemoData: boolean;
  isPublished?: boolean;
  highlightBadge?: string;
}

export interface Store {
  id: string;
  slug: string;
  name: string;
  logo: string;
  websiteUrl: string;
  affiliateProgramStatus: AffiliateStatus;
  supportedLinkTypes: string[];
  description: string;
  deliveryTimeEstimate?: string;
  returnPolicySnippet?: string;
  popularCategories: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  featured: boolean;
  subcategories?: string[];
}

export interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;
  store: string;
  category: string;
  discount: string;
  minOrder?: number;
  expiryDate: string;
  terms: string[];
  isVerified: boolean;
  verificationStatus?: VerificationStatus;
  lastVerifiedAt: string;
  isDemoData: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  readingTime: string;
  category: string;
  tags: string[];
  keyTakeaways: string[];
}

export interface AffiliateProvider {
  id: string;
  name: string;
  networkCode: string;
  status: AffiliateStatus;
  region: string;
  portalUrl: string;
  disclosureRequirement: string;
  notes: string;
  supportsSubIds: boolean;
}

export interface SearchResult {
  products: Product[];
  deals: Deal[];
  stores: Store[];
  coupons: Coupon[];
  articles: Article[];
  totalMatches: number;
}
