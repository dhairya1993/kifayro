import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Editorial Policy & Verification Standards',
  description:
    'Our methodology for verifying discounts, comparing product SKUs, and maintaining independence from retailer influence.',
  alternates: {
    canonical: '/editorial-policy',
  },
  openGraph: {
    title: 'Editorial Policy & Verification Standards — Kifayro',
    description:
      'Our methodology for tracking price benchmarks, comparing product SKUs, and maintaining editorial independence.',
    url: 'https://kifayro.vercel.app/editorial-policy',
    type: 'website',
  },
};

export default function EditorialPolicyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
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
        name: 'Editorial Policy',
        item: 'https://kifayro.vercel.app/editorial-policy',
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: 'Editorial Policy' }]} />

      <header className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Editorial & Verification Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          How Kifayro evaluates, checks, and publishes product recommendations and deals for Indian shoppers.
        </p>
      </header>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Deal Verification Standard (Production Architecture)</h2>
          <p>
            During platform preview, deals and comparison entries serve as architectural benchmarks. Once live automated verification is enabled, before any offer receives verified status on Kifayro, the verification protocol confirms:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 pl-2">
            <li>That the current price is lower than the typical 90-day baseline price.</li>
            <li>That the merchant seller is an authorized distributor or maintains high merchant standing.</li>
            <li>That advertised bank offers or instant coupons actually apply at checkout.</li>
            <li>That the product is in stock and available for delivery.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. Identical SKU Price Comparison</h2>
          <p>
            E-commerce stores frequently offer subtle hardware variations (e.g. 60Hz vs 120Hz panels, older DDR4 vs DDR5 RAM, differing bundled accessories) under similar names. Kifayro enforces strict SKU matching. If identical specifications cannot be established beyond reasonable doubt, comparison data is marked as &ldquo;Unavailable&rdquo; rather than guessed.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Separation of Editorial and Commercial Deals</h2>
          <p>
            Retailers and affiliate networks cannot buy higher placements in our buying guides or search results. Our writers operate independently of commercial affiliate partnerships. If an affiliate link is not available for the best product in a given category, we still recommend that product and link to it directly.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Corrections and Updates</h2>
          <p>
            Online prices in India fluctuate multiple times a day due to dynamic pricing algorithms. When a price changes or an offer expires, we update our listings as soon as verified. Readers are encouraged to report any discrepancies via our <a href="/contact" className="text-teal-700 underline font-semibold">Contact Page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
