import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { ShieldCheck } from 'lucide-react';

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-slate-900 text-slate-300 text-sm mt-auto border-t border-slate-800">
      {/* Top Value Statement */}
      <div className="border-b border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Zero Fabricated Discounts</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                We reject artificial festive markups and fake countdowns. Every discount is calculated against verified baseline prices.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Honest Price Comparison</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                We compare identical product SKUs across Indian retailers like Amazon, Flipkart, Croma, and Reliance Digital.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Transparent Affiliate Model</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                We earn referral fees on eligible purchases at no extra cost to you. Editorial recommendations remain 100% independent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <Logo variant="light" size="md" />
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              <strong className="text-slate-200">Kifayro</strong> is an Indian smart shopping discovery platform dedicated to uncovering genuine deals, comparing multi-store prices, and empowering shoppers with practical buying advice.
            </p>
            <p className="text-xs text-slate-500">
              Tagline: <span className="text-teal-400 font-medium">Discover Deals. Compare Prices. Save Smarter.</span>
            </p>
            <div className="pt-2 text-[11px] text-slate-400">
              Tailored for Indian shoppers • Currency: INR (₹)
            </div>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Top Categories</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/categories/mobiles" className="hover:text-teal-400 transition-colors">Mobiles & Tablets</Link></li>
              <li><Link href="/categories/electronics" className="hover:text-teal-400 transition-colors">Audio & Electronics</Link></li>
              <li><Link href="/categories/computers" className="hover:text-teal-400 transition-colors">Laptops & PCs</Link></li>
              <li><Link href="/categories/appliances" className="hover:text-teal-400 transition-colors">Home Appliances</Link></li>
              <li><Link href="/categories/home-kitchen" className="hover:text-teal-400 transition-colors">Home & Kitchen</Link></li>
              <li><Link href="/categories/fashion" className="hover:text-teal-400 transition-colors">Fashion & Footwear</Link></li>
              <li><Link href="/categories" className="text-teal-400 font-semibold hover:underline">All Categories →</Link></li>
            </ul>
          </div>

          {/* Supported Stores */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Supported Stores</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/stores/amazon-in" className="hover:text-teal-400 transition-colors">Amazon India</Link></li>
              <li><Link href="/stores/flipkart" className="hover:text-teal-400 transition-colors">Flipkart</Link></li>
              <li><Link href="/stores/croma" className="hover:text-teal-400 transition-colors">Croma</Link></li>
              <li><Link href="/stores/reliance-digital" className="hover:text-teal-400 transition-colors">Reliance Digital</Link></li>
              <li><Link href="/stores/myntra" className="hover:text-teal-400 transition-colors">Myntra</Link></li>
              <li><Link href="/stores/tata-cliq" className="hover:text-teal-400 transition-colors">Tata CLiQ</Link></li>
              <li><Link href="/stores" className="text-teal-400 font-semibold hover:underline">All Stores →</Link></li>
            </ul>
          </div>

          {/* Company & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Trust & Legal</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/about" className="hover:text-teal-400 transition-colors">About Us</Link></li>
              <li><Link href="/how-it-works" className="hover:text-teal-400 transition-colors">How It Works</Link></li>
              <li><Link href="/affiliate-disclosure" className="hover:text-teal-400 transition-colors text-amber-300 font-medium">Affiliate Disclosure</Link></li>
              <li><Link href="/editorial-policy" className="hover:text-teal-400 transition-colors">Editorial Policy</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-teal-400 transition-colors">Terms of Use</Link></li>
              <li><Link href="/disclaimer" className="hover:text-teal-400 transition-colors">Disclaimer</Link></li>
              <li><Link href="/contact" className="hover:text-teal-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        {/* Detailed Affiliate Disclaimer text */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-xs text-slate-400 space-y-2 leading-relaxed">
          <p>
            <strong className="text-slate-300">Statutory Affiliate Notice:</strong> Kifayro participates in various affiliate marketing programs, including the Amazon Associates India Program and other verified merchant networks. As an affiliate, we may earn advertising fees and qualifying commissions by linking to official partner websites at absolutely no additional cost to you. Product prices and availability are accurate as of the last verification date/time indicated and are subject to continuous change on merchant platforms.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} Kifayro. All rights reserved. Made for Indian shoppers.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-slate-300">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300">Terms</Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-slate-300">Disclaimer</Link>
            <span>•</span>
            <Link href="/affiliate-disclosure" className="hover:text-slate-300">Disclosure</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
