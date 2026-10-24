import React from 'react';
import Link from 'next/link';
import { Deal } from '@/types';
import { formatTimeAgo } from '@/lib/formatters';
import { stores } from '@/data/stores';
import { ExternalLink, Clock, Tag, Ticket } from 'lucide-react';

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  const store = stores.find((s) => s.slug === deal.store);
  const isExpired = deal.status === 'expired';

  return (
    <div
      className={`group relative bg-white border rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 ${
        isExpired
          ? 'border-slate-200 bg-slate-50/70 opacity-75'
          : 'border-slate-200/90 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-950/5'
      }`}
    >
      <div>
        {/* Top Badges & Store info */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Link
            href={`/stores/${deal.store}`}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            {store?.name || deal.store}
          </Link>

          <div className="flex items-center gap-1.5">
            {deal.isDemoData && (
              <span className="text-[10px] font-medium text-amber-800 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded">
                Sample
              </span>
            )}
            {isExpired ? (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-200 text-slate-600">
                Expired
              </span>
            ) : deal.discountPercentage ? (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60 flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {deal.discountPercentage}% OFF {deal.isDemoData ? '(Sample)' : ''}
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-teal-50 text-teal-700 border border-teal-200/60">
                {deal.isDemoData ? 'Sample Offer' : 'Special Offer'}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-900 group-hover:text-teal-900 transition-colors line-clamp-2 leading-snug">
          <Link href={`/deal/${deal.slug}`} className="focus:outline-none">
            {deal.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {deal.description}
        </p>

        {/* Coupon Code Pill if present */}
        {deal.couponCode && !isExpired && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-teal-50/80 border border-dashed border-teal-300 rounded-lg text-xs font-mono font-semibold text-teal-900">
            <Ticket className="w-3.5 h-3.5 text-teal-600" />
            Code: {deal.couponCode}
          </div>
        )}
      </div>

      {/* Footer / CTA Section */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-[11px] text-slate-500">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{deal.isDemoData ? 'Sample Offer Record' : `Verified ${formatTimeAgo(deal.lastVerifiedAt)}`}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/deal/${deal.slug}`}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 px-2 py-1"
          >
            Details
          </Link>

          {!isExpired ? (
            <Link
              href={deal.affiliateUrl}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white text-xs font-semibold shadow-xs hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-teal-600/50"
              rel="noopener noreferrer nofollow"
            >
              View Deal
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </Link>
          ) : (
            <span className="text-xs text-slate-400 font-medium px-2 py-1">Ended</span>
          )}
        </div>
      </div>
    </div>
  );
}
