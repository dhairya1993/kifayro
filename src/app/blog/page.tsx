import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { dataAdapter } from '@/lib/data-adapter';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { formatDate } from '@/lib/formatters';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { AffiliateDisclosureNotice } from '@/components/ui/AffiliateDisclosureNotice';

export const metadata: Metadata = {
  title: 'Smart Shopping Guides & Consumer Advice',
  description:
    'Research-backed shopping and buying guides on comparing online prices, spotting inflated MRP discounts, evaluating smartphone and laptop specs, and shopping safely in India.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Smart Shopping Guides & Consumer Advice — Kifayro',
    description:
      'Research-backed shopping and buying guides on comparing online prices, spotting inflated MRP discounts, evaluating smartphone and laptop specs, and shopping safely in India.',
    url: 'https://kifayro.vercel.app/blog',
    type: 'website',
    siteName: 'Kifayro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Shopping Guides & Consumer Advice | Kifayro',
    description:
      'Research-backed shopping and buying guides on comparing online prices, spotting inflated MRP discounts, and shopping safely in India.',
  },
};

export default async function BlogPage() {
  const articles = await dataAdapter.getArticles();

  // Schema.org CollectionPage & BreadcrumbList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Smart Shopping & Buying Guides | Kifayro',
    description:
      'Original consumer guides and buying frameworks for Indian online shoppers.',
    url: 'https://kifayro.vercel.app/blog',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://kifayro.vercel.app/blog/${article.slug}`,
        name: article.title,
      })),
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs items={[{ label: 'Shopping Guides' }]} />

      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          <BookOpen className="w-4 h-4 text-teal-600" />
          Independent Editorial Insights
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Smart Shopping &amp; Buying Guides
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Practical knowledge and calculation frameworks to help you navigate Indian e-commerce. Our guides break down deceptive festive marketing, payment fine print, spec comparisons, and warranty rules.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span className="font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
                  {article.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {article.readingTime}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 leading-snug hover:text-teal-800 transition-colors">
                <Link href={`/blog/${article.slug}`}>
                  {article.title}
                </Link>
              </h2>

              <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-slate-900">{article.author.name}</div>
                <div className="text-[11px] text-slate-400">{formatDate(article.publishedAt)}</div>
              </div>

              <Link
                href={`/blog/${article.slug}`}
                className="inline-flex items-center gap-1 font-bold text-teal-700 hover:text-teal-900"
              >
                <span>Read Full</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <AffiliateDisclosureNotice variant="compact" />
    </div>
  );
}
