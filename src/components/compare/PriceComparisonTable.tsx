import React from 'react';
import Link from 'next/link';
import { StorePriceComparison } from '@/types';
import { formatINR, formatTimeAgo } from '@/lib/formatters';
import { ExternalLink, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

interface PriceComparisonTableProps {
  productName: string;
  comparisons?: StorePriceComparison[];
  bestDealNote?: string;
}

export function PriceComparisonTable({
  productName,
  comparisons,
  bestDealNote,
}: PriceComparisonTableProps) {
  if (!comparisons || comparisons.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center text-slate-600">
        <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
        <h4 className="font-semibold text-slate-800 text-sm">
          Comparative Multi-Store Data Not Yet Verified
        </h4>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          At Kifayro, we only display comparison figures when identical models (SKUs) are verified across multiple stores with fresh price records. We do not guess or compare mismatched variants.
        </p>
      </div>
    );
  }

  // Find lowest price
  const lowestPrice = Math.min(...comparisons.map((c) => c.price));

  return (
    <div className="space-y-4">
      {bestDealNote && (
        <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>{bestDealNote}</span>
        </div>
      )}

      <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-2xs bg-white">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
              <th className="py-3 px-4">Store</th>
              <th className="py-3 px-4">Benchmark Store Price</th>
              <th className="py-3 px-4 hidden sm:table-cell">Delivery & Availability</th>
              <th className="py-3 px-4 hidden md:table-cell">Bank / Payment Offers</th>
              <th className="py-3 px-4 hidden lg:table-cell">Data Checked</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {comparisons.map((comp) => {
              const isBest = comp.price === lowestPrice;

              return (
                <tr
                  key={comp.storeSlug}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    isBest ? 'bg-teal-50/30' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/stores/${comp.storeSlug}`}
                        className="hover:text-teal-700 underline decoration-slate-300 underline-offset-2"
                      >
                        {comp.storeName}
                      </Link>
                      {isBest && (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          Benchmark Lowest
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-extrabold text-sm text-slate-900">
                      {formatINR(comp.price)}
                    </div>
                    {comp.originalPrice && comp.originalPrice > comp.price && (
                      <div className="text-[11px] text-slate-400 line-through">
                        {formatINR(comp.originalPrice)}
                      </div>
                    )}
                  </td>

                  <td className="py-3.5 px-4 hidden sm:table-cell text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{comp.deliveryInfo || 'Standard Delivery Available'}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 hidden md:table-cell text-slate-600">
                    {comp.bankOffers ? (
                      <span className="bg-slate-100 px-2 py-1 rounded text-[11px] text-slate-700">
                        {comp.bankOffers}
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 hidden lg:table-cell text-slate-500">
                    {formatTimeAgo(comp.lastVerifiedAt)}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={comp.affiliateUrl}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-semibold text-xs transition-all ${
                        isBest
                          ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                          : 'border border-slate-300 hover:bg-slate-100 text-slate-700'
                      }`}
                      rel="noopener noreferrer nofollow"
                    >
                      Visit Store
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-slate-500 italic">
        * Comparison covers sample benchmark pricing for identical product SKU: &ldquo;{productName}&rdquo;. Official live merchant listings and affiliate tracking will be connected upon program approval.
      </p>
    </div>
  );
}
