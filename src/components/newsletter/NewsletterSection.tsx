'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    // Zero-cost client-side subscription simulation (stores in localStorage)
    try {
      const existing = JSON.parse(localStorage.getItem('kifayro_subscribers') || '[]');
      if (!existing.includes(email)) {
        existing.push(email);
        localStorage.setItem('kifayro_subscribers', JSON.stringify(existing));
      }
    } catch {
      // ignore storage error
    }
    setStatus('success');
  };

  return (
    <section className="bg-gradient-to-br from-teal-900 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl my-12">
      {/* Background visual accents */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
          <Mail className="w-3.5 h-3.5" />
          The Kifayro Smart Buyer Bulletin
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Save Smarter with Verified Weekend Drops
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
          Get our curated, spam-free weekly digest of genuine price drops, vetted coupon codes, and consumer buying guides directly in your inbox. No fake sale hype, guaranteed.
        </p>

        {status === 'success' ? (
          <div className="bg-teal-500/20 border border-teal-500/40 rounded-2xl p-6 text-center space-y-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-8 h-8 text-teal-400 mx-auto" />
            <h3 className="font-bold text-base text-white">You’re on the VIP list!</h3>
            <p className="text-xs text-teal-200 max-w-sm mx-auto">
              Thank you for subscribing. We’ll notify you when significant, independently verified price drops occur on top Indian stores.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-2 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email address..."
                aria-label="Email address for deals bulletin"
                required
                className="w-full bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 focus:border-teal-400 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/30 transition-all"
              />
              <button
                type="submit"
                className="shrink-0 bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-slate-950 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md hover:shadow-teal-500/20 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                Join Free
              </button>
            </div>
            {status === 'error' && (
              <p className="text-xs text-rose-300 text-left mt-2">
                Please enter a valid email address.
              </p>
            )}
            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>₹0 Cost • Zero Spam • Unsubscribe in one click anytime.</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
