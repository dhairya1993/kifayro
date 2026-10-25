import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AffiliateDisclosureNotice } from '@/components/ui/AffiliateDisclosureNotice';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How Kifayro Works — Deal Verification & Comparison',
  description:
    'Discover how Kifayro indexes products, tracks price benchmarks, compares SKUs across Indian stores, and sustains itself through transparent affiliate links.',
  alternates: {
    canonical: '/how-it-works',
  },
  openGraph: {
    title: 'How Kifayro Works — Deal Verification & Comparison',
    description:
      'Discover how Kifayro indexes products, tracks price benchmarks, and compares SKUs across Indian stores.',
    url: 'https://kifayro.vercel.app/how-it-works',
    type: 'website',
  },
};

export default function HowItWorksPage() {
  const steps = [
    {
      step: '01',
      title: 'Catalogue Indexing & Offer Curation',
      desc: 'Our editorial desk tracks popular electronics, smartphones, laptops, and home appliances from authorized Indian retailers including Amazon India, Flipkart, Croma, and Reliance Digital.',
    },
    {
      step: '02',
      title: 'Manual & Algorithmic Price Verification Architecture',
      desc: 'We structure price tracking against statutory MRPs and 90-day selling baselines, preparing algorithms to filter out misleading festive price inflations.',
    },
    {
      step: '03',
      title: 'SKU-Level Store Comparison',
      desc: 'We cross-reference identical model codes (SKUs). A product with 8GB RAM is never compared with a 16GB variant. We structure comparisons with active bank offers, delivery estimates, and check timestamps.',
    },
    {
      step: '04',
      title: 'Direct Merchant Navigation & Affiliate Preparedness',
      desc: 'When you decide to purchase, our safe outbound link (/go/[id]) sends you directly to the merchant storefront. External links currently operate without affiliate tracking. Once official partnerships are approved, qualifying purchases will support the platform at zero extra cost to shoppers.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      <Breadcrumbs items={[{ label: 'How It Works' }]} />

      <header className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          The Science of Smart Discovery
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          How Kifayro Works
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
          A transparent, step-by-step look at how we discover deals, verify pricing accuracy, and operate our ₹0-cost shopping discovery platform.
        </p>
      </header>

      {/* Step by Step Breakdown */}
      <div className="space-y-6">
        {steps.map((s) => (
          <div
            key={s.step}
            className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs flex flex-col sm:flex-row items-start gap-6"
          >
            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200/60 font-black text-xl flex items-center justify-center shrink-0">
              {s.step}
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">{s.title}</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Trust pledge card */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-4">
        <h3 className="text-xl font-bold">Our Promise to Indian Online Shoppers</h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Kifayro does not sell products, collect credit card details, or stock inventory. We are an independent price comparison and deals curation tool. When you shop through our platform, you always checkout securely on the official merchant site with their direct customer protection policies.
        </p>
        <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-teal-400">
          <Link href="/deals" className="hover:underline flex items-center gap-1">
            Browse Deals Catalogue →
          </Link>
          <Link href="/compare" className="hover:underline flex items-center gap-1">
            Compare Benchmark Prices →
          </Link>
        </div>
      </div>

      <AffiliateDisclosureNotice variant="full" />
    </div>
  );
}
