import {
  Product,
  Deal,
  Store,
  Category,
  Coupon,
  Article,
  AffiliateProvider,
  VerificationStatus,
} from '@/types';
import { products } from '@/data/products';
import { deals } from '@/data/deals';
import { stores } from '@/data/stores';
import { categories } from '@/data/categories';
import { coupons } from '@/data/coupons';
import { articles } from '@/data/articles';
import { affiliateProviders } from '@/data/affiliate-providers';

export interface ProductFilterOptions {
  category?: string;
  store?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  verificationStatus?: VerificationStatus;
  priceVerificationStatus?: VerificationStatus;
  excludeDemo?: boolean;
  sortBy?: 'relevance' | 'price-low' | 'price-high' | 'verified' | 'discount';
}

export interface DealFilterOptions {
  category?: string;
  store?: string;
  status?: 'active' | 'expired' | 'all';
  verificationStatus?: VerificationStatus;
  excludeDemo?: boolean;
  minDiscount?: number;
  sortBy?: 'verified' | 'discount' | 'title';
}

export interface SearchResult {
  products: Product[];
  deals: Deal[];
  stores: Store[];
  coupons: Coupon[];
  articles: Article[];
  totalMatches: number;
}

export interface IDataSourceAdapter {
  getProducts(options?: ProductFilterOptions): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getProductById(id: string): Promise<Product | null>;

  getDeals(options?: DealFilterOptions): Promise<Deal[]>;
  getDealBySlug(slug: string): Promise<Deal | null>;
  getDealById(id: string): Promise<Deal | null>;

  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;

  getStores(): Promise<Store[]>;
  getStoreBySlug(slug: string): Promise<Store | null>;

  getCoupons(storeSlug?: string, categorySlug?: string): Promise<Coupon[]>;

  getArticles(): Promise<Article[]>;
  getArticleBySlug(slug: string): Promise<Article | null>;

  getProviders(): Promise<AffiliateProvider[]>;

  search(query: string, options?: ProductFilterOptions): Promise<SearchResult>;

  resolveOutboundTarget(
    targetId: string
  ): Promise<{
    destinationUrl: string;
    label: string;
    storeName: string;
    isVerified: boolean;
    isDemo: boolean;
    isAffiliateTracked: boolean;
    trackingStatus: 'direct_merchant_link' | 'pending_approval' | 'active_affiliate';
  } | null>;
}

import {
  ALLOWED_DESTINATION_HOSTS,
  isAllowedDestinationUrl,
} from './url-validator';

export { ALLOWED_DESTINATION_HOSTS, isAllowedDestinationUrl };

/**
 * Local Data Source Adapter
 * Reads from typed local dataset with strict validation and demo data tags.
 * Designed to be swapped with API adapters (e.g. Amazon PA-API, Flipkart API) without UI changes.
 */
export class LocalDataSourceAdapter implements IDataSourceAdapter {
  async getProducts(options?: ProductFilterOptions): Promise<Product[]> {
    let list = [...products];

    if (options?.category) {
      list = list.filter((p) => p.category.toLowerCase() === options.category?.toLowerCase());
    }
    if (options?.store) {
      list = list.filter((p) => p.store.toLowerCase() === options.store?.toLowerCase());
    }
    if (options?.brand) {
      list = list.filter((p) => p.brand.toLowerCase() === options.brand?.toLowerCase());
    }
    if (options?.minPrice !== undefined) {
      list = list.filter((p) => p.currentPrice >= (options.minPrice ?? 0));
    }
    if (options?.maxPrice !== undefined) {
      list = list.filter((p) => p.currentPrice <= (options.maxPrice ?? Infinity));
    }
    if (options?.inStockOnly) {
      list = list.filter((p) => p.availabilityStatus === 'in_stock');
    }
    if (options?.verificationStatus) {
      list = list.filter((p) => p.verificationStatus === options.verificationStatus);
    }
    if (options?.priceVerificationStatus) {
      list = list.filter((p) => p.priceVerificationStatus === options.priceVerificationStatus);
    }
    if (options?.excludeDemo) {
      list = list.filter((p) => !p.isDemoData && p.verificationStatus !== 'demo');
    }

    if (options?.sortBy) {
      switch (options.sortBy) {
        case 'price-low':
          list.sort((a, b) => a.currentPrice - b.currentPrice);
          break;
        case 'price-high':
          list.sort((a, b) => b.currentPrice - a.currentPrice);
          break;
        case 'discount':
          list.sort((a, b) => {
            const discA = a.originalPrice ? (a.originalPrice - a.currentPrice) / a.originalPrice : 0;
            const discB = b.originalPrice ? (b.originalPrice - b.currentPrice) / b.originalPrice : 0;
            return discB - discA;
          });
          break;
        case 'verified':
          list.sort((a, b) => new Date(b.lastVerifiedAt).getTime() - new Date(a.lastVerifiedAt).getTime());
          break;
        default:
          break;
      }
    }

    return list;
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    const product = products.find((p) => p.slug === slug);
    return product || null;
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = products.find((p) => p.id === id);
    return product || null;
  }

