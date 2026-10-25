import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { dataAdapter } from '@/lib/data-adapter';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductCard } from '@/components/products/ProductCard';
import { DealCard } from '@/components/deals/DealCard';
import { DemoBanner } from '@/components/ui/DemoBanner';
import { AffiliateDisclosureNotice } from '@/components/ui/AffiliateDisclosureNotice';
import { Tag, Scale, ArrowLeft } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await dataAdapter.getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category Not Found | Kifayro',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${category.name} Deals & Price Comparison in India | Kifayro`,
    description: category.description,
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} Deals & Price Comparison in India | Kifayro`,
      description: category.description,
      url: `https://kifayro.vercel.app/categories/${category.slug}`,
      type: 'website',
    },
  };
}

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await dataAdapter.getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const [products, allDeals] = await Promise.all([
    dataAdapter.getProducts({ category: category.slug }),
    dataAdapter.getDeals({ status: 'active' }),
  ]);

  const productIds = new Set(products.map((p) => p.id));
  const categoryDeals = allDeals.filter((d) => productIds.has(d.productId));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Categories', href: '/categories' },
          { label: category.name },
        ]}
      />

      {/* Category Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
          <span>Category Overview</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {category.name}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          {category.description}
        </p>

        {category.subcategories && category.subcategories.length > 0 && (
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Segments:</span>
            {category.subcategories.map((sub) => (
              <span
                key={sub}
                className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium"
              >
                {sub}
              </span>
            ))}
          </div>
        )}
      </div>

      <DemoBanner itemType={`${category.name} Catalogue`} />

      {/* Active Deals in Category */}
      {categoryDeals.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Active {category.name} Deals
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categoryDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </section>
      )}

      {/* Products and Comparisons in Category */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Products Compared in {category.name}
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {products.length} Products Verified
          </span>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-3">
            <p className="text-sm text-slate-600 font-medium">
              No products verified yet in this category.
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Browse other categories
            </Link>
          </div>
        )}
      </section>

      <AffiliateDisclosureNotice variant="compact" />
    </div>
  );
}
