import React from 'react';
import Link from 'next/link';
import { ShieldCheck, HelpCircle } from 'lucide-react';

interface AffiliateDisclosureProps {
  variant?: 'compact' | 'full' | 'inline' | 'banner';
  storeName?: string;
  className?: string;
}

export function AffiliateDisclosureNotice({
  variant = 'compact',
  storeName,
  className = '',
}: AffiliateDisclosureProps) {
  if (variant === 'inline') {
    return (
      <span className={`text-[11px] text-slate-500 inline-flex items-center gap-1 ${className}`}>
        <ShieldCheck className="w-3 h-3 text-teal-600 inline" />
        Eligible affiliate link.
        <Link
          href="/affiliate-disclosure"
          className="underline hover:text-slate-800"
          title="Learn how Kifayro earns commissions without increasing your price"
        >
          Disclosure
        </Link>
      </span>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        className={`bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 text-xs text-slate-600 flex items-center justify-between gap-2 ${className}`}
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
          <span>
            {storeName
              ? `Kifayro may earn an affiliate commission on eligible purchases made at ${storeName}.`
              : 'Kifayro may earn a commission when you purchase through eligible links, at no additional cost to you.'}
          </span>
        </div>
        <Link
          href="/affiliate-disclosure"
          className="text-teal-700 font-medium hover:text-teal-900 underline shrink-0 whitespace-nowrap"
        >
          Learn more
        </Link>
      </div>
    );
  }

  return (
    <aside
      className={`bg-teal-50/60 border border-teal-100 rounded-xl p-4 text-xs text-slate-700 ${className}`}
      aria-label="Affiliate Disclosure"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-teal-100/70 text-teal-800 rounded-lg shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 flex-1">
          <h4 className="font-semibold text-slate-900 text-sm flex items-center gap-1.5">
            Independent Research & Affiliate Disclosure
          </h4>
          <p className="leading-relaxed text-slate-600">
            Kifayro is a ₹0-cost, free discovery platform for Indian consumers. When you click on product links, deals, or store buttons and make a qualifying purchase, we may receive a referral commission from retail partners like Amazon India, Flipkart, Myntra, Croma, and others.
          </p>
          <p className="text-slate-600 leading-relaxed font-medium">
            This commission never increases the price you pay. Our recommendations and price comparisons remain completely independent, objective, and driven strictly by price data.
          </p>
          <div className="pt-1">
            <Link
              href="/affiliate-disclosure"
              className="text-teal-700 font-semibold hover:text-teal-900 underline inline-flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Read our full statutory disclosure & network policies
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