  async getDeals(options?: DealFilterOptions): Promise<Deal[]> {
    let list = [...deals];

    if (options?.status && options.status !== 'all') {
      list = list.filter((d) => d.status === options.status);
    } else if (!options?.status) {
      // default: only active deals in standard listings (excluding expired statuses)
      list = list.filter((d) => d.status === 'active' && d.verificationStatus !== 'expired');
    }

    if (options?.verificationStatus) {
      list = list.filter((d) => d.verificationStatus === options.verificationStatus);
    }

    if (options?.excludeDemo) {
      list = list.filter((d) => !d.isDemoData && d.verificationStatus !== 'demo');
    }

    if (options?.store) {
      list = list.filter((d) => d.store.toLowerCase() === options.store?.toLowerCase());
    }

    if (options?.minDiscount) {
      list = list.filter((d) => (d.discountPercentage ?? 0) >= (options.minDiscount ?? 0));
    }

    if (options?.category) {
      const categoryProductIds = new Set(
        products.filter((p) => p.category === options.category).map((p) => p.id)
      );
      list = list.filter((d) => categoryProductIds.has(d.productId));
    }

    if (options?.sortBy === 'discount') {
      list.sort((a, b) => (b.discountPercentage ?? 0) - (a.discountPercentage ?? 0));
    } else if (options?.sortBy === 'title') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      list.sort((a, b) => new Date(b.lastVerifiedAt).getTime() - new Date(a.lastVerifiedAt).getTime());
    }

