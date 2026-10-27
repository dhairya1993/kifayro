import { MetadataRoute } from 'next';
import { dataAdapter } from '@/lib/data-adapter';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kifayro.vercel.app';

  const [products, deals, categories, stores, coupons, articles] = await Promise.all([
    dataAdapter.getProducts(),
    dataAdapter.getDeals({ status: 'active' }),
    dataAdapter.getCategories(),
    dataAdapter.getStores(),
    dataAdapter.getCoupons(),
    dataAdapter.getArticles(),
  ]);

  // Meaningful content revision timestamps reflecting actual updates
  const legalUpdateDate = new Date('2026-10-23T00:00:00.000Z');
  const editorialReviewDate = new Date('2026-10-24T00:00:00.000Z');
  const catalogueStructureDate = new Date('2026-10-25T00:00:00.000Z');

  // Most recent article publication timestamp for blog index and homepage
  const latestArticleDate = articles.length > 0
    ? new Date(Math.max(...articles.map((a) => new Date(a.publishedAt).getTime())))
    : editorialReviewDate;

  // Specific content-driven timestamps for each static route
  const staticRouteDates: Record<string, Date> = {
    '': latestArticleDate,
    '/blog': latestArticleDate,
    '/deals': catalogueStructureDate,
    '/compare': catalogueStructureDate,
    '/coupons': catalogueStructureDate,
    '/categories': catalogueStructureDate,
    '/stores': catalogueStructureDate,
    '/about': editorialReviewDate,
    '/how-it-works': editorialReviewDate,
    '/affiliate-disclosure': editorialReviewDate,
    '/editorial-policy': editorialReviewDate,
    '/contact': editorialReviewDate,
    '/privacy-policy': legalUpdateDate,
    '/terms': legalUpdateDate,
    '/disclaimer': legalUpdateDate,
  };

  const staticRoutes: MetadataRoute.Sitemap = Object.entries(staticRouteDates).map(
    ([route, lastModified]) => ({
      url: `${siteUrl}${route}`,
      lastModified,
    })
  );

  // Exclude demo-only products and demo deals from public sitemap indexation
  const liveProducts = products.filter((p) => !p.isDemoData);
  const liveDeals = deals.filter((d) => !d.isDemoData);

  const productRoutes: MetadataRoute.Sitemap = liveProducts.map((p) => ({
    url: `${siteUrl}/product/${p.slug}`,
    lastModified: new Date(p.lastVerifiedAt),
  }));

  const dealRoutes: MetadataRoute.Sitemap = liveDeals.map((d) => ({
    url: `${siteUrl}/deal/${d.slug}`,
    lastModified: new Date(d.lastVerifiedAt),
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${siteUrl}/categories/${c.slug}`,
    lastModified: catalogueStructureDate,
  }));

  // Exclude empty store hubs that currently catalogue no deals, coupons, or products
  // to protect crawl budget and prevent Googlebot soft-404 / thin content flags.
  const populatedStores = stores.filter((store) => {
    const hasDeals = deals.some((d) => d.store === store.slug);
    const hasProducts = products.some((p) => p.store === store.slug);
    const hasCoupons = coupons.some((c) => c.store === store.slug);
    return hasDeals || hasProducts || hasCoupons;
  });

  const storeRoutes: MetadataRoute.Sitemap = populatedStores.map((s) => ({
    url: `${siteUrl}/stores/${s.slug}`,
    lastModified: catalogueStructureDate,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${siteUrl}/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...dealRoutes,
    ...storeRoutes,
    ...articleRoutes,
  ];
}
