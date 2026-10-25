import React from 'react';
import { Metadata } from 'next';
import { dataAdapter } from '@/lib/data-adapter';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CouponCard } from '@/components/coupons/CouponCard';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { AffiliateDisclosureNotice } from '@/components/ui/AffiliateDisclosureNotice';
import { Ticket, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Indian Store Coupons & Promo Vouchers (Preview) | Kifayro',
  description:
    'Sample promo vouchers, discount codes, and qualification terms for Amazon India, Flipkart, Myntra, Croma, and Nykaa on Kifayro.',
  alternates: {
    canonical: '/coupons',
  },
  openGraph: {
    title: 'Indian Store Coupons & Promo Vouchers (Preview) | Kifayro',
    description:
      'Sample promo vouchers, discount codes, and qualification terms for Amazon India, Flipkart, Myntra, Croma, and Nykaa on Kifayro.',
    url: 'https://kifayro.vercel.app/coupons',
    type: 'website',
  },
};

export default async function CouponsPage() {
  const [coupons, stores] = await Promise.all([
    dataAdapter.getCoupons(),
    dataAdapter.getStores(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs items={[{ label: 'Coupons & Promo Codes' }]} />

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          Coupon Architecture & Sample Vouchers
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Indian Store Coupons & Promo Vouchers (Preview)
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Sample voucher formats illustrating qualifying terms, minimum spend thresholds, and promotional structures across top Indian retailers. Live checkout-tested coupons will be enabled as partner programs activate.
        </p>
      </div>

      <DemoBanner itemType="Coupon Verification Engine" />

      {/* Store Quick Filter Links */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
        <span className="font-semibold text-slate-500 shrink-0">Filter by store:</span>
        {stores.map((store) => (
          <Link
            key={store.id}
            href={`/stores/${store.slug}`}
            className="px-3 py-1.5 bg-white border border-slate-200 hover:border-teal-400 hover:bg-teal-50 text-slate-700 rounded-xl font-medium shrink-0 shadow-2xs transition-colors"
          >
            {store.name}
          </Link>
        ))}
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} />
        ))}
      </div>

      {/* How to use coupons guide box */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Ticket className="w-4 h-4 text-teal-600" />
          How to Apply Coupons on Indian Stores
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Copy the voucher code using the button above. At checkout on the partner store, locate the &ldquo;Have a Coupon / Gift Card / Promo Code&rdquo; input field before payment. Ensure your cart meets the minimum order value excluding convenience and delivery fees. If paying via credit card or UPI, confirm the instant bank discount reflects on the final OTP confirmation page.
        </p>
      </div>

      <AffiliateDisclosureNotice variant="compact" />
    </div>
  );
}
