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
        Direct merchant link.
        <Link
          href="/affiliate-disclosure"
          className="underline hover:text-slate-800"
          title="Learn about Kifayro's affiliate roadmap and commercial policies"
        >
          Affiliate Policy
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
              ? `Kifayro is preparing for affiliate partnerships with ${storeName}. Outbound links currently direct to merchant storefronts without tracking.`
              : 'Kifayro is preparing for affiliate partnerships. Outbound links currently direct to merchant storefronts without affiliate tracking.'}
          </span>
        </div>
        <Link
          href="/affiliate-disclosure"
          className="text-teal-700 font-medium hover:text-teal-900 underline shrink-0 whitespace-nowrap"
        >
          Disclosure
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
            Affiliate Preparedness & Commercial Transparency
          </h4>
          <p className="leading-relaxed text-slate-600">
            Kifayro is an independent, ₹0-cost price comparison and deals discovery platform for Indian consumers. The platform is currently operating in platform preview mode and actively preparing for official affiliate partnerships with retailers like Amazon India, Flipkart, and other Indian merchant networks.
          </p>
          <p className="text-slate-600 leading-relaxed font-medium">
            Once official partnerships are approved, qualifying purchases made through eligible links may generate referral fees to support our platform operations, at zero additional cost to shoppers. In the current preview mode, all outbound links are standard direct merchant links without affiliate tracking or commercial commissions.
          </p>
          <div className="pt-1">
            <Link
              href="/affiliate-disclosure"
              className="text-teal-700 font-semibold hover:text-teal-900 underline inline-flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Read our full statutory disclosure & affiliate roadmap
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
