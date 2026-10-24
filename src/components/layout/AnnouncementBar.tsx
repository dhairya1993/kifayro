import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-flex items-center gap-1 bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-teal-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            Platform Preview
          </span>
          <span className="text-slate-300 hidden sm:inline">
            Kifayro Preview Mode — Transparent price discovery architecture and sample benchmark deals for Indian shoppers.
          </span>
          <span className="text-slate-300 sm:hidden">
            Kifayro Preview — Benchmark Indian deals.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-slate-300">
          <Link
            href="/how-it-works"
            className="hover:text-white underline underline-offset-2 flex items-center gap-1 font-medium text-[11px]"
          >
            How it works
            <ArrowRight className="w-3 h-3" />
          </Link>
          <span className="text-slate-600 hidden md:inline">|</span>
          <Link
            href="/affiliate-disclosure"
            className="hover:text-white text-[11px] hidden md:inline"
          >
            Affiliate Disclosure
          </Link>
        </div>
      </div>
    </div>
  );
}
