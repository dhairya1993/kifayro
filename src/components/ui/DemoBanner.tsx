import React from 'react';
import Link from 'next/link';
import { Info } from 'lucide-react';

export function DemoBanner({
  className = '',
  itemType = 'catalogue',
}: {
  className?: string;
  itemType?: string;
}) {
  return (
    <div
      className={`rounded-xl bg-amber-50/80 border border-amber-200/80 p-3.5 text-xs text-amber-900 flex items-start gap-3 shadow-xs ${className}`}
      role="note"
      aria-label="Demonstration Notice"
    >
      <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
      <div className="flex-1 space-y-1">
        <p className="font-semibold text-amber-950 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Demonstration & Testing Mode ({itemType})
        </p>
        <p className="text-amber-800 leading-relaxed">
          Kifayro is currently operating with clearly labeled sample data and historical benchmark prices while official Indian affiliate network approvals (Amazon Associates India & Flipkart) are undergoing publisher onboarding. Live affiliate destination links are safe, mapped previews.
        </p>
        <div className="pt-1 flex gap-3 font-medium">
          <Link
            href="/editorial-policy"
            className="text-amber-900 underline hover:text-amber-950"
          >
            Read our verification standards
          </Link>
          <span>•</span>
          <Link
            href="/affiliate-disclosure"
            className="text-amber-900 underline hover:text-amber-950"
          >
            Affiliate transparency pledge
          </Link>
        </div>
      </div>
    </div>
  );
}
