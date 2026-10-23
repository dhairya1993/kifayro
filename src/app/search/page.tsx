import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { dataAdapter } from '@/lib/data-adapter';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchResultsClient } from './SearchResultsClient';
import { DemoBanner } from '@/components/ui/DemoBanner';

export const metadata: Metadata = {
  title: 'Search Deals & Products | Kifayro',
  description:
    'Search through verified Indian deals, price comparisons, coupons, and stores on Kifayro.',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q : '';

  const [searchResult, stores, categories] = await Promise.all([
    dataAdapter.search(q),
    dataAdapter.getStores(),
    dataAdapter.getCategories(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumbs items={[{ label: 'Search Results' }]} />

      <div className="space-y-4 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {q ? (
            <>
              Search Results for <span className="text-teal-700">&ldquo;{q}&rdquo;</span>
            </>
          ) : (
            'Search Kifayro Catalogue'
          )}
        </h1>
        <SearchBar initialQuery={q} size="lg" />
      </div>

      <DemoBanner itemType="Search Index" />

      {/* Client-side filterable search results */}
      <Suspense fallback={<div className="p-12 text-center text-xs text-slate-400">Loading search results...</div>}>
        <SearchResultsClient
          initialQuery={q}
          initialResult={searchResult}
          stores={stores}
          categories={categories}
        />
      </Suspense>
    </div>
  );
}
