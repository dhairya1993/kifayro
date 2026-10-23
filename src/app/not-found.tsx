import React from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/search/SearchBar';
import { Compass, Home, Tag, Grid, Scale } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full text-center space-y-6">
        <div className="w-20 h-20 bg-teal-50 text-teal-700 border border-teal-200 rounded-3xl flex items-center justify-center mx-auto shadow-xs">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '20s' }} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
            Error 404 • Page Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight pt-1">
            Looking for a Deal That Moved?
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            The page, product, or offer you requested could not be located. It may have expired, or the URL might have changed.
          </p>
        </div>

        {/* Search Input */}
        <div className="pt-2 max-w-md mx-auto">
          <SearchBar placeholder="Search deals, products, or stores..." />
        </div>

        {/* Quick Links */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-bold">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            Homepage
          </Link>
          <Link
            href="/deals"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
          >
            <Tag className="w-3.5 h-3.5 text-teal-600" />
            All Deals
          </Link>
          <Link
            href="/compare"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
          >
            <Scale className="w-3.5 h-3.5 text-teal-600" />
            Compare Prices
          </Link>
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
          >
            <Grid className="w-3.5 h-3.5 text-teal-600" />
            Categories
          </Link>
        </div>
      </div>
    </div>
  );
}
