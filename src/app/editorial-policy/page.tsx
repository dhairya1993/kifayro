import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Editorial Policy & Verification Standards | Kifayro',
  description:
    'Our methodology for verifying discounts, comparing product SKUs, and maintaining independence from retailer influence.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
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
          <h2 className="text-lg font-bold text-slate-900">1. Deal Verification Standard</h2>
          <p>
            We do not automatically scrape and publish unvetted price feeds. Before an offer receives a &ldquo;Verified Deal&rdquo; badge on Kifayro, our team verifies:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 pl-2">
            <li>That the current price is genuinely lower than the typical 90-day selling price.</li>
            <li>That the merchant seller is an authorized distributor or has a rating higher than 85%.</li>
            <li>That any advertised bank offer or instant coupon actually applies at checkout.</li>
            <li>That the product is in stock and ready for dispatch.</li>
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
