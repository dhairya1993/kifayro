import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { dataAdapter } from '@/lib/data-adapter';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { AffiliateDisclosureNotice } from '@/components/ui/AffiliateDisclosureNotice';
import { DealsListingClient } from './DealsListingClient';

export const metadata: Metadata = {
  title: 'Indian Deals & Offers (Preview) | Kifayro',
  description:
    'Browse sample discounts, price drops, and promotional offers across top Indian e-commerce stores on Kifayro.',
  alternates: {
    canonical: '/deals',
  },
  openGraph: {
    title: 'Indian Deals & Offers (Preview) | Kifayro',
    description:
      'Browse sample discounts, price drops, and promotional offers across top Indian e-commerce stores on Kifayro.',
    url: 'https://kifayro.vercel.app/deals',
    type: 'website',
  },
};

export default async function DealsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const storeParam = typeof resolvedParams.store === 'string' ? resolvedParams.store : undefined;
  const statusParam = typeof resolvedParams.status === 'string' && (resolvedParams.status === 'active' || resolvedParams.status === 'expired' || resolvedParams.status === 'all')
    ? (resolvedParams.status as 'active' | 'expired' | 'all')
    : 'all';

  const [allDeals, stores] = await Promise.all([
    dataAdapter.getDeals({ status: statusParam }),
    dataAdapter.getStores(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumbs items={[{ label: 'All Deals' }]} />

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Indian Deals & Offers (Preview)
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Filter and sort sample deal records across electronics, smartphones, laptops, fashion, and home appliances. Live verified offers will be integrated as official merchant feeds are onboarded.
        </p>
      </div>

      <DemoBanner itemType="Deals Directory" />

      {/* Interactive deals filtering, sorting and listing */}
      <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Loading deal catalogue...</div>}>
        <DealsListingClient
          initialDeals={allDeals}
          stores={stores}
          initialStore={storeParam}
        />
      </Suspense>

      <AffiliateDisclosureNotice variant="compact" className="mt-8" />
    </div>
  );
}
