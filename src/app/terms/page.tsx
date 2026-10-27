import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import {
  ShieldCheck,
  Scale,
  AlertCircle,
  ExternalLink,
  Info,
  MessageSquare,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Read the Terms of Use for Kifayro. Understand our platform purpose, price comparison disclosures, sample demonstration data, retailer transactions, and acceptable use.',
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Use — Kifayro',
    description:
      'Read the Terms of Use for Kifayro. Understand our platform purpose, price comparison disclosures, sample demonstration data, retailer transactions, and acceptable use.',
    url: 'https://kifayro.vercel.app/terms',
    type: 'website',
  },
};

export default function TermsPage() {
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
        name: 'Terms of Use',
        item: 'https://kifayro.vercel.app/terms',
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs items={[{ label: 'Terms of Use' }]} />

      <header className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          Consumer Terms &amp; Fair Dealing
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Terms of Use
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Last Updated: October 2026 • Governing Principles for Indian Online Shoppers
        </p>
      </header>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-8 text-sm text-slate-700 leading-relaxed">
        {/* Section 1: Website Purpose */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-teal-600 shrink-0" />
            <h2 className="text-lg font-bold text-slate-900">
              1. Platform Purpose &amp; Informational Scope
            </h2>
          </div>
          <p>
            Kifayro (<strong className="text-slate-900">kifayro.vercel.app</strong>) is an independent, free consumer assistance platform. Kifayro helps users discover products, explore shopping guides, compare available information across multiple online stores, and discover deals to make more informed purchasing decisions.
          </p>
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs text-slate-600 space-y-1.5">
            <p>
              <strong>Not a Retailer:</strong> Kifayro is not an online store, seller, merchant, marketplace, or manufacturer. We do not own, warehouse, pack, ship, deliver, or handle customer support for products featured on the site.
            </p>
          </div>
        </section>

        {/* Section 2: Prices, Coupons & Offers */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            2. Retailer Prices, Coupons &amp; Offer Accuracy
          </h2>
          <p>
            Online prices, discount vouchers, bank card promotions, delivery charges, packaging fees, and inventory levels in India are determined exclusively by third-party retailers. These details are updated dynamically and may fluctuate multiple times daily.
          </p>
          <div className="p-4 bg-teal-50/60 border border-teal-100 rounded-2xl text-xs text-slate-700 space-y-1.5">
            <div className="font-bold text-slate-900">Buyer Verification Responsibility:</div>
            <p>
              While Kifayro strives to present clear, benchmarked comparisons, information is provided on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis. <strong>Users must independently verify the final price, delivery cost, seller credibility, and offer terms directly on the retailer&apos;s website before completing any purchase.</strong>
            </p>
          </div>
        </section>

        {/* Section 3: Demonstration Data */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-lg font-bold text-slate-900">
              3. Demonstration &amp; Sample Data Disclosure
            </h2>
          </div>
          <p>
            Kifayro is currently operating in <strong>Demonstration &amp; Testing Mode</strong> while we validate our price comparison models, category taxonomies, and technical integrations:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 pl-2">
            <li>
              <strong>Illustrative Records:</strong> Products, deals, discounts, and coupon entries currently displayed on the platform are illustrative sample records designed to test and showcase interface functionality.
            </li>
            <li>
              <strong>No Misleading Representations:</strong> Sample data must never be interpreted as verified current live offers. Kifayro does not manufacture fake discount percentages, artificial urgency, or unverified lowest-price claims.
            </li>
          </ul>
        </section>

        {/* Section 4: Retailer Transactions & Customer Service */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            4. Retailer Transactions, Payments &amp; Warranties
          </h2>
          <p>
            When you decide to purchase a product discovered on Kifayro, the actual commercial transaction occurs entirely on the external merchant&apos;s platform (such as Amazon India, Flipkart, Croma, Reliance Digital, etc.):
          </p>
          <div className="space-y-2 text-xs text-slate-600 bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
            <p>
              <strong>Direct Contract with Seller:</strong> Any order placement, payment processing, shipping, delivery, order cancellation, product return, refund, or manufacturer warranty claim is governed strictly by the respective retailer&apos;s and seller&apos;s terms and conditions.
            </p>
            <p>
              <strong>No Payment Handling:</strong> Kifayro never requests, collects, or stores credit/debit card details, UPI credentials, or net banking passwords. We do not intermediate payment disputes or guarantee order fulfillment.
            </p>
          </div>
        </section>

        {/* Section 5: Affiliate Transparency */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0" />
            <h2 className="text-lg font-bold text-slate-900">
              5. Commercial Model &amp; Affiliate Transparency
            </h2>
          </div>
          <p>
            Kifayro is completely free for consumers to browse and use. To maintain server hosting, domain infrastructure, and ongoing research:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 pl-2">
            <li>
              <strong>Affiliate Referral Fees:</strong> Kifayro is preparing to participate in official affiliate marketing programs. Where applicable and active, Kifayro may earn a referral commission when a visitor makes an eligible purchase through an affiliate link, at zero extra cost to the buyer.
            </li>
            <li>
              <strong>No Quality or Price Guarantee:</strong> The presence of a merchant link or affiliate partnership should never be interpreted as an endorsement of product quality or a guarantee that the featured retailer offers the absolute lowest price in the market.
            </li>
            <li>
              <strong>Editorial Independence:</strong> Commercial arrangements do not influence our buying guides, review conclusions, or price comparison integrity.
            </li>
          </ul>
        </section>

        {/* Section 6: Amazon Associates Status */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-teal-600 shrink-0" />
            <h2 className="text-lg font-bold text-slate-900">
              6. Amazon Associates Program Status
            </h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Kifayro aligns its policies with the Amazon Associates Program Operating Agreement. The application Store ID issued to Kifayro is <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700 font-semibold">kifayrodeals-21</code>.
          </p>
          <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 text-xs text-slate-600 space-y-2">
            <p>
              The application remains subject to Amazon&apos;s review and program requirements. <strong>The assignment of a Store ID does not itself confirm final approval.</strong>
            </p>
            <p>
              Outbound links to Amazon India currently direct visitors to standard merchant storefront pages without active affiliate referral tracking. Amazon links on this website must not be described as affiliate-tracked unless their tracking parameters and functionality have been verified.
            </p>
            <p className="text-[11px] text-slate-500 pt-1">
              Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
            </p>
          </div>
        </section>

        {/* Section 7: External Links */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-teal-600 shrink-0" />
            <h2 className="text-lg font-bold text-slate-900">
              7. External Links &amp; Third-Party Websites
            </h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Kifayro contains links to external retail websites. Outbound redirect routes (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700">/go/[id]</code>) are screened against a strict allowlist of authorized Indian retailers. However, once you leave Kifayro, we do not control, monitor, or endorse third-party content, policies, or practices. Users are responsible for reviewing the terms and privacy statements of external sites they visit.
          </p>
        </section>

        {/* Section 8: Acceptable Use */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            8. Acceptable Use &amp; Platform Integrity
          </h2>
          <p className="text-xs text-slate-600">
            By accessing Kifayro, you agree to use the website only for lawful, personal, and non-commercial informational purposes. You agree not to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 pl-2">
            <li>Engage in aggressive automated scraping, bot crawling, or excessive automated requests that disrupt server stability or degrade performance for other users.</li>
            <li>Attempt to bypass, disable, or tamper with outbound link validators, security headers, or open-redirect protections.</li>
            <li>Introduce malicious software, viruses, corrupted data, or harmful scripts.</li>
            <li>Misrepresent your identity or attempt to gain unauthorized access to Kifayro&apos;s hosting infrastructure or code repositories.</li>
          </ul>
        </section>

        {/* Section 9: Content & Intellectual Property */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            9. Content &amp; Intellectual Property
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            All original text, shopping guide articles, software code, UI design elements, and logos created by Kifayro are protected under applicable intellectual property laws. You may read, print, and share links to our articles for personal, non-commercial use with proper attribution.
          </p>
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600">
            <strong className="text-slate-900">Third-Party Trademarks:</strong> Merchant names, brand logos, product titles, and retailer graphics (such as Amazon, Flipkart, Croma, Reliance Digital, and Tata CLiQ) belong exclusively to their respective corporate trademark owners. They are referenced on Kifayro under fair dealing principles solely for nominative identification and factual price comparison.
          </div>
        </section>

        {/* Section 10: Liability & Updates to Terms */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">
            10. Liability Limitations &amp; Updates to Terms
          </h2>
          <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
            <p>
              <strong>Information Accuracy:</strong> While we aim for practical precision, Kifayro cannot warrant that all information, specifications, or coupon codes are completely error-free, uninterrupted, or current at all times. Kifayro shall not be liable for purchasing decisions, lost savings, or merchant disputes resulting from reliance on displayed information.
            </p>
            <p>
              <strong>Modifications:</strong> We may revise these Terms of Use periodically to reflect changes in our platform features, affiliate relationships, or applicable statutory standards. The &ldquo;Last Updated&rdquo; date at the top of this page indicates the most recent revision. Continued use of Kifayro following posted updates constitutes acceptance of the modified terms.
            </p>
          </div>
        </section>

        {/* Section 11: Contact & Feedback */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-teal-600 shrink-0" />
            <h2 className="text-lg font-bold text-slate-900">
              11. Contact &amp; Grievance Channels
            </h2>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            If you have questions regarding these Terms of Use, spot a factual error, or wish to report a price discrepancy:
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
              <h3 className="font-bold text-slate-900 text-xs">Public Issue Tracker</h3>
              <p className="text-xs text-slate-600">
                Submit technical feedback or repository notes on GitHub.
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
            Note: Custom domain mailboxes (such as <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-600">support@kifayro.com</code>) are pending DNS mail-exchange configuration. Inquiries are currently handled via our Contact Page and public repository. Kifayro does not publish fictitious office locations or false corporate registrations.
          </p>
        </section>
      </div>
    </div>
  );
}
