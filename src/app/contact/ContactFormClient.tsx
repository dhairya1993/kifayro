'use client';

import React, { useState } from 'react';
import { AlertCircle, Send, ExternalLink, Copy, Check } from 'lucide-react';

export function ContactFormClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Deal Correction',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'notice'>('idle');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }
    // Truthful notification: do not simulate false delivery when mail gateway is unconfigured
    setStatus('notice');
    setCopied(false);
  };

  const handleCopyDetails = async () => {
    const textToCopy = [
      `Sender Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Inquiry Type: ${formData.category}`,
      `Message:\n${formData.message}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback if clipboard API is restricted
      setCopied(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Honest Preview Notice Banner */}
      <div
        className="p-3.5 bg-amber-50 border border-amber-200/90 rounded-2xl text-xs text-amber-950 flex items-start gap-2.5 shadow-2xs"
        role="region"
        aria-label="Preview notice"
      >
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold text-amber-900">Platform Preview Notice: </span>
          Online message delivery via this form is currently unconfigured because an external email service (such as Resend, Amazon SES, or SendGrid) has not yet been provisioned. Inquiries and deal corrections should be submitted via our official GitHub repository issue tracker.
        </div>
      </div>

      {status === 'notice' && (
        <div
          role="status"
          aria-live="polite"
          className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3.5 animate-in fade-in"
        >
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Message Not Sent: Mail Delivery Gateway Unconfigured</span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Thank you, <strong>{formData.name || 'Visitor'}</strong>. Your message was <strong>not</strong> dispatched across the internet because an automated email transmission service is not currently configured for this deployment.
          </p>

          <p className="text-xs text-slate-600 leading-relaxed">
            To ensure your feedback or price correction is received, you can copy your message details below and submit them directly to our public repository tracker:
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleCopyDetails}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-semibold shadow-2xs transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-teal-600" />
                  <span className="text-teal-700">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  <span>Copy Message Details</span>
                </>
              )}
            </button>

            <a
              href="https://github.com/dhairya1993/kifayro/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-2xs transition-colors"
            >
              <span>Submit on GitHub Issues</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
        <div>
          <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1">
            Your Name <span className="text-rose-500" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            aria-required="true"
            autoComplete="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Rahul Sharma"
            className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1">
            Your Email Address <span className="text-rose-500" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            aria-required="true"
            autoComplete="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. rahul@example.com"
            className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
          />
        </div>

        <div>
          <label htmlFor="contact-category" className="block text-xs font-semibold text-slate-700 mb-1">
            Inquiry Type
          </label>
          <select
            id="contact-category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
          >
            <option value="Deal Correction">Report Outdated Price or Expired Deal</option>
            <option value="Product Request">Request Product Price Comparison</option>
            <option value="Merchant Partnership">Merchant / Affiliate Collaboration</option>
            <option value="Feedback">General Suggestion or Feedback</option>
          </select>
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1">
            Message / Details <span className="text-rose-500" aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-message"
            required
            aria-required="true"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Please include product names or merchant URLs if reporting a price discrepancy..."
            className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-900 active:bg-slate-950 text-white font-bold text-xs shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-slate-700/50 cursor-pointer"
        >
          <span>Submit Inquiry (Preview Notice)</span>
          <Send className="w-3.5 h-3.5" />
        </button>

        <p className="text-[11px] text-slate-500 text-center leading-relaxed">
          Inquiries are handled in accordance with our transparent privacy and communication policies. Note that this form displays diagnostic notice rather than transmitting emails.
        </p>
      </form>
    </div>
  );
}
