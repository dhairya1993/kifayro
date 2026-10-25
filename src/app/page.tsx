import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { dataAdapter } from '@/lib/data-adapter';
import { SearchBar } from '@/components/search/SearchBar';
import { DealCard } from '@/components/deals/DealCard';
import { ProductCard } from '@/components/products/ProductCard';
import { CouponCard } from '@/components/coupons/CouponCard';
import { NewsletterSection } from '@/components/newsletter/NewsletterSection';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { AffiliateDisclosureNotice } from '@/components/ui/AffiliateDisclosureNotice';
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Scale,
  Ticket,
  BookOpen,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kifayro — Discover Deals. Compare Prices. Save Smarter.',
  description:
    'India’s smart shopping discovery & benchmark price comparison platform. Explore benchmark price checks, store coupons, and curated shopping guides.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Kifayro — Discover Deals. Compare Prices. Save Smarter.',
    description:
      'India’s smart shopping discovery & benchmark price comparison platform for Indian online shoppers.',
    url: 'https://kifayro.vercel.app',
    type: 'website',
    siteName: 'Kifayro',
  },
};

export default async function HomePage() {
  const [categories, trendingDeals, products, coupons, articles] = await Promise.all([
    dataAdapter.getCategories(),
    dataAdapter.getDeals({ status: 'active' }),
    dataAdapter.getProducts(),
    dataAdapter.getCoupons(),
    dataAdapter.getArticles(),
  ]);

  const latestDeals = trendingDeals.slice(0, 4);
  const popularProducts = products.slice(0, 4);
  const featuredCoupons = coupons.slice(0, 3);
  const featuredArticles = articles.slice(0, 3);

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kifayro',
    url: 'https://kifayro.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://kifayro.vercel.app/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    description: 'India’s smart deals aggregator, price comparison tool, and buying discovery platform.',
  };

  return (
    <div className="space-y-16 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-slate-200/80 bg-gradient-to-b from-teal-50/40 via-white to-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/70 border border-teal-200 text-teal-900 text-xs font-semibold shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>Platform Preview</span>
              <span className="text-teal-400">•</span>
              <span className="text-teal-800 font-normal">Transparent Price Discovery for India</span>
            </div>

            {/* Headline & Tagline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Find Better Deals.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600">
                Shop Smarter.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
              Explore deals architecture, compare benchmark prices across trusted Indian stores, and discover transparent shopping intelligence.
            </p>

            {/* Main Hero Search Bar */}
            <div className="pt-2 max-w-2xl mx-auto">
              <SearchBar
                size="lg"
                placeholder="Search by product, store or category (e.g. OnePlus Nord, AC, MacBook)..."
              />

              {/* Quick Search Chips */}
              <div className="mt-4 flex items-center justify-center flex-wrap gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Popular:</span>
                {[
                  { label: '5G Phones under ₹25k', q: '5G' },
                  { label: 'MacBook Air M2', q: 'MacBook' },
                  { label: '5-Star Inverter AC', q: 'AC' },
                  { label: 'Sony Noise Cancelling', q: 'Sony' },
                  { label: 'Nike Shoes', q: 'Nike' },
                ].map((chip) => (
                  <Link
                    key={chip.label}
                    href={`/search?q=${encodeURIComponent(chip.q)}`}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-teal-800 hover:border-teal-400 hover:bg-teal-50/50 transition-colors shadow-2xs"
                  >
                    {chip.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Development Demo Notice */}
        <DemoBanner itemType="Platform Preview Catalogue" />

        {/* Featured Categories Directory Grid */}
        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
                Browse By Department
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                Explore Categories
              </h2>
            </div>
            <Link
              href="/categories"
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 group"
            >
              All Categories
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group p-4 bg-white border border-slate-200/90 hover:border-teal-500/50 rounded-2xl shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm mb-3 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    {cat.name.charAt(0)}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-teal-900 line-clamp-1">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] font-semibold text-teal-700 group-hover:text-teal-900 flex items-center justify-between">
                  <span>View Offers</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Trending Deals Section */}
        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-teal-700">
                <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
                Featured Offers
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                Trending Deals (Preview)
              </h2>
            </div>
            <Link
              href="/deals"
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 group"
            >
              View All Deals
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {latestDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </section>

        {/* Popular Products with Price Comparison Indicator */}
        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-teal-700">
                <Scale className="w-3.5 h-3.5 text-teal-600" />
                Multi-Store Comparison
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                Popular Products Compared
              </h2>
            </div>
            <Link
              href="/compare"
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 group"
            >
              Compare More Products
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>

        {/* Verified Coupons & Savings Section */}
        <section className="space-y-6 bg-slate-100/60 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-10 rounded-3xl border border-slate-200/60">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-teal-700">
                <Ticket className="w-3.5 h-3.5 text-teal-600" />
                Promo Vouchers
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                Curated Indian Store Coupons (Preview)
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Sample promotional structures and voucher formats illustrating qualification rules and spend thresholds.
              </p>
            </div>
            <Link
              href="/coupons"
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 group"
            >
              All Coupons
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredCoupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        </section>

        {/* Shopping Tips and Buying Guides */}
        <section className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-teal-700">
                <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                Editorial Insights
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                Smart Shopping Guides
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 group"
            >
              Browse All Guides
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="font-semibold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full">
                      {article.category}
                    </span>
                    <span>{article.readingTime}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug hover:text-teal-800 transition-colors">
                    <Link href={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    By {article.author.name}
                  </span>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
                  >
                    Read Guide →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Affiliate Disclosure & Trust Section */}
        <section>
          <AffiliateDisclosureNotice variant="full" />
        </section>

        {/* Newsletter Section */}
        <NewsletterSection />
      </div>
    </div>
  );
}
