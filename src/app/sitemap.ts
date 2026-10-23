import { MetadataRoute } from 'next';
import { dataAdapter } from '@/lib/data-adapter';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kifayro.vercel.app';
  const buildDate = new Date('2026-10-23T18:00:00.000Z');

  const [products, deals, categories, stores, articles] = await Promise.all([
    dataAdapter.getProducts(),
    dataAdapter.getDeals({ status: 'active' }),
    dataAdapter.getCategories(),
    dataAdapter.getStores(),
    dataAdapter.getArticles(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/deals',
    '/categories',
    '/coupons',
    '/stores',
    '/compare',
    '/blog',
    '/about',
    '/contact',
    '/how-it-works',
    '/affiliate-disclosure',
    '/editorial-policy',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: buildDate,
    changeFrequency: route === '' || route === '/deals' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/deals' || route === '/compare' ? 0.9 : 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${siteUrl}/product/${p.slug}`,
    lastModified: new Date(p.lastVerifiedAt),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const dealRoutes: MetadataRoute.Sitemap = deals.map((d) => ({
    url: `${siteUrl}/deal/${d.slug}`,
    lastModified: new Date(d.lastVerifiedAt),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${siteUrl}/categories/${c.slug}`,
    lastModified: buildDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const storeRoutes: MetadataRoute.Sitemap = stores.map((s) => ({
    url: `${siteUrl}/stores/${s.slug}`,
    lastModified: buildDate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${siteUrl}/blog/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
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
