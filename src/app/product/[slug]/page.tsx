import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { dataAdapter } from '@/lib/data-adapter';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PriceComparisonTable } from '@/components/compare/PriceComparisonTable';
import { DealCard } from '@/components/deals/DealCard';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { AffiliateDisclosureNotice } from '@/components/ui/AffiliateDisclosureNotice';
import { formatINR, calculateDiscount, formatTimeAgo } from '@/lib/formatters';
import {
  ShieldCheck,
  ExternalLink,
  Clock,
  CheckCircle2,
  Scale,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await dataAdapter.getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | Kifayro',
    };
  }

  return {
    title: `${product.name} — Specs & Multi-Store Price Comparison (Sample Data) | Kifayro`,
    description: `Specifications and multi-store benchmark price comparison for ${product.name} across Indian stores on Kifayro.`,
    robots: product.isDemoData
      ? {
          index: false,
          follow: true,
        }
      : undefined,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await dataAdapter.getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [category, store, allDeals] = await Promise.all([
    dataAdapter.getCategoryBySlug(product.category),
    dataAdapter.getStoreBySlug(product.store),
    dataAdapter.getDeals({ status: 'active' }),
  ]);

  const discount = calculateDiscount(product.currentPrice, product.originalPrice);
  const relatedDeals = allDeals
    .filter((d) => d.productId === product.id || d.store === product.store)
    .slice(0, 3);

  // Structured data: Do not emit unsupported Product Offer schemas for demo/sample products
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${product.name} (Sample Specification & Price Comparison)`,
    description: product.description,
    url: `https://kifayro.vercel.app/product/${product.slug}`,
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
          {
            label: category ? category.name : product.category,
            href: `/categories/${product.category}`,
          },
          { label: product.name },
        ]}
      />

      {/* Main Product Showcase Box */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Placeholder */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-100 rounded-2xl p-8 text-center aspect-square flex flex-col items-center justify-center relative">
            <div className="w-24 h-24 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex items-center justify-center text-teal-700 font-black text-3xl mb-3">
              {product.brand.charAt(0)}
            </div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {product.brand}
            </div>
            <div className="text-xs text-slate-400 mt-1">{product.category}</div>

            {discount && (
              <div className="absolute top-4 left-4 bg-amber-50 text-amber-800 border border-amber-200 font-bold text-xs px-3 py-1 rounded-full">
                {discount}% Benchmark Variance (Sample)
              </div>
            )}
          </div>

          {/* Right Column: Key Details, Price, and Buy CTAs */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md">
                  {product.brand}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-medium">
                  Store: <strong className="text-slate-800">{store?.name || product.store}</strong>
                </span>
                {product.isDemoData && (
                  <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                    Sample Data
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-4 sm:p-5 bg-slate-50/80 border border-slate-200/80 rounded-2xl space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">
                  {formatINR(product.currentPrice)}
                </span>
                {product.originalPrice && product.originalPrice > product.currentPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
                {discount && (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                    Sample Diff: {discount}%
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
                <span className="flex items-center gap-1 text-slate-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                  Benchmark Store Price (Sample)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Catalogue record {formatTimeAgo(product.lastVerifiedAt)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href={product.affiliateUrl}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-sm shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-teal-600/50"
                  rel="noopener noreferrer nofollow"
                >
                  <span>Visit {store?.name || product.store}</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>

                <a
                  href="#comparison"
                  className="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors"
                >
                  <Scale className="w-4 h-4 text-teal-700" />
                  Compare Stores
                </a>
              </div>
            </div>

            {/* Key Features Bullet List */}
            {product.features && (
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Key Highlights
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <DemoBanner itemType="Sample Product Specs & Benchmark Pricing" />

      {/* Multi-Store Price Comparison Section */}
      <section id="comparison" className="space-y-4 pt-4">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-teal-600" />
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Compare Prices Across Indian Stores
          </h2>
        </div>
        <p className="text-xs text-slate-600">
          We track identical model codes (SKUs) across authorized retailers to guarantee fair comparisons.
        </p>

        <PriceComparisonTable
          productName={product.name}
          comparisons={product.comparisons}
          bestDealNote={product.bestDealNote}
        />
      </section>

      {/* Technical Specifications Table */}
      {product.specs && (
        <section className="space-y-4 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Technical Specifications
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-xs divide-y sm:divide-y-0 divide-slate-100">
            {Object.entries(product.specs).map(([specKey, specVal]) => (
              <div key={specKey} className="py-2 flex justify-between gap-4 border-b border-slate-100">
                <span className="font-semibold text-slate-500">{specKey}</span>
                <span className="font-medium text-slate-900 text-right">{specVal}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Deals */}
      {relatedDeals.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Related Offers & Deals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </section>
      )}

      <AffiliateDisclosureNotice variant="full" />
    </div>
  );
}
