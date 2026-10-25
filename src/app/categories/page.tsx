import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { dataAdapter } from '@/lib/data-adapter';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Categories Directory | Kifayro',
  description:
    'Explore benchmark deals, price comparisons, and buying guides by category: Mobiles, Electronics, Laptops, Home Appliances, Fashion, Beauty, and Grocery in India.',
  alternates: {
    canonical: '/categories',
  },
  openGraph: {
    title: 'Categories Directory | Kifayro',
    description:
      'Explore benchmark deals, price comparisons, and buying guides by category across Indian online retail.',
    url: 'https://kifayro.vercel.app/categories',
    type: 'website',
  },
};

export default async function CategoriesPage() {
  const [categories, allDeals, allProducts] = await Promise.all([
    dataAdapter.getCategories(),
    dataAdapter.getDeals({ status: 'active' }),
    dataAdapter.getProducts(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs items={[{ label: 'Categories' }]} />

      <div className="space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Product & Deal Categories
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Browse verified deals, price drops, and product comparisons across nine primary Indian online shopping categories.
        </p>
      </div>

      <DemoBanner itemType="Category Taxonomy" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const catProducts = allProducts.filter((p) => p.category === cat.slug);
          const catProductIds = new Set(catProducts.map((p) => p.id));
          const catDeals = allDeals.filter((d) => catProductIds.has(d.productId));

          return (
            <div
              key={cat.id}
              className="bg-white border border-slate-200/90 hover:border-teal-500/50 rounded-2xl p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-black text-lg">
                    {cat.name.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {catDeals.length} Active Deals
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 leading-snug">
                  <Link href={`/categories/${cat.slug}`} className="hover:text-teal-700">
                    {cat.name}
                  </Link>
                </h2>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {cat.description}
                </p>

                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Popular Segments
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.subcategories.map((sub) => (
                        <span
                          key={sub}
                          className="text-[11px] bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href={`/categories/${cat.slug}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-teal-700 text-white text-xs font-bold transition-colors"
                >
                  <span>Explore {cat.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
