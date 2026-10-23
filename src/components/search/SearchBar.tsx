'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, TrendingUp } from 'lucide-react';

interface SearchBarProps {
  initialQuery?: string;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const POPULAR_SEARCHES = [
  'OnePlus 5G',
  'MacBook Air M2',
  'Sony ANC Headphones',
  '1.5 Ton 5 Star Split AC',
  'Philips Air Fryer',
  'Nike Pegasus',
  'Kindle Paperwhite',
];

export function SearchBar({
  initialQuery = '',
  placeholder = 'Search products, brands, deals, or coupons (e.g. OnePlus, AC, Nike)...',
  autoFocus = false,
  className = '',
  size = 'md',
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  if (initialQuery !== prevInitialQuery) {
    setPrevInitialQuery(initialQuery);
    setQuery(initialQuery);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const heightClasses =
    size === 'lg' ? 'h-13 py-3 px-4 text-base' : size === 'sm' ? 'h-9 py-1 px-3 text-xs' : 'h-11 py-2 px-3.5 text-sm';

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="relative flex items-center">
          <Search
            className={`absolute left-3.5 text-slate-400 pointer-events-none ${
              size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'
            }`}
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            aria-label="Search Kifayro deals and products"
            className={`w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-teal-600 rounded-xl pl-10 pr-10 text-slate-900 placeholder:text-slate-400 shadow-2xs focus:shadow-md focus:shadow-teal-900/5 focus:outline-none transition-all ${heightClasses}`}
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Clear search input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </form>

      {/* Popular search suggestions dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-slate-100">
          <div className="p-3 bg-slate-50/70 text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
            Popular Searches in India
          </div>
          <div className="p-2 space-y-0.5">
            {POPULAR_SEARCHES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleSelectSuggestion(item)}
                className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-teal-50 hover:text-teal-950 rounded-lg flex items-center justify-between transition-colors group"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-3 h-3 text-slate-400 group-hover:text-teal-600" />
                  {item}
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider group-hover:text-teal-700">
                  Search
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
