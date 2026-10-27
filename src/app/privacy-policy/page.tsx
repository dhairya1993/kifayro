import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import {
  ShieldCheck,
  EyeOff,
  ExternalLink,
  AlertCircle,
  Info,
  MessageSquare,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read Kifayro’s privacy policy. Learn about our data minimization practices, cookieless browsing, form submission handling, and third-party merchant navigation.',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy — Kifayro',
    description:
      'Read Kifayro’s privacy policy. Learn about our data minimization practices, cookieless browsing, form submission handling, and third-party merchant navigation.',
    url: 'https://kifayro.vercel.app/privacy-policy',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
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
        name: 'Privacy Policy',
        item: 'https://kifayro.vercel.app/privacy-policy',
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <header className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          Data Practices &amp; Transparency Notice
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Last Updated: October 2026 • Honest, Transparent Data Practices for Indian Online Shoppers
        </p>
      </header>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-8 text-sm text-slate-700 leading-relaxed">
        {/* Section 1: Overview & Data Minimization */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-teal-600 shrink-0" />
            <h2 className="text-lg font-bold text-slate-900">
              1. Overview &amp; Data Minimization Principles
            </h2>
          </div>
          <p>
            Kifayro (<strong className="text-slate-900">kifayro.vercel.app</strong>) is an independent, free product discovery and price comparison platform built for consumers in India. Our core approach to digital privacy is <strong>data minimization</strong>: we do not collect personal data that is not strictly necessary to operate our website.
          </p>
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs text-slate-600 space-y-1.5">
            <div className="font-bold text-slate-900">What We Do Not Require:</div>
            <ul className="list-disc list-inside space-y-1">
              <li>No user account registration, profile creation, or password logins.</li>
              <li>No phone numbers, KYC documentation, or identity proofs.</li>
              <li>No bank account numbers, credit/debit card details, UPI IDs, or payment information.</li>
            </ul>
          </div>
          <p className="text-xs text-slate-600">
            You can freely browse all product categories, search comparison tables, read shopping guides, and inspect deal listings without providing any personal information.
          </p>
        </section>

        {/* Section 2: Form Submissions & Backend Status */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-lg font-bold text-slate-900">
              2. Information You May Provide &amp; Form Submission Handling
            </h2>
          </div>
          <p>
            Visitors may voluntarily choose to enter information when using our interactive forms:
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 pl-2">
            <li>
              <strong>Contact Us Form:</strong> Your name, email address, inquiry category, and message details when submitting deal corrections or feedback.
            </li>
            <li>
              <strong>Newsletter Preview Box:</strong> Your email address if attempting to subscribe to preview bulletin announcements.
            </li>
          </ul>

          <div className="p-4 bg-amber-50/80 border border-amber-200/90 rounded-2xl text-amber-950 text-xs space-y-2 leading-relaxed">
            <div className="font-bold text-amber-900 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              Current Technical Reality: No Email Backend or Database Storage
            </div>
            <p>
              Kifayro is currently operating in platform preview mode. <strong>No backend email transmission gateway (e.g. Resend, SendGrid, Amazon SES) or persistent database storage is configured on this deployment.</strong>
            </p>
            <p>
              When you submit the Contact Us form, your details are <strong>not</strong> transmitted across the internet to an inbox, stored on a private database, or retained on a server. Instead, the form renders a local diagnostic notice and provides a clipboard copy tool so you can submit your inquiry directly to our public GitHub repository.
            </p>
          </div>

          <p className="text-xs text-slate-600">
            In the future, if an automated email service is connected to dispatch inquiries to our editorial desk, submitted contact information will be used solely to respond to your specific query and will never be sold, rented, or shared with third-party telemarketers.
          </p>
        </section>

        {/* Section 3: Cookies & Analytics */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0" />
            <h2 className="text-lg font-bold text-slate-900">
              3. Cookies, Analytics &amp; Tracking Technologies
            </h2>
          </div>
          <p>
            Kifayro is committed to a clean, non-invasive browsing experience:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 pl-2">
            <li>
              <strong>No First-Party Tracking Cookies:</strong> Kifayro does not set marketing cookies, cross-site trackers, or behavioral profiling mechanisms on your browser.
            </li>
            <li>
              <strong>Cookieless Web Analytics:</strong> We use <strong>Vercel Web Analytics</strong> (hosted by Vercel Inc.) to monitor aggregate website performance, server response times, and Core Web Vitals. Vercel Analytics is privacy-friendly and cookieless; it does not collect personal identifiers, track visitors across external websites, or construct personal profiles.
            </li>
            <li>
              <strong>No Advertising Pixels:</strong> We do not embed Facebook/Meta pixels, Google Ads remarketing tags, or third-party behavioral advertising scripts on Kifayro.
            </li>
          </ul>
        </section>

        {/* Section 4: Third-Party Retailers */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-teal-600 shrink-0" />
            <h2 className="text-lg font-bold text-slate-900">
              4. Outbound Links &amp; Third-Party Retailer Websites
            </h2>
          </div>
          <p>
            Kifayro indexes product information and provides outbound transition routes (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700">/go/[id]</code>) connecting shoppers directly to third-party Indian e-commerce merchants (including Amazon India, Flipkart, Croma, Reliance Digital, and Tata CLiQ).
          </p>
          <p className="text-xs text-slate-600">
            When you click an outbound link, you leave Kifayro and navigate to the retailer&apos;s independent storefront. <strong>Third-party websites maintain their own privacy policies, terms of service, and cookie tracking rules.</strong>
          </p>
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs text-slate-600 space-y-1.5">
            <p>
              We do not control, oversee, or accept liability for how third-party retailers handle your browsing activity, store accounts, cookies, payment methods, or personal information. We encourage you to inspect the privacy disclosures of each merchant platform before completing an order.
            </p>
          </div>
        </section>

        {/* Section 5: Affiliate Transparency & Amazon Associates Status */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-teal-600 shrink-0" />
            <h2 className="text-lg font-bold text-slate-900">
              5. Affiliate Program Status &amp; Amazon Associates Disclosure
            </h2>
          </div>
          <p>
            Kifayro is preparing to participate in official retail affiliate programs to support platform hosting and ongoing research costs:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 pl-2">
            <li>
              <strong>Affiliate Referral Fees:</strong> When affiliate integrations are formally approved and active, eligible purchases made through approved links may generate a referral fee from the merchant at zero additional cost to the consumer.
            </li>
            <li>
              <strong>Amazon Associates Store ID:</strong> Kifayro has been issued the Amazon Associates Store ID / tracking ID <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700 font-semibold">kifayrodeals-21</code> for its pending publisher application.
            </li>
            <li>
              <strong>No Unverified Claims:</strong> The assignment of a Store ID does <em>not</em> itself confirm final approval. Kifayro does not claim final Amazon Associates approval or active affiliate tracking without verification.
            </li>
            <li>
              <strong>No Active Data Exchange:</strong> Outbound links to Amazon India currently connect directly to standard merchant storefront listings without active affiliate referral parameters. Amazon does not receive visitor data from Kifayro through an affiliate integration unless that integration is verified and operational.
            </li>
          </ul>

          <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 text-xs text-slate-600 space-y-1">
            <p className="font-medium text-slate-700">
              Statutory declaration upon final program approval:
            </p>
            <blockquote className="border-l-2 border-teal-600 pl-3 italic text-slate-800 font-medium my-1">
              &ldquo;As an Amazon Associate, I earn from qualifying purchases.&rdquo;
            </blockquote>
            <p className="text-[11px] text-slate-500 pt-1">
              Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
            </p>
          </div>
        </section>

        {/* Section 6: Dynamic Pricing & Verification */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            6. Product Prices, Offers &amp; Merchant Terms
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            E-commerce pricing in India is dynamic. Listed discounts, coupon validity, stock availability, bank promotions, and shipping fees are determined exclusively by third-party retailers and may change without notice. Kifayro does not sell merchandise or set prices; visitors should always verify current pricing and terms directly on the retailer&apos;s checkout page before completing any payment.
          </p>
        </section>

        {/* Section 7: Data Retention, Security & User Rights */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            7. Data Retention, Security &amp; User Rights
          </h2>
          <div className="space-y-2 text-xs text-slate-600">
            <p>
              <strong>Data Retention:</strong> Because Kifayro does not store contact submissions in a database, operate user accounts, or handle financial transactions, we do not maintain persistent repositories of visitor personal information.
            </p>
            <p>
              <strong>Server Access Logs:</strong> Standard HTTP request logs (such as IP addresses and browser user-agent headers) are processed automatically by Vercel edge infrastructure for essential technical routing, DDoS defense, and uptime monitoring, and are purged in accordance with standard hosting retention cycles.
            </p>
            <p>
              <strong>Your Rights:</strong> You have the right to browse Kifayro without providing personal data. If you have submitted feedback through our public GitHub repository or future direct communication and wish to request its modification or deletion, you may request this at any time.
            </p>
          </div>
        </section>

        {/* Section 8: Contact Channels */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-teal-600 shrink-0" />
            <h2 className="text-lg font-bold text-slate-900">
              8. Privacy Inquiries &amp; Contact Channels
            </h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            If you have questions about these privacy disclosures or wish to report a data-related issue, you can reach out via:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1.5">
              <h3 className="font-bold text-slate-900 text-xs">Direct Web Form</h3>
              <p className="text-xs text-slate-600">
                Submit questions or corrections through our dedicated contact page.
              </p>
              <div className="pt-1">
                <Link
                  href="/contact"
                  className="text-xs font-semibold text-teal-700 hover:text-teal-900 underline"
                >
                  Visit Contact Page →
                </Link>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-1.5">
              <h3 className="font-bold text-slate-900 text-xs">Public GitHub Tracker</h3>
              <p className="text-xs text-slate-600">
                Submit repository issues or security notes to our open issue tracker.
              </p>
              <div className="pt-1">
                <a
                  href="https://github.com/dhairya1993/kifayro/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-teal-700 hover:text-teal-900 underline inline-flex items-center gap-1"
                >
                  <span>GitHub Issues</span>
                  <ExternalLink className="w-3 h-3 inline" />
                </a>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 pt-1">
            Note: Custom domain mailboxes (including <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-600">support@kifayro.com</code> and <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-600">privacy@kifayro.com</code>) are pending DNS mail-exchange setup. Inquiries are currently handled via our Contact Page and public repository. Kifayro does not publish fictitious office locations or false corporate registrations.
          </p>
        </section>
      </div>
    </div>
  );
}
