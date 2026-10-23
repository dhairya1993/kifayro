'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Coupon } from '@/types';
import { stores } from '@/data/stores';
import { formatINR, formatTimeAgo, formatDate } from '@/lib/formatters';
import { Copy, Check, ShieldCheck, ChevronDown, ChevronUp, Ticket } from 'lucide-react';

interface CouponCardProps {
  coupon: Coupon;
}

export function CouponCard({ coupon }: CouponCardProps) {
  const [copied, setCopied] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const store = stores.find((s) => s.slug === coupon.store);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white border border-slate-200 hover:border-teal-400/60 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <Link
            href={`/stores/${coupon.store}`}
            className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors"
          >
            {store?.name || coupon.store}
          </Link>

          <span className="text-[11px] font-semibold text-teal-800 bg-teal-50 border border-teal-200/60 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            Verified
          </span>
        </div>

        {/* Discount Title */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-xl font-black text-teal-800">{coupon.discount}</span>
          {coupon.minOrder && (
            <span className="text-xs text-slate-500 font-medium">
              on min order {formatINR(coupon.minOrder)}
            </span>
          )}
        </div>

        <h3 className="font-bold text-slate-900 text-sm leading-snug">
          {coupon.title}
        </h3>
        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
          {coupon.description}
        </p>

        {/* Code Box with Interactive Copy */}
        <div className="mt-4 p-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-hidden">
            <Ticket className="w-4 h-4 text-teal-600 shrink-0" />
            <code className="font-mono font-bold text-sm text-slate-900 tracking-wider select-all truncate">
              {coupon.code}
            </code>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white shadow-xs'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer & Terms Toggle */}
      <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Expires: {formatDate(coupon.expiryDate)}</span>
          <button
            type="button"
            onClick={() => setShowTerms(!showTerms)}
            className="text-teal-700 hover:text-teal-900 font-medium flex items-center gap-1"
          >
            Terms & Conditions
            {showTerms ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showTerms && (
          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1 animate-in fade-in duration-150">
            <div className="font-semibold text-slate-800 mb-1">Coupon Terms:</div>
            <ul className="list-disc list-inside space-y-1">
              {coupon.terms.map((term, i) => (
                <li key={i}>{term}</li>
              ))}
            </ul>
            <div className="pt-2 text-[10px] text-slate-400">
              Last verified against merchant checkout: {formatTimeAgo(coupon.lastVerifiedAt)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
