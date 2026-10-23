export type Currency = 'INR';

export type AvailabilityStatus =
  | 'in_stock'
  | 'out_of_stock'
  | 'limited_stock'
  | 'price_unavailable';

export type DealStatus = 'active' | 'expired' | 'upcoming';

export type AffiliateStatus =
  | 'demo'
  | 'pending_approval'
  | 'connected'
  | 'disabled';

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
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  image: string;
  currentPrice: number;
  originalPrice: number | null;
  currency: Currency;
  store: string;
  productUrl: string;
  affiliateUrl: string;
  lastVerifiedAt: string;
  priceSource: string;
  availabilityStatus: AvailabilityStatus;
  isDemoData: boolean;
  specs?: Record<string, string>;
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
  isDemoData: boolean;
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
