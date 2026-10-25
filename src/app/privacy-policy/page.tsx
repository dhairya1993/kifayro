import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy | Kifayro',
  description:
    'Our privacy policy explaining how Kifayro handles data with respect to Indian privacy principles (DPDP Act).',
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Kifayro',
    description:
      'Our privacy policy explaining how Kifayro handles data with respect to Indian privacy principles (DPDP Act).',
    url: 'https://kifayro.vercel.app/privacy-policy',
    type: 'website',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <header className="space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Effective Date: October 2026 • Compliant with Indian Digital Personal Data Protection Principles
        </p>
      </header>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">1. Overview & Data Minimization</h2>
          <p>
            Kifayro values your digital privacy. Unlike many commercial aggregator portals, we do not require user account registration, password creation, or payment details to browse deals and compare prices.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">2. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 pl-2">
            <li><strong>Technical Access Logs:</strong> Standard web server logs including IP address, browser type, and operating system for DDoS protection and service uptime monitoring.</li>
            <li><strong>Voluntary Form Submissions:</strong> If you use our contact form or newsletter form, we store the name, email address, and message you explicitly provide.</li>
            <li><strong>Minimal Click Analytics:</strong> When you click a partner link, an anonymized timestamp and target identifier are processed to ensure secure outbound routing. We do not store sensitive personal information with click events.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">3. Cookies and Tracking</h2>
          <p>
            Kifayro does not use invasive third-party tracking pixels or behavioral cross-site profiling cookies. When you click an affiliate link to a merchant site (such as Amazon India or Flipkart), that third-party retailer will set their own affiliate tracking cookie in accordance with their individual privacy policies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. Third-Party Websites</h2>
          <p>
            Kifayro contains links to external retailers. Once you leave our domain, your browsing activity and transactions are governed by the respective store&apos;s terms and privacy disclosures. We do not process payments or store credit card data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">5. Contact Our Data Desk</h2>
          <p>
            If you have questions regarding data privacy or wish to request removal of an email submitted via our forms, contact <code className="text-teal-700 bg-slate-100 px-1 py-0.5 rounded font-mono">privacy@kifayro.com</code>.
          </p>
        </section>
      </div>
    </div>
  );
}
