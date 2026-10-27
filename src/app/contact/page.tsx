import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactFormClient } from './ContactFormClient';
import { Mail, MessageSquare, ShieldCheck, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Kifayro. Submit deal tip-offs, report outdated prices, or inquire about merchant partnership opportunities.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us — Kifayro Support & Editorial Desk',
    description:
      'Get in touch with Kifayro. Submit deal feedback, report price discrepancies, or inquire about merchant partnerships.',
    url: 'https://kifayro.vercel.app/contact',
    type: 'website',
  },
};

export default function ContactPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        name: 'Contact Kifayro',
        description: 'Get in touch with Kifayro. Submit deal tip-offs, report outdated prices, or inquire about merchant partnerships.',
        url: 'https://kifayro.vercel.app/contact',
      },
      {
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
            name: 'Contact Us',
            item: 'https://kifayro.vercel.app/contact',
          },
        ],
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <header className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Contact Us
        </h1>
        <p className="text-base text-slate-600 leading-relaxed font-medium">
          Have a question about a price comparison, spotted an expired deal, or want to suggest a new Indian retailer? We&apos;d love to hear from you.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Info */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-2xs space-y-5">
            <h2 className="font-bold text-base text-slate-900">Contact Channels</h2>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Custom Domain Inboxes:</div>
                  <div className="text-slate-500 font-mono">support@kifayro.com (Setup Pending)</div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Domain mail server and MX records are currently pending configuration.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Public Feedback &amp; Issue Tracker:</div>
                  <a
                    href="https://github.com/dhairya1993/kifayro/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 underline font-medium hover:text-teal-900 inline-flex items-center gap-1"
                  >
                    <span>github.com/dhairya1993/kifayro/issues</span>
                    <ExternalLink className="w-3 h-3 inline" />
                  </a>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Submit bug reports, price corrections, and feature requests directly to the repository.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Affiliate &amp; Partner Inquiries:</div>
                  <div className="text-slate-500 font-mono">affiliates@kifayro.com (Setup Pending)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-teal-50/70 border border-teal-200/80 rounded-2xl text-xs text-teal-900 space-y-1">
            <div className="font-bold">Deal Correction Policy</div>
            <p className="leading-relaxed">
              During preview mode, benchmark corrections and suggested store additions are logged and integrated in periodic repository updates.
            </p>
          </div>
        </div>

        {/* Right: Functional Form */}
        <div className="md:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xs">
          <h2 className="font-bold text-base text-slate-900 mb-4">Send Us a Message</h2>
          <ContactFormClient />
        </div>
      </div>
    </div>
  );
}
