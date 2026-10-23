'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { SearchResult, Store, Category, Coupon } from '@/types';
import { ProductCard } from '@/components/products/ProductCard';
import { DealCard } from '@/components/deals/DealCard';
import { CouponCard } from '@/components/coupons/CouponCard';
import { Search, RotateCcw } from 'lucide-react';

interface SearchResultsClientProps {
  initialQuery: string;
  initialResult: SearchResult;
  stores: Store[];
  categories: Category[];
}

export function SearchResultsClient({
  initialQuery,
  initialResult,
  stores,
  categories,
}: SearchResultsClientProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'deals' | 'coupons'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStore, setSelectedStore] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('relevance');

  // Filter products
  const filteredProducts = useMemo(() => {
    let list = [...initialResult.products];
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }
    if (selectedStore !== 'all') {
      list = list.filter((p) => p.store === selectedStore);
    }
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.currentPrice - b.currentPrice);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.currentPrice - a.currentPrice);
    } else if (sortBy === 'discount') {
      list.sort((a, b) => {
        const discA = a.originalPrice ? (a.originalPrice - a.currentPrice) / a.originalPrice : 0;
        const discB = b.originalPrice ? (b.originalPrice - b.currentPrice) / b.originalPrice : 0;
        return discB - discA;
      });
    } else if (sortBy === 'verified') {
      list.sort((a, b) => new Date(b.lastVerifiedAt).getTime() - new Date(a.lastVerifiedAt).getTime());
    }
    return list;
  }, [initialResult.products, selectedCategory, selectedStore, sortBy]);

  // Filter deals
  const filteredDeals = useMemo(() => {
    let list = [...initialResult.deals];
    if (selectedStore !== 'all') {
      list = list.filter((d) => d.store === selectedStore);
    }
    return list;
  }, [initialResult.deals, selectedStore]);

  const totalResults =
    filteredProducts.length + filteredDeals.length + initialResult.coupons.length;

  return (
    <div className="space-y-6">
      {/* Search Filters Row */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-teal-500"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Store Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Store
            </label>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-teal-500"
            >
              <option value="all">All Stores</option>
              {stores.map((s) => (
                <option key={s.id} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-teal-500"
            >
              <option value="relevance">Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest Verified Discount</option>
              <option value="verified">Most Recently Verified</option>
            </select>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeTab === 'all'
                  ? 'bg-teal-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Matches ({totalResults})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('products')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeTab === 'products'
                  ? 'bg-teal-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Products ({filteredProducts.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('deals')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeTab === 'deals'
                  ? 'bg-teal-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Deals ({filteredDeals.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('coupons')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeTab === 'coupons'
                  ? 'bg-teal-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Coupons ({initialResult.coupons.length})
            </button>
          </div>

          {(selectedCategory !== 'all' || selectedStore !== 'all' || sortBy !== 'relevance') && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedStore('all');
                setSortBy('relevance');
              }}
              className="inline-flex items-center gap-1 text-teal-700 hover:text-teal-900 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Content */}
      {totalResults > 0 ? (
        <div className="space-y-10">
          {/* Products Section */}
          {(activeTab === 'all' || activeTab === 'products') && filteredProducts.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">
                Matching Products & Price Comparisons ({filteredProducts.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}

          {/* Deals Section */}
          {(activeTab === 'all' || activeTab === 'deals') && filteredDeals.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">
                Matching Verified Deals ({filteredDeals.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredDeals.map((d) => (
                  <DealCard key={d.id} deal={d} />
                ))}
              </div>
            </section>
          )}

          {/* Coupons Section */}
          {(activeTab === 'all' || activeTab === 'coupons') && initialResult.coupons.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">
                Matching Coupons ({initialResult.coupons.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {initialResult.coupons.map((c: Coupon) => (
                  <CouponCard key={c.id} coupon={c} />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
          <Search className="w-12 h-12 text-slate-300 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">
            No Exact Matches Found for &ldquo;{initialQuery}&rdquo;
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            We couldn&apos;t find verified products, deals, or coupon codes matching your query. Check your spelling or browse our popular departments below.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <Link
              href="/deals"
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Browse All Deals
            </Link>
            <Link
              href="/categories"
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors"
            >
              View Categories
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
