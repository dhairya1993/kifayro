import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { AffiliateDisclosureNotice } from '@/components/ui/AffiliateDisclosureNotice';
import {
  ShieldCheck,
  Compass,
  BookOpen,
  Scale,
  Tag,
  AlertCircle,
  ExternalLink,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  Info,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Kifayro, India’s smart shopping discovery and price comparison platform. Explore our mission, educational buying guides, affiliate transparency, and commitment to honest product information.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Kifayro — Shopping Discovery, Guides & Price Comparison',
    description:
      'Learn about Kifayro, India’s smart shopping discovery and price comparison platform. Explore our mission, educational buying guides, affiliate transparency, and commitment to honest product information.',
    url: 'https://kifayro.vercel.app/about',
    type: 'website',
  },
};

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        name: 'About Kifayro',
        description:
          'Learn about Kifayro, India’s smart shopping discovery and price comparison platform. Explore our mission, educational buying guides, and affiliate transparency.',
        url: 'https://kifayro.vercel.app/about',
        mainEntity: {
          '@type': 'Organization',
          name: 'Kifayro',
          url: 'https://kifayro.vercel.app',
        },
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
            name: 'About Us',
            item: 'https://kifayro.vercel.app/about',
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
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero Header */}
      <header className="space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          Our Mission &amp; Transparency Pledge
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          About Kifayro
        </h1>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
          Kifayro helps shoppers discover products, explore shopping guides, and compare available options so they can make more informed purchasing decisions.
        </p>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Derived from the word <em className="text-teal-800 font-bold not-italic">“Kifayat”</em> (किफ़ायत)—signifying good value, economy, and prudent living—Kifayro is an independent shopping discovery platform created for consumers navigating India’s rapidly growing and often confusing online retail landscape.
        </p>
      </header>

      {/* Main Content Sections */}
      <div className="space-y-8 text-sm text-slate-700 leading-relaxed">
        {/* Core Pillars Grid */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            What We Do: Empowering Smarter Shopping in India
          </h2>
          <p className="text-slate-600">
            Shopping online during Indian festive sales or daily promotions should not require navigating inflated MRPs, hidden delivery fees, or countdown clocks designed to trigger impulse buys. Kifayro focuses on five core pillars to assist buyers:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Pillar 1: Product Discovery */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-2xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200/60 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  1. Product Discovery Across Categories
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We index key consumer categories relevant to Indian households—including <Link href="/categories/mobiles" className="text-teal-700 font-medium hover:underline">smartphones</Link>, <Link href="/categories/computers" className="text-teal-700 font-medium hover:underline">laptops</Link>, audio gear, home appliances, and daily essentials. Shoppers can explore curated selections based on form factor, specifications, and genuine utility rather than sponsored placement.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/categories"
                  className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
                >
                  Explore All Categories <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 2: Shopping Guides */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-2xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200/60 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  2. Educational Shopping Guides
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We author research-backed guides addressing real shopping dilemmas in India. Our articles explain how to detect inflated MRPs, interpret the CCPA Dark Patterns Guidelines, evaluate laptop specifications, verify warranty coverage, and avoid deceptive shopping portals.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/blog"
                  className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
                >
                  Read Shopping Guides <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 3: Product Comparisons */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-2xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200/60 flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  3. Multi-Store SKU Comparisons
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our price comparison architecture compares identical product configurations (exact model codes, RAM, storage, and colour variants) across major Indian retailers including Amazon India, Flipkart, Croma, and Reliance Digital, based on publicly available information.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/compare"
                  className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
                >
                  Compare Store Prices <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Pillar 4: Deal & Coupon Discovery */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-2xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200/60 flex items-center justify-center">
                  <Tag className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  4. Curated Deal &amp; Coupon Discovery
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We track retail offers, store coupons, and seasonal promotions across authorized storefronts. Rather than dumping unverified voucher codes, we detail stated terms, minimum cart thresholds, and expiry dates to save you time at checkout.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/deals"
                  className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
                >
                  View Deals Catalogue <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Data & Transparency Notice */}
        <section className="bg-amber-50/70 border border-amber-200/90 rounded-3xl p-6 sm:p-8 space-y-3 text-amber-950">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
            <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
            <h2>Platform Demonstration Mode &amp; Sample Data Disclosure</h2>
          </div>
          <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
            Kifayro is currently operating in <strong>Demonstration and Testing Mode</strong> while we complete technical infrastructure, data adapter validations, and publisher compliance reviews.
          </p>
          <ul className="space-y-1.5 text-xs text-amber-900/90 list-disc list-inside">
            <li>
              <strong>Sample Product &amp; Deal Records:</strong> Current product cards, deal badges, and coupon entries are illustrative sample records designed to test and showcase interface functionality. They should not be treated as live commercial offers.
            </li>
            <li>
              <strong>No Unsupported Claims:</strong> We do not fabricate price drop percentages, historical lowest-price claims, customer reviews, or product ratings. Verification timestamps are only shown when supported by verified data.
            </li>
            <li>
              <strong>Direct Store Navigation:</strong> Outbound transition links currently connect directly to official retailer storefronts without commercial tracking.
            </li>
          </ul>
        </section>

        {/* Commitment to Responsible Shopping */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
          <h2 className="text-xl font-bold text-slate-900">
            A Commitment to Transparent Information &amp; Responsible Shopping
          </h2>
          <p className="text-slate-600">
            Online retail is often engineered to create false urgency. Kifayro operates with a clear commitment to consumer protection and transparency:
          </p>

          <div className="space-y-3 pt-1">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 font-semibold">Zero Fake Urgency &amp; Dark Patterns:</strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  We do not use synthetic countdown clocks, fake scarcity prompts (&ldquo;Only 1 left in stock!&rdquo;), or deceptive banner popups. Our guidance adheres to the Central Consumer Protection Authority (CCPA) Dark Patterns Guidelines (2023).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 font-semibold">True Net Landed Cost Focus:</strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  We educate shoppers to evaluate the final rupee amount payable at checkout—including delivery charges, packaging fees, and capped bank discounts—rather than relying on exaggerated percentage discount badges.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 font-semibold">SKU &amp; Spec Integrity:</strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  We compare only identical product configurations. A base 128GB phone is never presented as a direct price competitor to a 256GB model without explicitly distinguishing specifications.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-teal-700">
            <Link href="/editorial-policy" className="hover:underline flex items-center gap-1">
              Read Our Editorial Policy <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link href="/how-it-works" className="hover:underline flex items-center gap-1">
              Learn How Kifayro Works <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Affiliate Transparency & Commercial Model */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Affiliate Transparency &amp; Commercial Model
            </h2>
          </div>

          <p className="text-slate-600">
            Kifayro is 100% free for consumers to browse, search, and read. To sustain server costs, domain infrastructure, and ongoing research, Kifayro is preparing to participate in affiliate marketing programs.
          </p>

          <div className="space-y-3 text-xs text-slate-600 bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
            <p>
              <strong className="text-slate-900">How Affiliate Links Work:</strong> Where applicable, Kifayro may use affiliate links and may earn a referral commission when a visitor clicks through to an authorized retailer and makes an eligible purchase.
            </p>
            <p>
              <strong className="text-slate-900">Zero Additional Cost to You:</strong> Any affiliate commission received is paid entirely by the merchant from their standard marketing budget. It never increases the purchase price you pay at checkout.
            </p>
            <p>
              <strong className="text-slate-900">No Guarantee of Lowest Price or Quality:</strong> An affiliate relationship or merchant link on Kifayro should <em>never</em> be interpreted as an endorsement of product quality, a guarantee of manufacturer warranty, or a guarantee that the featured store offers the absolute lowest price available anywhere on the internet.
            </p>
            <p>
              <strong className="text-slate-900">Editorial Independence:</strong> Commercial affiliate partnerships do not dictate our product selections, review outcomes, or shopping guide recommendations.
            </p>
          </div>

          <div className="pt-1">
            <Link
              href="/affiliate-disclosure"
              className="text-xs font-bold text-teal-700 hover:underline inline-flex items-center gap-1"
            >
              Read our full statutory affiliate disclosure <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* Amazon Associates Disclosure */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-teal-600 shrink-0" />
            <h2 className="text-lg font-bold text-slate-900">
              Amazon Associates Program Status &amp; Policy Notice
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Kifayro is actively aligning its platform policies and compliance framework with the <strong>Amazon Associates Program Operating Agreement</strong>.
          </p>

          <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-4 text-xs text-slate-600 space-y-2">
            <p>
              Kifayro has been issued the Amazon Associates tracking ID <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-700 font-semibold">kifayrodeals-21</code>. The application remains subject to Amazon&apos;s review and applicable program requirements. The assignment of a Store ID does not itself confirm final approval. Amazon links on this website must not be described as affiliate-tracked unless their tracking parameters and functionality have been verified.
            </p>
            <p>
              Kifayro does not currently utilize active Product Advertising API (PA-API) credentials. Outbound links to Amazon India currently direct shoppers directly to standard merchant product listings without active referral tracking.
            </p>
            <p className="font-medium text-slate-700 pt-1">
              In strict accordance with Amazon policy, upon formal approval and deployment of active affiliate links, Kifayro will display the required statutory declaration:
            </p>
            <blockquote className="border-l-2 border-teal-600 pl-3 italic text-slate-800 font-medium my-1">
              &ldquo;As an Amazon Associate I earn from qualifying purchases.&rdquo;
            </blockquote>
            <p className="text-[11px] text-slate-500 pt-1">
              Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
            </p>
          </div>
        </section>

        {/* Pricing Accuracy & Buyer Verification */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
          <h2 className="text-xl font-bold text-slate-900">
            Pricing Accuracy, Real-Time Fluctuations &amp; Buyer Verification
          </h2>
          <p className="text-slate-600">
            Indian e-commerce platforms utilize dynamic pricing algorithms. Prices, discount vouchers, bank cashback terms, inventory stock, seller ratings, and delivery fees can change rapidly without notice.
          </p>

          <div className="p-4 bg-teal-50/60 border border-teal-100 rounded-2xl text-xs text-slate-700 space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              Shopper Verification Checklist:
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600">
              <li>
                <strong>Always verify on the retailer&apos;s site:</strong> Check the final price, delivery cost, and estimated arrival date directly on the merchant&apos;s official checkout page before making payment.
              </li>
              <li>
                <strong>Inspect seller credibility:</strong> Check seller ratings and customer feedback on multi-seller platforms before ordering high-value electronics.
              </li>
              <li>
                <strong>Review return &amp; warranty terms:</strong> Confirm whether the item includes brand warranty or seller warranty, and check whether open-box delivery applies.
              </li>
              <li>
                <strong>No sample data reliance:</strong> Never base purchasing decisions solely on sample comparison figures displayed during platform preview.
              </li>
            </ul>
          </div>
        </section>

        {/* Contact & Feedback */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-teal-600 shrink-0" />
            <h2 className="text-xl font-bold text-slate-900">
              Contact &amp; Feedback Channels
            </h2>
          </div>
          <p className="text-slate-600">
            We value feedback from Indian online shoppers, consumer researchers, and retail merchants. If you spot an inaccurate specification, wish to suggest a new Indian retail store, or have compliance inquiries:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
              <h3 className="font-bold text-slate-900 text-xs">Direct Web Contact Form</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submit deal corrections, store requests, or editorial suggestions through our dedicated contact page.
              </p>
              <div className="pt-1">
                <Link
                  href="/contact"
                  className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
                >
                  Visit Contact Page <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
              <h3 className="font-bold text-slate-900 text-xs">Public Feedback &amp; Issue Tracker</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Track open improvements, submit bug reports, or review codebase progress on our official GitHub repository.
              </p>
              <div className="pt-1">
                <a
                  href="https://github.com/dhairya1993/kifayro/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
                >
                  GitHub Issues Tracker <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 pt-1">
            Note: Custom domain mailboxes (such as <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-600">support@kifayro.com</code>) are pending DNS mail-exchange setup; inquiries are currently handled via the contact form and repository issue tracker.
          </p>
        </section>
      </div>

      {/* Full Statutory Affiliate Disclosure Notice */}
      <AffiliateDisclosureNotice variant="full" />
    </div>
  );
}
