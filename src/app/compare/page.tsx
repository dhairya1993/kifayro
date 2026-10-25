import React from 'react';
import { Metadata } from 'next';
import { dataAdapter } from '@/lib/data-adapter';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { PriceComparisonTable } from '@/components/compare/PriceComparisonTable';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { AffiliateDisclosureNotice } from '@/components/ui/AffiliateDisclosureNotice';
import { Scale } from 'lucide-react';
import Link from 'next/link';
import { formatINR } from '@/lib/formatters';

export const metadata: Metadata = {
  title: 'Indian Online Price Comparison Engine | Kifayro',
  description:
    'Compare benchmark prices for electronics, smartphones, and appliances across Indian stores like Amazon India, Flipkart, Croma, and Reliance Digital on Kifayro.',
  alternates: {
    canonical: '/compare',
  },
  openGraph: {
    title: 'Indian Online Price Comparison Engine | Kifayro',
    description:
      'Compare benchmark prices for electronics, smartphones, and appliances across Indian stores like Amazon India, Flipkart, Croma, and Reliance Digital on Kifayro.',
    url: 'https://kifayro.vercel.app/compare',
    type: 'website',
  },
};

export default async function ComparePage() {
  const allProducts = await dataAdapter.getProducts();
  const comparedProducts = allProducts.filter(
    (p) => p.comparisons && p.comparisons.length > 1
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs items={[{ label: 'Price Comparison' }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          <Scale className="w-4 h-4 text-teal-600" />
          SKU-Level Comparison Architecture
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Multi-Store Price Comparison Engine
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          At Kifayro, we believe in fair, transparent price comparisons. We structure comparisons on identical product SKUs across major Indian retailers so you never get mislead by mismatched memory configurations or older processor variants.
        </p>
      </div>

      <DemoBanner itemType="SKU Multi-Store Comparison Database" />

      {/* Comparison Principles Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
            1
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Identical SKU Match</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We compare identical alphanumeric model codes. A 128GB smartphone is never matched against a 256GB variant.
          </p>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
            2
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Transparent Verification</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every store price displays the exact timestamp of its last manual or automated verification check.
          </p>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
            3
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Bank Offer Nuance</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We highlight instant bank discounts and card promotions alongside the baseline checkout price.
          </p>
        </div>
      </div>

      {/* Compared Products List */}
      <section className="space-y-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Currently Compared Products ({comparedProducts.length})
        </h2>

        <div className="space-y-8">
          {comparedProducts.map((product) => {
            const lowestPrice = Math.min(...(product.comparisons?.map((c) => c.price) || [product.currentPrice]));

            return (
              <div
                key={product.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md">
                      {product.brand}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      <Link href={`/product/${product.slug}`} className="hover:text-teal-700">
                        {product.name}
                      </Link>
                    </h3>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[11px] text-slate-400 font-medium">Benchmark Lowest Price:</span>
                    <div className="text-2xl font-black text-slate-900">
                      {formatINR(lowestPrice)}
                    </div>
                  </div>
                </div>

                <PriceComparisonTable
                  productName={product.name}
                  comparisons={product.comparisons}
                  bestDealNote={product.bestDealNote}
                />
              </div>
            );
          })}
        </div>
      </section>

      <AffiliateDisclosureNotice variant="full" />
    </div>
  );
}
