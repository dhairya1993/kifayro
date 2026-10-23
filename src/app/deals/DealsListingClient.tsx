'use client';

import React, { useState, useMemo } from 'react';
import { Deal, Store } from '@/types';
import { DealCard } from '@/components/deals/DealCard';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface DealsListingClientProps {
  initialDeals: Deal[];
  stores: Store[];
  initialStore?: string;
}

export function DealsListingClient({
  initialDeals,
  stores,
  initialStore,
}: DealsListingClientProps) {
  const [selectedStore, setSelectedStore] = useState(initialStore || 'all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'expired'>('all');
  const [sortBy, setSortBy] = useState<'verified' | 'discount' | 'title'>('verified');
  const [searchTerm, setSearchTerm] = useState('');
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const filteredDeals = useMemo(() => {
    return initialDeals.filter((deal) => {
      if (selectedStore !== 'all' && deal.store !== selectedStore) return false;
      if (selectedStatus !== 'all' && deal.status !== selectedStatus) return false;
      if (minDiscount > 0 && (deal.discountPercentage || 0) < minDiscount) return false;

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = deal.title.toLowerCase().includes(q);
        const matchesDesc = deal.description.toLowerCase().includes(q);
        const matchesStore = deal.store.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesStore) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'discount') {
        return (b.discountPercentage || 0) - (a.discountPercentage || 0);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return new Date(b.lastVerifiedAt).getTime() - new Date(a.lastVerifiedAt).getTime();
    });
  }, [initialDeals, selectedStore, selectedStatus, minDiscount, searchTerm, sortBy]);

  const visibleDeals = filteredDeals.slice(0, visibleCount);

  const handleReset = () => {
    setSelectedStore('all');
    setSelectedStatus('all');
    setMinDiscount(0);
    setSearchTerm('');
    setSortBy('verified');
  };

  return (
    <div className="space-y-6">
      {/* Filters and Controls Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by keyword..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-teal-500 transition-colors"
            />
          </div>

          {/* Store Filter */}
          <div>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-teal-500 transition-colors"
            >
              <option value="all">All Stores</option>
              {stores.map((s) => (
                <option key={s.id} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Deal Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'active' | 'expired')}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-teal-500 transition-colors"
            >
              <option value="all">All Offers (Active & Expired)</option>
              <option value="active">Active Only</option>
              <option value="expired">Expired Only</option>
            </select>
          </div>

          {/* Sorting */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'verified' | 'discount' | 'title')}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-teal-500 transition-colors"
            >
              <option value="verified">Sort: Most Recently Verified</option>
              <option value="discount">Sort: Highest Verified Discount</option>
              <option value="title">Sort: Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips & Reset */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{filteredDeals.length}</strong> verified offers
          </div>
          {(selectedStore !== 'all' || selectedStatus !== 'all' || searchTerm) && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Deals Grid */}
      {visibleDeals.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visibleDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>

          {/* Load More Pagination */}
          {visibleCount < filteredDeals.length && (
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 8)}
                className="px-6 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all shadow-2xs"
              >
                Load More Deals ({filteredDeals.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto space-y-3">
          <SlidersHorizontal className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">
            No Deals Matching Your Current Filters
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Try adjusting your store, status, or search keywords. Kifayro only displays deals verified against merchant records.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
