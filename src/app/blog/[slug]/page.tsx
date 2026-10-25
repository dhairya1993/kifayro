import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { dataAdapter } from '@/lib/data-adapter';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { formatDate } from '@/lib/formatters';
import { AffiliateDisclosureNotice } from '@/components/ui/AffiliateDisclosureNotice';
import { ArticleContentRenderer } from '@/components/blog/ArticleContentRenderer';
import { CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await dataAdapter.getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found | Kifayro',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const siteUrl = 'https://kifayro.vercel.app';
  const canonicalUrl = `${siteUrl}/blog/${article.slug}`;

  return {
    title: `${article.title} | Kifayro Shopping Guide`,
    description: article.excerpt,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: canonicalUrl,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
      siteName: 'Kifayro',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await dataAdapter.getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await dataAdapter.getArticles();
  const relatedArticles = allArticles.filter((a) => a.id !== article.id).slice(0, 2);

  // Schema.org Article Structured Data
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://kifayro.vercel.app/blog/${article.slug}`,
    },
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kifayro',
      url: 'https://kifayro.vercel.app',
    },
  };

  // Schema.org BreadcrumbList Structured Data
  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://kifayro.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shopping Guides',
        item: 'https://kifayro.vercel.app/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `https://kifayro.vercel.app/blog/${article.slug}`,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Guides', href: '/blog' },
          { label: article.title },
        ]}
      />

      <article className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-2xs space-y-8">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap">
            <span className="font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
              {article.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {article.readingTime}
            </span>
            <span>•</span>
            <span>Published {formatDate(article.publishedAt)}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-snug">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-teal-700 text-white font-bold flex items-center justify-center text-sm shadow-xs">
              {article.author.name.charAt(0)}
            </div>
            <div className="text-xs">
              <div className="font-bold text-slate-900">{article.author.name}</div>
              <div className="text-slate-500">{article.author.role}</div>
            </div>
          </div>
        </header>

        {/* Key Takeaways Callout Box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-sm text-teal-950 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              Key Takeaways
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-teal-900 leading-relaxed">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Rendered Article Markdown Content */}
        <div className="pt-2">
          <ArticleContentRenderer content={article.content} />
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-500">Topics:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author Bio & Editorial Note */}
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 space-y-2">
          <div className="font-bold text-slate-900">
            About Kifayro Editorial Standards
          </div>
          <p className="leading-relaxed">
            This guide was researched and published independently by the Kifayro consumer research desk. We do not accept sponsored placements or compensation to alter our product evaluations or analysis. All retail policies referenced reflect standard practices across authorized Indian e-commerce merchants at time of publication.
          </p>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">More Shopping &amp; Buying Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                className="p-5 bg-white border border-slate-200 rounded-2xl shadow-2xs space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                    {rel.category}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug">
                    <Link href={`/blog/${rel.slug}`} className="hover:text-teal-700 transition-colors">
                      {rel.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{rel.excerpt}</p>
                </div>
                <div className="pt-2">
                  <Link
                    href={`/blog/${rel.slug}`}
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 underline"
                  >
                    Read Guide →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <AffiliateDisclosureNotice variant="compact" />
    </div>
  );
}
