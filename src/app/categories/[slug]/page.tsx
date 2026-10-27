import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { dataAdapter } from '@/lib/data-adapter';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductCard } from '@/components/products/ProductCard';
import { DealCard } from '@/components/deals/DealCard';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { AffiliateDisclosureNotice } from '@/components/ui/AffiliateDisclosureNotice';
import { Tag, Scale, ArrowLeft, BookOpen, ArrowRight, Clock } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await dataAdapter.getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${category.name} Deals & Price Comparison in India`,
    description: category.description,
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} Deals & Price Comparison in India — Kifayro`,
      description: category.description,
      url: `https://kifayro.vercel.app/categories/${category.slug}`,
      type: 'website',
    },
  };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await dataAdapter.getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const [products, allDeals, allArticles] = await Promise.all([
    dataAdapter.getProducts({ category: category.slug }),
    dataAdapter.getDeals({ status: 'active' }),
    dataAdapter.getArticles(),
  ]);

  const productIds = new Set(products.map((p) => p.id));
  const categoryDeals = allDeals.filter((d) => productIds.has(d.productId));

  // Map contextual shopping guides to category
  const relevantArticles = allArticles.filter((article) => {
    const s = category.slug;
    if (s === 'mobiles') {
      return (
        article.slug.includes('smartphone') ||
        article.slug.includes('specifications') ||
        article.tags.includes('Smartphones')
      );
    }
    if (s === 'computers') {
      return (
        article.slug.includes('laptop') ||
        article.slug.includes('home-office') ||
        article.tags.includes('Laptops') ||
        article.tags.includes('Home Office')
      );
    }
    if (s === 'appliances') {
      return (
        article.slug.includes('smart-tv') ||
        article.slug.includes('warranty') ||
        article.tags.includes('Smart TV')
      );
    }
    if (s === 'electronics') {
      return (
        article.slug.includes('smart-tv') ||
        article.slug.includes('home-office') ||
        article.slug.includes('specifications') ||
        article.tags.includes('Smart TV')
      );
    }
    if (s === 'home-kitchen') {
      return (
        article.slug.includes('prices-before-buying') ||
        article.slug.includes('genuine-discounts') ||
        article.slug.includes('warranty')
      );
    }
    if (s === 'fashion') {
      return (
        article.slug.includes('coupon-codes') ||
        article.slug.includes('genuine-discounts') ||
        article.slug.includes('sale-events')
      );
    }
    if (s === 'beauty') {
      return (
        article.slug.includes('fake-shopping') ||
        article.slug.includes('coupon-codes')
      );
    }
    if (s === 'grocery') {
      return (
        article.slug.includes('prices-before-buying') ||
        article.slug.includes('listed-discount')
      );
    }
    if (s === 'education') {
      return (
        article.slug.includes('laptop') ||
        article.slug.includes('prices-before-buying')
      );
    }
    return false;
  }).slice(0, 3);

  // Schema.org CollectionPage and BreadcrumbList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: `${category.name} Deals & Price Comparison in India | Kifayro`,
        description: category.description,
        url: `https://kifayro.vercel.app/categories/${category.slug}`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://kifayro.vercel.app',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Categories',
            item: 'https://kifayro.vercel.app/categories',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: category.name,
            item: `https://kifayro.vercel.app/categories/${category.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Categories', href: '/categories' },
          { label: category.name },
        ]}
      />

      {/* Category Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
          <span>Category Overview</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {category.name}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          {category.description}
        </p>

        {category.subcategories && category.subcategories.length > 0 && (
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Segments:</span>
            {category.subcategories.map((sub) => (
              <span
                key={sub}
                className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium"
              >
                {sub}
              </span>
            ))}
          </div>
        )}
      </div>

      <DemoBanner itemType={`${category.name} Catalogue`} />

      {/* Contextual Helpful Guides for this Category */}
      {relevantArticles.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Recommended Buying Guides for {category.name}
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
            >
              All Guides <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relevantArticles.map((art) => (
              <div
                key={art.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-md hover:border-teal-400 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{art.readingTime}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                    <Link href={`/blog/${art.slug}`} className="hover:text-teal-700 transition-colors">
                      {art.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 mt-3">
                  <Link
                    href={`/blog/${art.slug}`}
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
                  >
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Active Deals in Category */}
      {categoryDeals.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Active {category.name} Deals
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categoryDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </section>
      )}

      {/* Products and Comparisons in Category */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Products Compared in {category.name}
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {products.length} Benchmark Products Catalogued
          </span>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
            <p className="text-sm text-slate-600 font-medium">
              No products verified yet in this category.
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Browse other categories
            </Link>
          </div>
        )}
      </section>

      <AffiliateDisclosureNotice variant="compact" />
    </div>
  );
}
