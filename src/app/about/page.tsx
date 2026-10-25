import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AffiliateDisclosureNotice } from '@/components/ui/AffiliateDisclosureNotice';
import { ShieldCheck, Users, Target, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Kifayro — Smarter Online Shopping for India',
  description:
    'Learn about Kifayro’s mission to bring transparency, genuine price verification, and multi-store comparison to Indian online shoppers.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Kifayro — Smarter Online Shopping for India',
    description:
      'Learn about Kifayro’s mission to bring transparency, benchmark pricing, and multi-store comparison to Indian online shoppers.',
    url: 'https://kifayro.vercel.app/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      <header className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          Our Mission & Transparency Pledge
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          About Kifayro
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
          Derived from the word <em className="text-teal-800 font-bold not-italic">“Kifayat”</em> (meaning good value, economy, and smart living), Kifayro was built to restore integrity to online shopping in India.
        </p>
      </header>

      <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
          <h2 className="text-xl font-bold text-slate-900">
            Why Indian Shoppers Need Honest Deals
          </h2>
          <p>
            The Indian e-commerce landscape is booming. Every month, millions of consumers browse major platforms like Amazon India, Flipkart, Croma, and Myntra for smartphones, laptops, appliances, and daily essentials.
          </p>
          <p>
            However, shopping during major sales has become increasingly frustrating. Consumers are frequently greeted with artificially inflated MRPs (Maximum Retail Prices), fake countdown timers, unverified &ldquo;80% OFF&rdquo; stickers, and non-working coupon codes designed only to drop tracking cookies.
          </p>
          <p className="font-semibold text-slate-900">
            Kifayro was built to solve this exact problem.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Our Core Principles</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>No Fake Countdowns:</strong> We will never use countdown clocks to engineer fake FOMO.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>SKU Integrity:</strong> We strictly compare identical product configurations across stores.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Transparent Terms:</strong> We feature explicit voucher qualifications, minimum cart rules, and stated expiration dates.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Commercial Transparency</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kifayro is 100% free for consumers. We are preparing to apply for official affiliate programs: once authorized, qualifying purchases made through eligible links will support platform development at zero additional cost to you. Current preview links route directly to merchant storefronts without affiliate tracking.
            </p>
            <div className="pt-1">
              <Link
                href="/affiliate-disclosure"
                className="text-xs font-bold text-teal-700 hover:underline"
              >
                Read our full affiliate disclosure →
              </Link>
            </div>
          </div>
        </section>
      </div>

      <AffiliateDisclosureNotice variant="full" />
    </div>
  );
}
