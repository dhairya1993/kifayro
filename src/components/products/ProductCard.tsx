import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { formatINR, calculateDiscount, formatTimeAgo } from '@/lib/formatters';
import { stores } from '@/data/stores';
import { ExternalLink, Scale } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const store = stores.find((s) => s.slug === product.store);
  const discount = calculateDiscount(product.currentPrice, product.originalPrice);
  const comparisonsCount = product.comparisons?.length || 0;

  return (
    <div className="group relative bg-white border border-slate-200/90 hover:border-teal-500/50 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:shadow-teal-950/5">
      <div>
        {/* Top meta row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md">
            {product.brand}
          </span>
          {discount ? (
            <span className="text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/70 px-2 py-0.5 rounded-full">
              {discount}% OFF
            </span>
          ) : null}
        </div>

        {/* Polished Product Visual Representation / Placeholder */}
        <Link href={`/product/${product.slug}`} className="block relative aspect-4/3 rounded-xl bg-slate-50 border border-slate-100 p-4 mb-4 flex items-center justify-center overflow-hidden group-hover:bg-teal-50/20 transition-colors">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-white shadow-2xs border border-slate-200/70 mx-auto flex items-center justify-center text-teal-700 font-black text-xl">
              {product.brand.charAt(0)}
            </div>
            <div className="text-[11px] font-semibold text-slate-500 max-w-[160px] truncate">
              {product.category}
            </div>
          </div>
          {comparisonsCount > 1 && (
            <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-xs text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-full border border-slate-200 flex items-center gap-1 shadow-2xs">
              <Scale className="w-3 h-3 text-teal-600" />
              {comparisonsCount} Stores Compared
            </div>
          )}
        </Link>

        {/* Product Title */}
        <h3 className="font-bold text-slate-900 group-hover:text-teal-900 transition-colors line-clamp-2 text-sm leading-snug">
          <Link href={`/product/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        {/* Store & Verification */}
        <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
          <span>Found on</span>
          <span className="font-semibold text-slate-700">{store?.name || product.store}</span>
          <span className="text-slate-300">•</span>
          <span className="text-[11px] text-slate-400">{formatTimeAgo(product.lastVerifiedAt)}</span>
        </div>

        {/* Best Deal Note if comparative */}
        {product.bestDealNote && (
          <p className="mt-2 text-[11px] text-emerald-800 bg-emerald-50/70 border border-emerald-100 rounded-lg p-2 leading-relaxed">
            {product.bestDealNote}
          </p>
        )}
      </div>

      {/* Bottom Pricing & CTA */}
      <div className="mt-4 pt-3.5 border-t border-slate-100">
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-lg font-black text-slate-900">
            {formatINR(product.currentPrice)}
          </span>
          {product.originalPrice && product.originalPrice > product.currentPrice && (
            <span className="text-xs text-slate-400 line-through">
              {formatINR(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/product/${product.slug}`}
            className="w-full text-center py-2 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
          >
            Compare
          </Link>
          <Link
            href={product.affiliateUrl}
            className="w-full text-center py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1"
            rel="sponsored nofollow"
          >
            Buy Store
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
