import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure & Transparency Policy | Kifayro',
  description:
    'Full transparency disclosure regarding Kifayro’s affiliate partnerships with Amazon India, Flipkart, and other online retailers.',
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs items={[{ label: 'Affiliate Disclosure' }]} />

      <header className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          Transparency & Commercial Intent
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Affiliate Disclosure
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Last Updated: October 2026 • Standard Disclosure for Indian Online Consumers
        </p>
      </header>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Core Disclosure</h2>
          <p>
            Kifayro (<strong className="text-slate-900">kifayro.com</strong> / <strong className="text-slate-900">kifayro.vercel.app</strong>) is a free price comparison, deals aggregation, and shopping discovery platform for Indian consumers.
          </p>
          <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl text-teal-950 font-medium">
            “Kifayro may earn a commission when you purchase through eligible links, at no additional cost to you.”
          </div>
          <p>
            When you click on an external link or deal button on Kifayro and navigate to a partner merchant (such as Amazon India, Flipkart, Croma, Reliance Digital, Myntra, or Tata CLiQ) and complete a qualifying purchase, the merchant may pay us a referral commission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. Does It Affect Your Price?</h2>
          <p>
            <strong className="text-slate-900">No.</strong> The price you pay on the merchant website is exactly the same as if you visited the merchant directly or searched for the item yourself. In many cases, through verified bank offer alerts and tested coupon codes, you may pay significantly less. The commission is paid by the retailer out of their standard marketing budget.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Specific Program Notices</h2>
          <div className="space-y-3">
            <div className="p-4 bg-slate-50 rounded-xl space-y-1">
              <h3 className="font-bold text-slate-900 text-xs">Amazon Associates India</h3>
              <p className="text-xs text-slate-600">
                Kifayro participates in the Amazon Associates India Programme, an affiliate advertising initiative designed to provide a means for websites to earn advertising fees by advertising and linking to Amazon.in. Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-1">
              <h3 className="font-bold text-slate-900 text-xs">Flipkart & Multi-Network Affiliates</h3>
              <p className="text-xs text-slate-600">
                Kifayro participates in affiliate marketing arrangements with Flipkart, Croma, Tata CLiQ, Myntra, and Nykaa directly or through authorized sub-affiliate networks. All trademarks, service marks, and logos belong to their respective corporate owners.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Editorial Independence</h2>
          <p>
            Our product comparisons, buying guides, and deal picks are selected independently by our research team. We never accept payment to rate an inferior product higher than a superior one, nor do we falsely mark a deal as &ldquo;lowest price in India&rdquo; when verified data does not support the claim.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">5. Contact Information</h2>
          <p>
            If you have questions or require further clarification regarding our commercial relationships, contact our compliance desk at <code className="text-teal-700 bg-slate-100 px-1 py-0.5 rounded font-mono">affiliates@kifayro.com</code>.
          </p>
        </section>
      </div>
    </div>
  );
}
