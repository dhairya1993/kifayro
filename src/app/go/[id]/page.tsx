import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dataAdapter } from '@/lib/data-adapter';
import { ShieldCheck } from 'lucide-react';
import { OutboundRedirectClient } from './OutboundRedirectClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redirecting to Merchant Store',
  description: 'Safely redirecting to verified merchant destination with transparent outbound tracking disclosures.',
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
    notFound();
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 text-center shadow-xl space-y-6">
        {/* Verification Icon */}
        <div className="w-16 h-16 bg-teal-50 text-teal-600 border border-teal-200/60 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
          <ShieldCheck className="w-8 h-8" />
        </div>

        {/* Outbound Destination Badge */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/80 px-3 py-1 rounded-full">
            Direct Merchant Destination
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

        {/* Truthful Destination & Tracking Notice */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            Outbound Link & Tracking Status
          </div>
          <p className="leading-relaxed text-[11px] text-slate-500">
            You are navigating directly to <strong>{target.storeName}</strong>. In our current platform preview mode, this link is a standard direct merchant URL with <strong>no active affiliate tracking or referral commission</strong>. All orders, terms, and customer support are handled directly by {target.storeName}.
          </p>
          <div className="text-[11px] pt-1">
            <Link
              href="/affiliate-disclosure"
              className="text-teal-700 hover:text-teal-900 underline font-medium"
            >
              Learn about our affiliate onboarding roadmap
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
