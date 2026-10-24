import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { dataAdapter } from '@/lib/data-adapter';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { AffiliateDisclosureNotice } from '@/components/ui/AffiliateDisclosureNotice';
import { formatINR, formatTimeAgo, formatDate } from '@/lib/formatters';
import {
  ShieldCheck,
  ExternalLink,
  Clock,
  Tag,
  Store,
  AlertCircle,
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const deal = await dataAdapter.getDealBySlug(slug);

  if (!deal) {
    return {
      title: 'Deal Not Found | Kifayro',
    };
  }

  return {
    title: `${deal.title} — Deal Details (Sample Offer) | Kifayro`,
    description: deal.description,
    robots: deal.isDemoData
      ? {
          index: false,
          follow: true,
        }
      : undefined,
  };
}

export default async function DealDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const deal = await dataAdapter.getDealBySlug(slug);

  if (!deal) {
    notFound();
  }

  const [product, store, otherDeals] = await Promise.all([
    dataAdapter.getProductById(deal.productId),
    dataAdapter.getStoreBySlug(deal.store),
    dataAdapter.getDeals({ status: 'active' }),
  ]);

  const isExpired = deal.status === 'expired';
  const relatedDeals = otherDeals.filter((d) => d.id !== deal.id).slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Deals', href: '/deals' },
          { label: deal.title },
        ]}
      />

      {/* Main Deal Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-6">
        {/* Top Badges */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Link
              href={`/stores/${deal.store}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              <Store className="w-3.5 h-3.5 text-slate-500" />
              {store?.name || deal.store}
            </Link>

            {deal.highlightBadge && (
              <span className="text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 px-3 py-1 rounded-full">
                {deal.highlightBadge}
              </span>
            )}
          </div>

          <div>
            {isExpired ? (
              <span className="text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1 rounded-full flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Offer Expired
              </span>
            ) : deal.discountPercentage ? (
              <span className="text-xs font-black bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" />
                {deal.discountPercentage}% OFF (Sample Offer)
              </span>
            ) : null}
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
            {deal.title}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            {deal.description}
          </p>
        </div>

        {/* Product reference box if available */}
        {product && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800">
                Matched Product
              </span>
              <h2 className="font-bold text-sm text-slate-900">{product.name}</h2>
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-lg font-black text-slate-900">
                  {formatINR(product.currentPrice)}
                </span>
                {product.originalPrice && product.originalPrice > product.currentPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatINR(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <Link
              href={`/product/${product.slug}`}
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 self-start sm:self-center"
            >
              Full Product Specs & Comparisons →
            </Link>
          </div>
        )}

        {/* Coupon Code section if present */}
        {deal.couponCode && (
          <div className="p-4 bg-teal-50/60 border border-dashed border-teal-300 rounded-2xl flex items-center justify-between gap-4 flex-wrap">
            <div className="space-y-0.5">
              <span className="text-xs text-teal-900 font-medium">Coupon Code for Checkout:</span>
              <div className="font-mono font-black text-lg text-teal-950 tracking-wider">
                {deal.couponCode}
              </div>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Copy and apply at {store?.name || 'checkout'}
            </span>
          </div>
        )}

        {/* Verification Meta */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              Sample Offer ({deal.dealSource})
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Catalogue record {formatTimeAgo(deal.lastVerifiedAt)}
            </span>
          </div>

          {deal.endDate && (
            <span>Valid Until: {formatDate(deal.endDate)}</span>
          )}
        </div>

        {/* CTA */}
        <div className="pt-2">
          {!isExpired ? (
            <Link
              href={deal.affiliateUrl}
              className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-base shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-teal-600/50"
              rel="noopener noreferrer nofollow"
            >
              <span>View Deal on {store?.name || 'Merchant Site'}</span>
              <ExternalLink className="w-4 h-4 ml-1" />
            </Link>
          ) : (
            <div className="p-4 bg-slate-100 rounded-2xl text-center text-xs text-slate-500 font-medium">
              This promotion has concluded. Check active offers below.
            </div>
          )}
        </div>
      </div>

      <DemoBanner itemType="Sample Offer Record" />

      {/* Related Deals */}
      {relatedDeals.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            More Trending Indian Deals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedDeals.map((d) => (
              <div key={d.id} className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-2">
                <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded">
                  {d.store}
                </span>
                <h3 className="font-bold text-xs text-slate-900 line-clamp-2">
                  <Link href={`/deal/${d.slug}`} className="hover:text-teal-700">
                    {d.title}
                  </Link>
                </h3>
                <div className="pt-2 flex justify-between items-center text-xs">
                  <span className="text-slate-400 text-[11px]">{formatTimeAgo(d.lastVerifiedAt)}</span>
                  <Link href={`/deal/${d.slug}`} className="font-bold text-teal-700 hover:underline">
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <AffiliateDisclosureNotice variant="full" />
    </div>
  );
}
