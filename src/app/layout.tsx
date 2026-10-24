import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kifayro.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Kifayro — Discover Deals. Compare Prices. Save Smarter.',
    template: '%s | Kifayro',
  },
  description:
    'India’s smart deals discovery & price comparison platform. Find verified offers, genuine coupon codes, and multi-store price checks across Amazon India, Flipkart, Croma, and Reliance Digital.',
  keywords: [
    'Indian deals',
    'affiliate deals India',
    'price comparison India',
    'Amazon India discounts',
    'Flipkart offers',
    'verified coupons',
    'online shopping India',
    'Kifayro',
  ],
  authors: [{ name: 'Kifayro Editorial Team' }],
  creator: 'Kifayro',
  publisher: 'Kifayro',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Kifayro',
    title: 'Kifayro — Discover Deals. Compare Prices. Save Smarter.',
    description:
      'Transparent deals aggregator and price comparison for Indian online shoppers with zero fake countdowns and genuine price verification.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kifayro — Smart Shopping Discovery India',
    description: 'Find better deals, compare prices across Indian stores, and save smarter.',
  },
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50/60 text-slate-900 selection:bg-teal-500 selection:text-white">
        <AnnouncementBar />
        <Suspense fallback={<div className="h-16 bg-white border-b border-slate-200" />}>
          <Header />
        </Suspense>
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
