import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { dataAdapter } from '@/lib/data-adapter';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { DealCard } from '@/components/deals/DealCard';
import { CouponCard } from '@/components/coupons/CouponCard';
import { ProductCard } from '@/components/products/ProductCard';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { AffiliateDisclosureNotice } from '@/components/ui/AffiliateDisclosureNotice';
import { ExternalLink, Tag, Ticket } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const store = await dataAdapter.getStoreBySlug(slug);

  if (!store) {
    return {
      title: 'Store Not Found | Kifayro',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${store.name} Deals, Offers & Coupons in India | Kifayro`,
    description: `Sample discounts, price drops, and promo codes for ${store.name} on Kifayro.`,
    alternates: {
      canonical: `/stores/${store.slug}`,
    },
    openGraph: {
      title: `${store.name} Deals, Offers & Coupons in India | Kifayro`,
      description: `Sample discounts, price drops, and promo codes for ${store.name} on Kifayro.`,
      url: `https://kifayro.vercel.app/stores/${store.slug}`,
      type: 'website',
    },
  };
}

export default async function StoreDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const store = await dataAdapter.getStoreBySlug(slug);

  if (!store) {
    notFound();
  }

  const [allDeals, allCoupons, allProducts] = await Promise.all([
    dataAdapter.getDeals({ store: store.slug }),
    dataAdapter.getCoupons(store.slug),
    dataAdapter.getProducts({ store: store.slug }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Stores', href: '/stores' },
          { label: store.name },
        ]}
      />

      {/* Store Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center font-black text-2xl border border-slate-200 shadow-2xs">
              {store.name.charAt(0)}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md">
                Indian Merchant Profile
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                {store.name} Deals & Offers
              </h1>
            </div>
          </div>

          <a
            href={store.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors self-start sm:self-center"
          >
            <span>Visit {store.name} Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          {store.description}
        </p>

        {/* Policies snippet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
          {store.deliveryTimeEstimate && (
            <div className="p-3 bg-slate-50 rounded-xl">
              <strong className="text-slate-800">Estimated Delivery:</strong> {store.deliveryTimeEstimate}
            </div>
          )}
          {store.returnPolicySnippet && (
            <div className="p-3 bg-slate-50 rounded-xl">
              <strong className="text-slate-800">Standard Return Policy:</strong> {store.returnPolicySnippet}
            </div>
          )}
        </div>
      </div>

      <DemoBanner itemType={`${store.name} Sample Offers Feed`} />

      {/* Active Deals for this Store */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-teal-600" />
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Deals & Offers at {store.name} ({allDeals.length})
          </h2>
        </div>

        {allDeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {allDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        ) : (
          <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center text-xs text-slate-500">
            No active deals currently catalogued for {store.name}.
          </div>
        )}
      </section>

      {/* Coupons for this Store */}
      {allCoupons.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Promotional Coupons for {store.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {allCoupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))}
          </div>
        </section>
      )}

      {/* Products from this Store */}
      {allProducts.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Featured Products Catalogued
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <AffiliateDisclosureNotice
        variant="compact"
        storeName={store.name}
      />
    </div>
  );
}
