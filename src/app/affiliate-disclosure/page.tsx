import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Affiliate Transparency Policy & Program Readiness | Kifayro',
  description:
    'Full transparency disclosure regarding Kifayro’s affiliate program readiness, merchant link policy, and commercial independence.',
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
          Affiliate Disclosure & Program Readiness
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Last Updated: October 2026 • Standard Consumer Transparency for Indian Online Shoppers
        </p>
      </header>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Current Operating Status & Core Disclosure</h2>
          <p>
            Kifayro (<strong className="text-slate-900">kifayro.vercel.app</strong>) is an independent, free deals discovery and price comparison architecture for Indian consumers.
          </p>
          <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-2xl text-amber-950 font-medium text-xs leading-relaxed space-y-1">
            <p className="font-bold text-sm text-amber-900">Platform Preview & Affiliate Notice</p>
            <p>
              Kifayro is currently operating in platform demonstration mode. Kifayro does <strong>not</strong> currently participate in Amazon Associates India, the Flipkart Affiliate Programme, or any commercial affiliate networks, and does <strong>not</strong> claim active partner status. External product and deal links currently route directly to standard merchant storefronts with zero affiliate tracking and zero referral commissions.
            </p>
          </div>
          <p>
            We are actively preparing compliance infrastructure and application materials to participate in official affiliate programs. Once applications are formally submitted and approved by respective retailers, eligible links will be enabled with full statutory disclosures.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. Will Affiliate Links Affect What You Pay?</h2>
          <p>
            <strong className="text-slate-900">No.</strong> When authorized affiliate tracking is introduced in the future, the price you pay on the merchant website remains identical to visiting the store directly. Retailer affiliate commissions are paid strictly from the merchant’s marketing budget and never added onto the consumer purchase price.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Specific Program Readiness Notices</h2>
          <div className="space-y-3">
            <div className="p-4 bg-slate-50 rounded-xl space-y-1">
              <h3 className="font-bold text-slate-900 text-xs">Amazon Associates India (Preparation in Progress)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kifayro is being structured to comply fully with the Amazon Associates Program Operating Agreement and Associates Program Policies. Kifayro does not currently possess an approved Amazon Associate tracking ID or active PA-API v5 credentials. All Amazon links are direct merchant navigation links. Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl space-y-1">
              <h3 className="font-bold text-slate-900 text-xs">Flipkart & Other Indian Retailers (Preparation in Progress)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kifayro is preparing publisher applications for Flipkart, Croma, Tata CLiQ, Reliance Digital, Myntra, and Nykaa directly or through authorized publisher platforms. No active affiliate commission agreements or commercial partnerships currently exist. All retailer trademarks, service marks, and logos belong to their respective corporate owners.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Editorial Independence</h2>
          <p>
            Our comparison architecture, buying guides, and deal picks are selected independently by our editorial research desk. We never accept payment to promote an inferior product over a superior one, nor do we falsely claim historical lowest prices when verified data is not present.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">5. Contact Information & Inquiries</h2>
          <p>
            Our custom domain email inboxes (including <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-600">affiliates@kifayro.com</code>) are currently pending DNS and mail server configuration. If you have compliance inquiries or merchant feedback, please visit our <a href="/contact" className="text-teal-700 underline font-semibold">Contact Page</a> or review our open source repository on GitHub.
          </p>
        </section>
      </div>
    </div>
  );
}
