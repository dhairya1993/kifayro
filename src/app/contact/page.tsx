import React from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactFormClient } from './ContactFormClient';
import { Mail, MessageSquare, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Kifayro Support & Editorial Desk',
  description:
    'Get in touch with Kifayro. Submit deal tip-offs, report outdated prices, or inquire about merchant partnership opportunities.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
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
            <h2 className="font-bold text-base text-slate-900">Direct Inquiries</h2>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">General Support & Tips:</div>
                  <div className="text-slate-500 font-mono">support@kifayro.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Editorial & Review Desk:</div>
                  <div className="text-slate-500 font-mono">editorial@kifayro.com</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Affiliate & Partnerships:</div>
                  <div className="text-slate-500 font-mono">affiliates@kifayro.com</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-teal-50/70 border border-teal-200/80 rounded-2xl text-xs text-teal-900 space-y-1">
            <div className="font-bold">Deal Correction Policy</div>
            <p className="leading-relaxed">
              If a price on a merchant site changes before our automated verification updates, please send the link and our team will re-verify it within 2 hours.
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
