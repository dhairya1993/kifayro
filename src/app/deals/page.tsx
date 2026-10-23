import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { dataAdapter } from '@/lib/data-adapter';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { AffiliateDisclosureNotice } from '@/components/ui/AffiliateDisclosureNotice';
import { DealsListingClient } from './DealsListingClient';

export const metadata: Metadata = {
  title: 'All Deals & Verified Offers in India',
  description:
    'Browse verified discounts, price drops, and special offers across top Indian e-commerce stores including Amazon India, Flipkart, Croma, and Myntra.',
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
          Verified Indian Deals & Offers
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Filter and sort through verified offers across electronics, smartphones, laptops, fashion, and home appliances. Every deal is timestamped with its last manual check.
        </p>
      </div>

      <DemoBanner itemType="Deals Directory" />

      {/* Interactive deals filtering, sorting and listing */}
      <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Loading verified deals...</div>}>
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
