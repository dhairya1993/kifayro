'use client';

import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

export function ContactFormClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Deal Correction',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    setTimeout(() => {
      // Simulate successful zero-cost submission
      setStatus('success');
    }, 600);
  };

  if (status === 'success') {
    return (
      <div className="p-8 bg-teal-50 border border-teal-200 rounded-2xl text-center space-y-3 animate-in fade-in">
        <CheckCircle2 className="w-10 h-10 text-teal-600 mx-auto" />
        <h3 className="text-base font-bold text-slate-900">Message Received!</h3>
        <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
          Thank you for reaching out, <strong>{formData.name}</strong>. Our consumer research desk will review your inquiry within 24 to 48 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setFormData({ name: '', email: '', category: 'Deal Correction', message: '' });
            setStatus('idle');
          }}
          className="mt-2 text-xs font-bold text-teal-700 underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
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
        disabled={status === 'submitting'}
        className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold text-xs shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-teal-600/50"
      >
        <span>{status === 'submitting' ? 'Submitting...' : 'Send Inquiry'}</span>
        <Send className="w-3.5 h-3.5" />
      </button>

      <p className="text-[11px] text-slate-400 text-center">
        We respect your privacy and will never share your contact details.
      </p>
    </form>
  );
}
