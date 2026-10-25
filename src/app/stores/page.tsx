import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { dataAdapter } from '@/lib/data-adapter';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { AffiliateDisclosureNotice } from '@/components/ui/AffiliateDisclosureNotice';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Supported Indian Online Stores | Kifayro',
  description:
    'Directory of supported Indian e-commerce merchants and affiliate networks: Amazon India, Flipkart, Croma, Reliance Digital, Myntra, Tata CLiQ, and Nykaa.',
  alternates: {
    canonical: '/stores',
  },
  openGraph: {
    title: 'Supported Indian Online Stores | Kifayro',
    description:
      'Directory of supported Indian e-commerce merchants and affiliate networks on Kifayro.',
    url: 'https://kifayro.vercel.app/stores',
    type: 'website',
  },
};

export default async function StoresPage() {
  const [stores, providers, allDeals] = await Promise.all([
    dataAdapter.getStores(),
    dataAdapter.getProviders(),
    dataAdapter.getDeals({ status: 'active' }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs items={[{ label: 'Supported Stores' }]} />

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Supported Indian Retail Stores
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Kifayro compares prices and aggregates verified promotional offers across major authorized marketplaces and electronics retailers in India.
        </p>
      </div>

      <DemoBanner itemType="Retailer Network Directory" />

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => {
          const storeDeals = allDeals.filter((d) => d.store === store.slug);

          return (
            <div
              key={store.id}
              className="bg-white border border-slate-200 hover:border-teal-400 rounded-3xl p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center font-black text-lg border border-slate-200">
                    {store.name.charAt(0)}
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    Status: {store.affiliateProgramStatus}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 leading-snug">
                  <Link href={`/stores/${store.slug}`} className="hover:text-teal-700">
                    {store.name}
                  </Link>
                </h2>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {store.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
                  {store.deliveryTimeEstimate && (
                    <div>
                      <strong className="text-slate-700">Delivery:</strong> {store.deliveryTimeEstimate}
                    </div>
                  )}
                  {store.returnPolicySnippet && (
                    <div>
                      <strong className="text-slate-700">Returns:</strong> {store.returnPolicySnippet}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg">
                  {storeDeals.length} Active Deals
                </span>

                <Link
                  href={`/stores/${store.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-900"
                >
                  <span>Store Deals</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Affiliate Network Status Table */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            Affiliate Network Readiness & Authorization Status
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
            In compliance with our transparency standards, we disclose the exact connection status of our affiliate publisher accounts. We do not claim active API integrations without valid credentials.
          </p>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-semibold">
                <th className="py-3 px-4">Affiliate Program</th>
                <th className="py-3 px-4">Network Code</th>
                <th className="py-3 px-4">Connection Status</th>
                <th className="py-3 px-4">Sub-IDs</th>
                <th className="py-3 px-4">Integration Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {providers.map((prov) => (
                <tr key={prov.id} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900">{prov.name}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{prov.networkCode}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] ${
                        prov.status === 'connected'
                          ? 'bg-emerald-100 text-emerald-800'
                          : prov.status === 'pending_approval'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {prov.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    {prov.supportsSubIds ? 'Permitted' : 'Not Supported'}
                  </td>
                  <td className="py-3 px-4 text-slate-500 max-w-sm leading-relaxed">
                    {prov.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <AffiliateDisclosureNotice variant="compact" />
    </div>
  );
}
