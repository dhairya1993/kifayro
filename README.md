# Kifayro — Indian Affiliate Deals & Smart Shopping Discovery Platform

> **Discover Deals. Compare Prices. Save Smarter.**

Kifayro is a production-grade, high-performance Indian affiliate deals aggregator and price comparison platform built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 🌟 Key Features

1. **Zero Fabricated Discounts**: Every offer displays a verified timestamp, matched against true street prices rather than artificial festive MRP markups.
2. **SKU-Level Multi-Store Comparison**: Compares identical models across Amazon India, Flipkart, Croma, and Reliance Digital.
3. **Verified Indian Coupons**: Promo codes tested against merchant checkout workflows with clear minimum spend and expiry rules.
4. **Transparent Affiliate Architecture**: Secure `/go/[id]` redirection with strict server-side validation against open redirect vulnerabilities and clear statutory disclosures.
5. **SEO & Discoverability**: Automated dynamic `sitemap.xml`, `robots.txt`, canonical URLs, and schema.org JSON-LD structured data for WebSite, Products, and Articles.
6. **₹0-Cost Deployment**: Built to run entirely on Vercel's Hobby free tier with zero external paid database or API dependencies.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🗺️ Project Architecture & Routes

```text
src/
├── app/
│   ├── layout.tsx                     # Root layout with Header, Footer, and Announcement Bar
│   ├── page.tsx                       # Complete 15-section Homepage
│   ├── deals/                         # All deals with client filtering & sorting
│   ├── categories/                    # Category directory
│   ├── categories/[slug]/             # Category-specific deals & products
│   ├── coupons/                       # Working coupon codes & promo vouchers
│   ├── search/                        # Multi-facet live search interface
│   ├── product/[slug]/                # Product specs & multi-store comparison
│   ├── deal/[slug]/                   # Verified deal breakdown & discount analysis
│   ├── stores/                        # Supported retailer directory & network statuses
│   ├── stores/[slug]/                 # Individual store profile & offers
│   ├── compare/                       # Price comparison engine
│   ├── blog/                          # Shopping guides & consumer advice
│   ├── blog/[slug]/                   # Long-form research guides
│   ├── about/                         # Brand identity & mission
│   ├── how-it-works/                  # How verification & affiliate model works
│   ├── affiliate-disclosure/          # Full statutory affiliate disclosure
│   ├── editorial-policy/              # Independent product evaluation policy
│   ├── privacy-policy/                # DPDP Act compliant privacy policy
│   ├── terms/                         # Terms of use
│   ├── disclaimer/                    # Price & availability disclaimer
│   ├── contact/                       # Functional contact & deal correction form
│   ├── go/[id]/                       # Secure outbound affiliate bridge
│   ├── not-found.tsx                  # Accessible 404 handler
│   ├── robots.ts                      # Dynamic robots.txt
│   └── sitemap.ts                     # Dynamic XML sitemap
├── components/
│   ├── layout/                        # Header, Footer, AnnouncementBar
│   ├── ui/                            # Logo, DemoBanner, Breadcrumbs, AffiliateNotice
│   ├── deals/                         # DealCard
│   ├── products/                      # ProductCard
│   ├── coupons/                       # CouponCard
│   ├── compare/                       # PriceComparisonTable
│   ├── search/                        # SearchBar
│   └── newsletter/                    # NewsletterSection
├── data/                              # Strongly typed initial datasets
├── lib/                               # Data adapters & formatting utilities
└── types/                             # TypeScript data models
```

---

## ☁️ Deployment Guide (Vercel)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "feat: complete Kifayro Indian affiliate deals platform"
git branch -M main
git remote add origin https://github.com/<your-username>/kifayro.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and log in with GitHub.
2. Click **Add New Project** and import the `kifayro` repository.
3. Keep Framework Preset as **Next.js**.
4. Set Environment Variable:
   - `NEXT_PUBLIC_SITE_URL`: `https://<your-project>.vercel.app`
5. Click **Deploy**.

---

## 🌐 Connecting Custom Domain (kifayro.com) Later

When ready to connect `kifayro.com`:
1. In the Vercel Dashboard, navigate to **Project Settings > Domains**.
2. Add `kifayro.com` and `www.kifayro.com`.
3. In your DNS registrar (e.g., Cloudflare, GoDaddy, Namecheap), add the DNS records specified by Vercel:
   - **A Record**: `@` -> `76.76.21.21`
   - **CNAME**: `www` -> `cname.vercel-dns.com`
4. Update `NEXT_PUBLIC_SITE_URL` in Vercel Environment Variables to `https://kifayro.com`.
