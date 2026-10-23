import React from 'react';
import Link from 'next/link';
import { dataAdapter } from '@/lib/data-adapter';
import { ShieldCheck, AlertTriangle, ArrowLeft } from 'lucide-react';
import { OutboundRedirectClient } from './OutboundRedirectClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redirecting to Partner Store | Kifayro',
  description: 'Safely redirecting to verified partner store with Kifayro affiliate transparency.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function OutboundRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const target = await dataAdapter.resolveOutboundTarget(id);

  if (!target) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white border border-rose-200 rounded-2xl p-8 text-center shadow-lg space-y-4">
          <div className="w-12 h-12 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Unrecognized or Expired Link
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            For your security, Kifayro strictly prevents open redirects and never routes visitors to unknown external websites. Destination ID <code className="bg-slate-100 px-1 py-0.5 rounded text-rose-600 font-mono font-semibold">{id}</code> could not be validated against our server registry.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Kifayro Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 text-center shadow-xl space-y-6">
        {/* Verification Icon */}
        <div className="w-16 h-16 bg-teal-50 text-teal-600 border border-teal-200/60 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
            Verified Partner Store
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight pt-1">
            Taking You to {target.storeName}
          </h1>
          <p className="text-xs text-slate-600 font-medium max-w-sm mx-auto">
            &ldquo;{target.label}&rdquo;
          </p>
        </div>

        {/* Client-side auto redirect with countdown and instant button */}
        <OutboundRedirectClient
          destinationUrl={target.destinationUrl}
          storeName={target.storeName}
        />

        {/* Affiliate Disclosure Box */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            Affiliate Transparency Notice
          </div>
          <p className="leading-relaxed text-[11px] text-slate-500">
            Kifayro may earn a commission when you purchase through eligible links, at no additional cost to you. Product pricing, stock availability, and promotional terms are managed directly by {target.storeName}.
          </p>
          <div className="text-[11px] pt-1">
            <Link
              href="/affiliate-disclosure"
              className="text-teal-700 hover:text-teal-900 underline font-medium"
            >
              Read full affiliate policy
            </Link>
          </div>
        </div>

        <div>
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            Cancel and stay on Kifayro
          </Link>
        </div>
      </div>
    </div>
  );
}
