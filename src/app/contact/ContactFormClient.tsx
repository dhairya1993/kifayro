'use client';

import React, { useState } from 'react';
import { AlertCircle, Send, ExternalLink } from 'lucide-react';

export function ContactFormClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Deal Correction',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'notice'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Do not simulate false success when backend is not configured
    setStatus('notice');
  };

  return (
    <div className="space-y-4">
      {/* Honest Preview Notice Banner */}
      <div className="p-3 bg-amber-50 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Preview Deployment Notice: </span>
          Online message dispatch via this form is temporarily disabled pending connection to a production email gateway. To submit corrections or inquiries, please use our public GitHub repository tracker.
        </div>
      </div>

      {status === 'notice' && (
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 animate-in fade-in">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <span>Submission Gateway Not Connected</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Thank you, <strong>{formData.name || 'Visitor'}</strong>. Your message was not sent because an external SMTP/email delivery service (e.g. Resend, SendGrid) is not yet provisioned for this deployment.
          </p>
          <div className="pt-1">
            <a
              href="https://github.com/dhairya1993/kifayro/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
            >
              <span>Submit on GitHub Issues</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Your Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Rahul Sharma"
            className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-teal-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Your Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="e.g. rahul@example.com"
            className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-teal-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Inquiry Type
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-teal-500 transition-colors"
          >
            <option value="Deal Correction">Report Outdated Price or Expired Deal</option>
            <option value="Product Request">Request Product Price Comparison</option>
            <option value="Merchant Partnership">Merchant / Affiliate Collaboration</option>
            <option value="Feedback">General Suggestion or Feedback</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Message / Details <span className="text-rose-500">*</span>
          </label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Please include product names or merchant URLs if reporting a price discrepancy..."
            className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-teal-500 transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-900 active:bg-slate-950 text-white font-bold text-xs shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-slate-700/50"
        >
          <span>Send Message (Preview Notice)</span>
          <Send className="w-3.5 h-3.5" />
        </button>

        <p className="text-[11px] text-slate-400 text-center">
          Inquiries are handled in accordance with our transparent privacy and communication policies.
        </p>
      </form>
    </div>
  );
}
