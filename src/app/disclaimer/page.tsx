import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Disclaimer | Kifayro',
  description:
    'Legal and pricing disclaimer regarding e-commerce listings, third-party content, and affiliate disclosures on Kifayro.',
  alternates: {
    canonical: '/disclaimer',
  },
  openGraph: {
    title: 'Disclaimer | Kifayro',
    description:
      'Legal and pricing disclaimer regarding e-commerce listings, third-party content, and affiliate disclosures on Kifayro.',
    url: 'https://kifayro.vercel.app/disclaimer',
    type: 'website',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs items={[{ label: 'Disclaimer' }]} />

      <header className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Disclaimer
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Important disclosures concerning price updates, product availability, and merchant links.
        </p>
      </header>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Pricing & Availability Disclaimer</h2>
          <p>
            Prices and availability for products on Indian online stores are accurate as of the date/time indicated on each listing and are subject to change. Any price and availability information displayed on the partner merchant&apos;s site at the time of purchase will apply to the purchase of the product.
          </p>
          <p>
            Kifayro does not guarantee that any price displayed on our platform is the lowest available price in India at any given moment, and we make no representations or warranties regarding price stability.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. No Direct Sales or Merchant Responsibility</h2>
          <p>
            Kifayro is not a seller. We do not process orders, fulfill shipments, handle returns, or provide manufacturer warranties. Customer support inquiries regarding defective items, damaged parcels, or refunds must be directed to the customer service team of the store where the purchase was completed.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Demonstration and Testing Content</h2>
          <p>
            Certain listings, offers, or price data during preview or staging deployments are marked as &ldquo;Demonstration Data&rdquo;. These entries serve to illustrate UI features and comparison workflows while live affiliate API credentials undergo publisher approval.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Third-Party Trademarks</h2>
          <p>
            Amazon, Flipkart, Croma, Reliance Digital, Myntra, Tata CLiQ, Nykaa, and their respective logos are trademarks of their respective owners. Their display on Kifayro does not imply direct sponsorship, endorsement, or joint venture, except where governed by established affiliate publisher agreements.
          </p>
        </section>
      </div>
    </div>
  );
}