    return list;
  }

  async getDealBySlug(slug: string): Promise<Deal | null> {
    return deals.find((d) => d.slug === slug) || null;
  }

  async getDealById(id: string): Promise<Deal | null> {
    return deals.find((d) => d.id === id) || null;
  }

  async getCategories(): Promise<Category[]> {
    return categories;
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return categories.find((c) => c.slug === slug) || null;
  }

  async getStores(): Promise<Store[]> {
    return stores;
  }

  async getStoreBySlug(slug: string): Promise<Store | null> {
    return stores.find((s) => s.slug === slug) || null;
  }

  async getCoupons(storeSlug?: string, categorySlug?: string): Promise<Coupon[]> {
    let list = [...coupons];
    if (storeSlug) {
      list = list.filter((c) => c.store.toLowerCase() === storeSlug.toLowerCase());
    }
    if (categorySlug) {
      list = list.filter((c) => c.category.toLowerCase() === categorySlug.toLowerCase());
    }
    return list;
  }

  async getArticles(): Promise<Article[]> {
    return articles;
  }

  async getArticleBySlug(slug: string): Promise<Article | null> {
    return articles.find((a) => a.slug === slug) || null;
  }

  async getProviders(): Promise<AffiliateProvider[]> {
    return affiliateProviders;
  }

  async search(query: string, options?: ProductFilterOptions): Promise<SearchResult> {
    const q = query.trim().toLowerCase();
    if (!q) {
      const initialProducts = await this.getProducts(options);
      const initialDeals = await this.getDeals();
      return {
        products: initialProducts,
        deals: initialDeals,
        stores: stores.slice(0, 4),
        coupons: coupons.slice(0, 3),
        articles: articles.slice(0, 2),
        totalMatches: initialProducts.length + initialDeals.length,
      };
    }

    const matchedProducts = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );

    const matchedDeals = deals.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.store.toLowerCase().includes(q)
    );

    const matchedStores = stores.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.popularCategories.some((c) => c.includes(q))
    );

    const matchedCoupons = coupons.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.store.toLowerCase().includes(q)
    );

    const matchedArticles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    );

    return {
      products: matchedProducts,
      deals: matchedDeals,
      stores: matchedStores,
      coupons: matchedCoupons,
      articles: matchedArticles,
      totalMatches:
        matchedProducts.length +
        matchedDeals.length +
        matchedStores.length +
        matchedCoupons.length,
    };
  }

  /**
   * Secure destination resolver
   * Only resolves against trusted server-side mappings and strictly allowlisted hostnames.
   * NEVER accepts arbitrary external URLs from client queries!
   */
  async resolveOutboundTarget(
    targetId: string
  ): Promise<{
    destinationUrl: string;
    label: string;
    storeName: string;
    isVerified: boolean;
    isDemo: boolean;
    isAffiliateTracked: boolean;
    trackingStatus: 'direct_merchant_link' | 'pending_approval' | 'active_affiliate';
  } | null> {
    let resolved: {
      destinationUrl: string;
      label: string;
      storeName: string;
      isVerified: boolean;
      isDemo: boolean;
      isAffiliateTracked: boolean;
      trackingStatus: 'direct_merchant_link' | 'pending_approval' | 'active_affiliate';
    } | null = null;

    // 1. Check if it's a product
    const product = products.find((p) => p.id === targetId || p.slug === targetId);
    if (product) {
      const storeObj = stores.find((s) => s.slug === product.store);
      resolved = {
        destinationUrl: product.productUrl,
        label: product.name,
        storeName: storeObj ? storeObj.name : product.store,
        isVerified: false, // Sample demo record
        isDemo: product.isDemoData,
        isAffiliateTracked: false, // Affiliate programs pending approval
        trackingStatus: 'direct_merchant_link',
      };
    }

    // 2. Check if it's a deal
    if (!resolved) {
      const deal = deals.find((d) => d.id === targetId || d.slug === targetId);
      if (deal) {
        const prod = products.find((p) => p.id === deal.productId);
        const storeObj = stores.find((s) => s.slug === deal.store);
        const destinationUrl = prod ? prod.productUrl : storeObj ? storeObj.websiteUrl : '';
        if (destinationUrl) {
          resolved = {
            destinationUrl,
            label: deal.title,
            storeName: storeObj ? storeObj.name : deal.store,
            isVerified: false,
            isDemo: deal.isDemoData,
            isAffiliateTracked: false,
            trackingStatus: 'direct_merchant_link',
          };
        }
      }
    }

    // 3. Check if it's a store
    if (!resolved) {
      const store = stores.find((s) => s.id === targetId || s.slug === targetId);
      if (store) {
        resolved = {
          destinationUrl: store.websiteUrl,
          label: `${store.name} Official Storefront`,
          storeName: store.name,
          isVerified: true,
          isDemo: store.affiliateProgramStatus === 'demo',
          isAffiliateTracked: false,
          trackingStatus: 'direct_merchant_link',
        };
      }
    }

    // 4. Check known comparison links
    if (!resolved) {
      for (const p of products) {
        if (p.comparisons) {
          for (const comp of p.comparisons) {
            if (comp.affiliateUrl === `/go/${targetId}`) {
              resolved = {
                destinationUrl: comp.productUrl,
                label: `${p.name} on ${comp.storeName}`,
                storeName: comp.storeName,
                isVerified: false,
                isDemo: true,
                isAffiliateTracked: false,
                trackingStatus: 'direct_merchant_link',
              };
              break;
            }
          }
        }
        if (resolved) break;
      }
    }

    // Enforce strict destination URL allowlist validation
    if (resolved && isAllowedDestinationUrl(resolved.destinationUrl)) {
      return resolved;
    }

    return null;
  }
}

// Export a singleton instance of the adapter
export const dataAdapter: IDataSourceAdapter = new LocalDataSourceAdapter();
