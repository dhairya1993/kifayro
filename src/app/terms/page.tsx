import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Use | Kifayro',
  description: 'Terms and conditions governing the use of Kifayro deals and price comparison services.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Use | Kifayro',
    description: 'Terms and conditions governing the use of Kifayro deals and price comparison services.',
    url: 'https://kifayro.vercel.app/terms',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs items={[{ label: 'Terms of Use' }]} />

      <header className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Terms of Use
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Last Updated: October 2026 • Governing Law: Republic of India
        </p>
      </header>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Kifayro, you agree to be bound by these Terms of Use and all applicable laws and regulations in India. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. Informational Nature of Service</h2>
          <p>
            Kifayro is an online shopping discovery, deal aggregation, and price comparison interface. Kifayro is not a seller, merchant, or manufacturer. We do not own, warehouse, pack, ship, or warranty any of the goods featured on our platform.
          </p>
          <p>
            Any purchase contract you enter into is strictly between you and the respective third-party retailer (e.g., Amazon India, Flipkart, Croma, etc.).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Price and Stock Fluctuations</h2>
          <p>
            Online prices on Indian platforms are subject to algorithmic updates and seller changes without prior notice. While Kifayro takes every reasonable measure to ensure prices and coupons are verified, we cannot guarantee that an item will remain in stock or that a promotional code will remain valid at the time of your checkout.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Intellectual Property</h2>
          <p>
            The Kifayro brand, logos, original software code, UI design, and editorial articles are the property of Kifayro. Product names, logos, and trademarks of external stores (including Amazon, Flipkart, Croma, etc.) belong to their respective corporate trademark holders and are used solely for descriptive and comparative identification.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">5. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable Indian law, Kifayro shall not be held liable for any indirect, incidental, or consequential damages resulting from product defects, delivery delays, payment disputes, or order cancellations on merchant platforms.
          </p>
        </section>
      </div>
    </div>
  );
}
