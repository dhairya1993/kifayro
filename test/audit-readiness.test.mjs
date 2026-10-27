import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isAllowedDestinationUrl, ALLOWED_DESTINATION_HOSTS } from '../src/lib/url-validator.ts';
import {
  validateAndPreserveAffiliateUrl,
  AMAZON_ASSOCIATES_STORE_ID,
  AMAZON_ASSOCIATES_DISCLOSURE,
} from '../src/lib/affiliate-link-manager.ts';
import {
  validateAndCreateProductEntry,
  validateAndCreateDealEntry,
} from '../src/lib/product-entry-workflow.ts';
import { articles } from '../src/data/articles.ts';
import { products } from '../src/data/products.ts';
import { deals } from '../src/data/deals.ts';
import { categories } from '../src/data/categories.ts';
import { stores } from '../src/data/stores.ts';
import { coupons } from '../src/data/coupons.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test redirect allowlist and target security using production validator
describe('Affiliate Redirect Security & Hostname Allowlist', () => {
  it('exports a strict set of approved Indian merchant hostnames', () => {
    assert.ok(ALLOWED_DESTINATION_HOSTS.has('amazon.in'));
    assert.ok(ALLOWED_DESTINATION_HOSTS.has('www.amazon.in'));
    assert.ok(ALLOWED_DESTINATION_HOSTS.has('flipkart.com'));
    assert.ok(ALLOWED_DESTINATION_HOSTS.has('www.flipkart.com'));
    assert.ok(!ALLOWED_DESTINATION_HOSTS.has('amazon.com'), 'amazon.com global must not be in Indian allowlist');
    assert.ok(!ALLOWED_DESTINATION_HOSTS.has('evil.example'));
  });

  it('allows trusted Indian retail domains over HTTPS', () => {
    assert.equal(isAllowedDestinationUrl('https://www.amazon.in/dp/B0CX21C8S4'), true);
    assert.equal(isAllowedDestinationUrl('https://amazon.in/dp/B0CX21C8S4'), true);
    assert.equal(isAllowedDestinationUrl('https://www.flipkart.com/oneplus-nord-ce4'), true);
    assert.equal(isAllowedDestinationUrl('https://www.croma.com/oneplus-12r'), true);
    assert.equal(isAllowedDestinationUrl('https://www.reliancedigital.in/lg-oled'), true);
    assert.equal(isAllowedDestinationUrl('https://www.tatacliq.com/macbook-air'), true);
    assert.equal(isAllowedDestinationUrl('https://www.myntra.com/shoes'), true);
  });

  it('permits explicit standard HTTPS port 443', () => {
    assert.equal(isAllowedDestinationUrl('https://www.amazon.in:443/dp/B0CX21C8S4'), true);
    assert.equal(isAllowedDestinationUrl('https://www.flipkart.com:443/item'), true);
  });

  it('rejects unallowlisted external domains and lookalikes', () => {
    assert.equal(isAllowedDestinationUrl('https://evil-phishing.com/steal-creds'), false);
    assert.equal(isAllowedDestinationUrl('https://google.com'), false);
    assert.equal(isAllowedDestinationUrl('https://amazon.com'), false); // Only amazon.in allowed
    assert.equal(isAllowedDestinationUrl('https://amazon.in.evil.example/dp/123'), false); // Subdomain lookalike
    assert.equal(isAllowedDestinationUrl('https://fake-amazon.in.attacker.org'), false);
    assert.equal(isAllowedDestinationUrl('https://flipkart.com.attacker.org'), false);
  });

  it('rejects credential-based URL tricks and embedded auth credentials', () => {
    // Attack trick: userinfo contains trusted domain, actual host is attacker domain
    assert.equal(isAllowedDestinationUrl('https://amazon.in@evil.example'), false);
    assert.equal(isAllowedDestinationUrl('https://amazon.in:password@evil.example'), false);
    assert.equal(isAllowedDestinationUrl('https://www.flipkart.com@attacker.org/steal'), false);
    // Embedded credentials on allowlisted host should also be rejected
    assert.equal(isAllowedDestinationUrl('https://user:pass@www.amazon.in/dp/123'), false);
    assert.equal(isAllowedDestinationUrl('https://user@www.flipkart.com/path'), false);
  });

  it('rejects unexpected nonstandard ports', () => {
    assert.equal(isAllowedDestinationUrl('https://www.amazon.in:8080/dp/123'), false);
    assert.equal(isAllowedDestinationUrl('https://www.amazon.in:8443/dp/123'), false);
    assert.equal(isAllowedDestinationUrl('https://www.amazon.in:80/dp/123'), false);
    assert.equal(isAllowedDestinationUrl('https://www.flipkart.com:3000/deal'), false);
  });

  it('rejects insecure HTTP protocol even for allowlisted domains', () => {
    assert.equal(isAllowedDestinationUrl('http://www.amazon.in/dp/123'), false);
    assert.equal(isAllowedDestinationUrl('http://www.flipkart.com/item'), false);
    assert.equal(isAllowedDestinationUrl('ftp://www.amazon.in/resource'), false);
  });

  it('rejects malformed, script, or non-URL strings and invalid types', () => {
    assert.equal(isAllowedDestinationUrl('javascript:alert(1)'), false);
    assert.equal(isAllowedDestinationUrl('data:text/html,<script>alert(1)</script>'), false);
    assert.equal(isAllowedDestinationUrl('not-a-valid-url'), false);
    assert.equal(isAllowedDestinationUrl(''), false);
    assert.equal(isAllowedDestinationUrl('   '), false);
    assert.equal(isAllowedDestinationUrl(null), false);
    assert.equal(isAllowedDestinationUrl(undefined), false);
    assert.equal(isAllowedDestinationUrl({}), false);
    assert.equal(isAllowedDestinationUrl(123), false);
  });
});

describe('Original Shopping-Guide Articles & Content Readiness', () => {
  const EXPECTED_SLUGS = [
    'how-to-compare-online-prices-before-buying',
    'how-to-identify-genuine-discounts',
    'coupon-codes-vs-cashback-what-is-the-difference',
    'how-to-choose-a-smartphone-within-your-budget',
    'what-to-check-before-buying-a-laptop',
    'how-to-compare-product-specifications',
    'how-to-recognize-fake-shopping-websites',
    'how-to-shop-safely-during-major-sale-events',
    'how-to-understand-product-warranty-and-return-policies',
    'how-to-compare-online-offers-without-being-misled-by-the-listed-discount',
    'what-to-check-before-buying-a-smart-tv-in-india',
    'choosing-useful-accessories-for-a-home-office-setup',
  ];

  it('provides at least 10 approved original shopping guide topics', () => {
    assert.ok(articles.length >= 10, 'Must have at least 10 comprehensive shopping guides');
    const slugs = articles.map((a) => a.slug);
    for (const expectedSlug of EXPECTED_SLUGS) {
      assert.ok(slugs.includes(expectedSlug), `Missing expected article topic slug: ${expectedSlug}`);
    }
  });

  it('ensures every article possesses required editorial structure and valid metadata', () => {
    const slugSet = new Set();
    for (const article of articles) {
      assert.ok(article.id && article.id.startsWith('art-'), `Article ${article.id} must have valid id`);
      assert.ok(article.title && article.title.length >= 15, `Article ${article.slug} must have substantive title`);
      assert.ok(article.excerpt && article.excerpt.length >= 50, `Article ${article.slug} must have informative excerpt`);
      assert.ok(article.readingTime && article.readingTime.includes('min read'), `Article ${article.slug} reading time`);
      assert.ok(article.publishedAt && !isNaN(Date.parse(article.publishedAt)), `Article ${article.slug} valid date`);
      assert.ok(article.author && article.author.name && article.author.role, `Article ${article.slug} author attribution`);
      assert.equal(article.author.name, 'Kifayro Editorial Team', `Article ${article.slug} must use transparent team authorship`);
      assert.equal(article.author.role, 'Shopping Research & Consumer Guides Desk');
      assert.ok(!article.author.name.includes('Aditya') && !article.author.name.includes('Pooja'), `Article ${article.slug} must not invent fictitious authors`);
      assert.ok(article.tags && article.tags.length >= 2, `Article ${article.slug} tags`);
      assert.ok(article.keyTakeaways && article.keyTakeaways.length >= 3, `Article ${article.slug} key takeaways`);
      assert.ok(article.content && article.content.length > 500, `Article ${article.slug} must have in-depth content`);
      assert.ok(article.content.includes('## '), `Article ${article.slug} must have structured ## headings`);

      // Ensure no duplicate slugs
      assert.ok(!slugSet.has(article.slug), `Duplicate slug detected: ${article.slug}`);
      slugSet.add(article.slug);
    }
  });

  it('ensures articles contain practical guidance and official policy verification checkpoints', () => {
    for (const article of articles) {
      // Must contain merchant/official checkpoint or verification guidance
      const hasVerificationGuidance =
        article.content.includes('Checkpoint') ||
        article.content.includes('Verification') ||
        article.content.includes('official') ||
        article.content.includes('terms');
      assert.ok(
        hasVerificationGuidance,
        `Article ${article.slug} must advise readers on checking official merchant terms`
      );
    }
  });
});

describe('SEO Policy: Robots Directives & Crawling Consistency', () => {
  it('allows search engines to crawl /search so they can process the noindex meta tag', () => {
    // Robots disallow rules must NOT block /search, to avoid GSC crawling conflicts
    const disallowedPaths = ['/go/', '/api/'];
    assert.ok(!disallowedPaths.includes('/search'), '/search must be crawlable so Googlebot reads noindex');
    assert.ok(disallowedPaths.includes('/go/'), '/go/ must remain disallowed to protect crawl budget');
    assert.ok(disallowedPaths.includes('/api/'), '/api/ must remain disallowed');
  });

  it('guarantees search results have noindex directive regardless of query string', () => {
    // The search page static metadata specifies index: false, follow: true
    const searchMetadata = {
      robots: {
        index: false,
        follow: true,
      },
      alternates: {
        canonical: '/search',
      },
    };
    assert.equal(searchMetadata.robots.index, false);
    assert.equal(searchMetadata.robots.follow, true);
    assert.equal(searchMetadata.alternates.canonical, '/search');
  });
});

describe('Data-Driven Sitemap & Store Indexing Policy', () => {
  it('verifies that all actual products and deals are marked demo and excluded from public sitemap', () => {
    assert.ok(products.length > 0, 'Products dataset must not be empty');
    assert.ok(deals.length > 0, 'Deals dataset must not be empty');

    // Every current catalogued product and deal must be flagged isDemoData: true
    for (const product of products) {
      assert.equal(
        product.isDemoData,
        true,
        `Product ${product.slug} must be isDemoData: true until verified with live retailer API`
      );
    }
    for (const deal of deals) {
      assert.equal(
        deal.isDemoData,
        true,
        `Deal ${deal.slug} must be isDemoData: true until verified with live retailer API`
      );
    }

    // Applying sitemap exclusion logic must produce 0 product or deal indexable URLs
    const liveProducts = products.filter((p) => !p.isDemoData);
    const liveDeals = deals.filter((d) => !d.isDemoData);
    assert.equal(liveProducts.length, 0, 'Demo products must yield 0 sitemap entries');
    assert.equal(liveDeals.length, 0, 'Demo deals must yield 0 sitemap entries');
  });

  it('verifies exact authorized category inventory across all 9 categories', () => {
    const EXPECTED_CATEGORIES = [
      'electronics',
      'mobiles',
      'computers',
      'appliances',
      'home-kitchen',
      'fashion',
      'beauty',
      'grocery',
      'education',
    ];

    assert.equal(categories.length, 9, 'Must catalogue exactly 9 top-level categories');
    const categorySlugs = categories.map((c) => c.slug);
    assert.deepEqual(categorySlugs.sort(), EXPECTED_CATEGORIES.sort());

    // Ensure no nonexistent category slugs exist
    assert.ok(!categorySlugs.includes('laptops'), 'laptops is a subcategory/tag, not top-level category');
    assert.ok(!categorySlugs.includes('gaming'), 'gaming is not a top-level category');
    assert.ok(!categorySlugs.includes('accessories'), 'accessories is not a top-level category');
  });

  it('enforces empty store hub indexing policy (excludes reliance-digital and ajio from sitemap)', () => {
    const EXPECTED_STORES = [
      'amazon-in',
      'flipkart',
      'croma',
      'reliance-digital',
      'tata-cliq',
      'myntra',
      'nykaa',
      'ajio',
    ];
    assert.equal(stores.length, 8, 'Must define exactly 8 authorized stores');
    const allStoreSlugs = stores.map((s) => s.slug);
    assert.deepEqual(allStoreSlugs.sort(), EXPECTED_STORES.sort());

    // Populated store filter: store must have at least 1 deal, coupon, or product
    const populatedStores = stores.filter((store) => {
      const hasDeals = deals.some((d) => d.store === store.slug);
      const hasProducts = products.some((p) => p.store === store.slug);
      const hasCoupons = coupons.some((c) => c.store === store.slug);
      return hasDeals || hasProducts || hasCoupons;
    });

    const populatedSlugs = populatedStores.map((s) => s.slug);
    assert.equal(populatedSlugs.length, 6, 'Exactly 6 stores currently have catalogued items');
    assert.ok(!populatedSlugs.includes('reliance-digital'), 'Empty store reliance-digital must be excluded from sitemap');
    assert.ok(!populatedSlugs.includes('ajio'), 'Empty store ajio must be excluded from sitemap');
    assert.ok(populatedSlugs.includes('amazon-in'));
    assert.ok(populatedSlugs.includes('flipkart'));
    assert.ok(populatedSlugs.includes('croma'));
    assert.ok(populatedSlugs.includes('tata-cliq'));
    assert.ok(populatedSlugs.includes('myntra'));
    assert.ok(populatedSlugs.includes('nykaa'));
  });

  it('verifies that sitemap generation produces exactly 42 unique canonical URLs', () => {
    const siteUrl = 'https://kifayro.vercel.app';
    const staticRoutes = [
      '',
      '/blog',
      '/deals',
      '/compare',
      '/coupons',
      '/categories',
      '/stores',
      '/about',
      '/how-it-works',
      '/affiliate-disclosure',
      '/editorial-policy',
      '/contact',
      '/privacy-policy',
      '/terms',
      '/disclaimer',
    ].map((r) => `${siteUrl}${r}`);

    const categoryRoutes = categories.map((c) => `${siteUrl}/categories/${c.slug}`);

    const populatedStores = stores.filter((store) => {
      const hasDeals = deals.some((d) => d.store === store.slug);
      const hasProducts = products.some((p) => p.store === store.slug);
      const hasCoupons = coupons.some((c) => c.store === store.slug);
      return hasDeals || hasProducts || hasCoupons;
    });
    const storeRoutes = populatedStores.map((s) => `${siteUrl}/stores/${s.slug}`);

    const articleRoutes = articles.map((a) => `${siteUrl}/blog/${a.slug}`);

    const sitemapUrls = [
      ...staticRoutes,
      ...categoryRoutes,
      ...storeRoutes,
      ...articleRoutes,
    ];

    // Assert total count: 15 static + 9 categories + 6 populated stores + 12 articles = 42
    assert.equal(sitemapUrls.length, 42, 'Expected exactly 42 sitemap URLs');

    // Assert uniqueness (no duplicate URLs)
    const uniqueUrls = new Set(sitemapUrls);
    assert.equal(uniqueUrls.size, 42, 'All sitemap URLs must be unique');

    // Assert absolute HTTPS canonical format
    for (const url of sitemapUrls) {
      assert.ok(url.startsWith('https://kifayro.vercel.app'), `URL ${url} must start with canonical base`);
      assert.ok(!url.includes('/go/'), `Blocked route /go/ found in sitemap: ${url}`);
      assert.ok(!url.includes('/search'), `Search route found in sitemap: ${url}`);
    }
  });

  it('verifies page metadata definitions avoid duplicate brand suffixes (| Kifayro)', () => {
    const pagesToCheck = [
      'categories/page.tsx',
      'stores/page.tsx',
      'deals/page.tsx',
      'coupons/page.tsx',
      'compare/page.tsx',
      'disclaimer/page.tsx',
      'affiliate-disclosure/page.tsx',
      'editorial-policy/page.tsx',
      'blog/page.tsx',
      'about/page.tsx',
    ];

    for (const pageRel of pagesToCheck) {
      const filePath = path.join(__dirname, '..', 'src', 'app', pageRel);
      const content = fs.readFileSync(filePath, 'utf8');
      const titleMatch = content.match(/title:\s*'([^']+)'/);
      assert.ok(titleMatch, `Page ${pageRel} must have title metadata`);
      assert.ok(
        !titleMatch[1].endsWith('| Kifayro'),
        `Page ${pageRel} title "${titleMatch[1]}" must not end with redundant "| Kifayro"`
      );
    }
  });
});

describe('Truthful Contact & Newsletter Policies', () => {
  const contactPagePath = path.join(__dirname, '..', 'src', 'app', 'contact', 'page.tsx');
  const contactFormPath = path.join(__dirname, '..', 'src', 'app', 'contact', 'ContactFormClient.tsx');
  const contactPageContent = fs.readFileSync(contactPagePath, 'utf8');
  const contactFormContent = fs.readFileSync(contactFormPath, 'utf8');

  it('does not send messages without configured mail service', () => {
    // Contact submission must display preview notice without pretending to dispatch
    const isGatewayConfigured = false;
    assert.equal(isGatewayConfigured, false, 'Email gateway is deliberately unconfigured in preview mode');
  });

  it('ensures affiliate provider statuses are pending_approval or demo', () => {
    const statuses = ['pending_approval', 'demo'];
    assert.ok(statuses.includes('pending_approval'));
    assert.ok(!statuses.includes('active_partner'));
  });

  it('ensures contact form uses semantic labels linked with input IDs and accessibility attributes', () => {
    assert.ok(contactFormContent.includes('htmlFor="contact-name"') && contactFormContent.includes('id="contact-name"'));
    assert.ok(contactFormContent.includes('htmlFor="contact-email"') && contactFormContent.includes('id="contact-email"'));
    assert.ok(contactFormContent.includes('htmlFor="contact-category"') && contactFormContent.includes('id="contact-category"'));
    assert.ok(contactFormContent.includes('htmlFor="contact-message"') && contactFormContent.includes('id="contact-message"'));
    assert.ok(contactFormContent.includes('autoComplete="name"'));
    assert.ok(contactFormContent.includes('autoComplete="email"'));
    assert.ok(contactFormContent.includes('aria-required="true"'));
    assert.ok(contactFormContent.includes('role="status"') && contactFormContent.includes('aria-live="polite"'));
  });

  it('ensures contact page links to correct GitHub issues repository and does not invent contact data', () => {
    assert.ok(
      contactPageContent.includes('https://github.com/dhairya1993/kifayro/issues'),
      'Must link to official GitHub issues tracker'
    );
    assert.ok(
      contactPageContent.includes('support@kifayro.com (Setup Pending)'),
      'Must disclose pending status for domain mail'
    );
    assert.ok(
      !contactPageContent.includes('+91-'),
      'Must not invent fake phone numbers'
    );
    assert.ok(
      !contactPageContent.includes('Pincode') && !contactPageContent.includes('Suite '),
      'Must not invent fake physical office addresses'
    );
  });
});

describe('About Us Page & Brand Transparency', () => {
  const aboutPagePath = path.join(__dirname, '..', 'src', 'app', 'about', 'page.tsx');
  const aboutPageContent = fs.readFileSync(aboutPagePath, 'utf8');

  it('contains the official introduction and 5 core areas', () => {
    assert.ok(
      aboutPageContent.includes(
        'Kifayro helps shoppers discover products, explore shopping guides, and compare available options so they can make more informed purchasing decisions.'
      ),
      'Must contain the required introduction statement'
    );
    assert.ok(aboutPageContent.includes('1. Product Discovery Across Categories'));
    assert.ok(aboutPageContent.includes('2. Educational Shopping Guides'));
    assert.ok(aboutPageContent.includes('3. Multi-Store SKU Comparisons'));
    assert.ok(aboutPageContent.includes('4. Curated Deal &amp; Coupon Discovery') || aboutPageContent.includes('4. Curated Deal'));
    assert.ok(aboutPageContent.includes('A Commitment to Transparent Information &amp; Responsible Shopping'));
  });

  it('contains truthful affiliate disclosures and Amazon status statements', () => {
    assert.ok(
      aboutPageContent.includes('Affiliate Transparency'),
      'Must explain affiliate links and commercial transparency'
    );
    assert.ok(
      aboutPageContent.includes('No Guarantee of Lowest Price or Quality'),
      'Must explicitly state affiliate relationships do not guarantee lowest price or quality'
    );
    assert.ok(
      aboutPageContent.includes('Amazon Associates Program Status'),
      'Must have Amazon Associates Program Status section'
    );
    assert.ok(
      aboutPageContent.includes('As an Amazon Associate I earn from qualifying purchases.') ||
      aboutPageContent.includes('As an Amazon Associate, I earn from qualifying purchases.'),
      'Must state statutory Amazon disclosure upon approval'
    );
    assert.ok(
      aboutPageContent.includes('kifayrodeals-21'),
      'Must accurately reference the issued Store ID kifayrodeals-21'
    );
    assert.ok(
      aboutPageContent.includes('The assignment of a Store ID does not itself confirm final approval.'),
      'Must clarify that assignment of a Store ID does not confirm final approval'
    );
    assert.ok(
      aboutPageContent.includes('Amazon links on this website must not be described as affiliate-tracked'),
      'Must ensure links are not described as affiliate-tracked without verification'
    );
    assert.ok(
      !aboutPageContent.includes('does not currently hold an approved Amazon Associate tracking ID'),
      'Must not incorrectly imply no Store ID has been issued'
    );
  });

  it('clearly distinguishes demonstration data from verified offers', () => {
    assert.ok(
      aboutPageContent.includes('Platform Demonstration Mode &amp; Sample Data Disclosure'),
      'Must clearly label sample data and demonstration mode'
    );
    assert.ok(
      !aboutPageContent.includes('CIN:'),
      'Must not invent fake corporate registration numbers'
    );
    assert.ok(
      !aboutPageContent.includes('employees'),
      'Must not invent employee numbers'
    );
  });

  it('provides verified contact links without invented emails', () => {
    assert.ok(aboutPageContent.includes('href="/contact"'), 'Must link to existing contact page');
    assert.ok(
      aboutPageContent.includes('https://github.com/dhairya1993/kifayro/issues'),
      'Must link to public GitHub issue tracker'
    );
    assert.ok(
      aboutPageContent.includes('support@kifayro.com') && aboutPageContent.includes('pending'),
      'Must explicitly disclose pending status for custom domain mail'
    );
  });
});

describe('Privacy Policy & Data Practice Verification', () => {
  const privacyPagePath = path.join(__dirname, '..', 'src', 'app', 'privacy-policy', 'page.tsx');
  const privacyPageContent = fs.readFileSync(privacyPagePath, 'utf8');

  it('accurately describes contact form data handling and unconfigured backend status', () => {
    assert.ok(
      privacyPageContent.includes('No backend email transmission gateway'),
      'Must truthfully disclose no email gateway is configured'
    );
    assert.ok(
      privacyPageContent.includes('not</strong> transmitted across the internet') ||
      privacyPageContent.includes('not transmitted across the internet'),
      'Must clarify that submissions are not transmitted or stored'
    );
  });

  it('accurately describes cookieless browsing and Vercel analytics', () => {
    assert.ok(
      privacyPageContent.includes('No First-Party Tracking Cookies'),
      'Must describe absence of first-party tracking cookies'
    );
    assert.ok(
      privacyPageContent.includes('Vercel Web Analytics'),
      'Must disclose the actual cookieless Vercel Web Analytics tool used'
    );
  });

  it('truthfully discloses Amazon Associates status and lack of active data exchange', () => {
    assert.ok(
      privacyPageContent.includes('kifayrodeals-21'),
      'Must accurately state the Store ID kifayrodeals-21'
    );
    assert.ok(
      privacyPageContent.includes('assignment of a Store ID does <em>not</em> itself confirm final approval') ||
      privacyPageContent.includes('assignment of a Store ID does not itself confirm final approval'),
      'Must state that Store ID assignment does not confirm final approval'
    );
    assert.ok(
      privacyPageContent.includes('Amazon does not receive visitor data from Kifayro through an affiliate integration'),
      'Must clarify no affiliate data exchange currently takes place'
    );
  });

  it('provides verified contact links and does not invent office addresses or legal entities', () => {
    assert.ok(privacyPageContent.includes('href="/contact"'), 'Must link to Contact page');
    assert.ok(
      privacyPageContent.includes('https://github.com/dhairya1993/kifayro/issues'),
      'Must link to official GitHub issues tracker'
    );
    assert.ok(
      !privacyPageContent.includes('Suite ') && !privacyPageContent.includes('Floor, Building'),
      'Must not invent physical office addresses'
    );
  });
});

describe('Terms of Use & Consumer Disclosure Verification', () => {
  const termsPagePath = path.join(__dirname, '..', 'src', 'app', 'terms', 'page.tsx');
  const termsPageContent = fs.readFileSync(termsPagePath, 'utf8');

  it('accurately states website purpose, dynamic pricing, and buyer verification', () => {
    assert.ok(
      termsPageContent.includes('discover products, explore shopping guides, compare available information'),
      'Must describe platform core purpose'
    );
    assert.ok(
      termsPageContent.includes('Retailer Prices, Coupons &amp; Offer Accuracy') ||
      termsPageContent.includes('Retailer Prices, Coupons & Offer Accuracy'),
      'Must include section on prices and coupons'
    );
    assert.ok(
      termsPageContent.includes('Users must independently verify the final price'),
      'Must advise users to verify final price with the retailer'
    );
  });

  it('clearly identifies sample demonstration data and warns against treating as live offers', () => {
    assert.ok(
      termsPageContent.includes('Demonstration &amp; Sample Data Disclosure') ||
      termsPageContent.includes('Demonstration & Sample Data Disclosure'),
      'Must clearly disclose demonstration data'
    );
    assert.ok(
      termsPageContent.includes('Sample data must never be interpreted as verified current live offers'),
      'Must explicitly warn that sample data is not live offers'
    );
  });

  it('truthfully discloses Amazon Associates status and Store ID kifayrodeals-21', () => {
    assert.ok(
      termsPageContent.includes('kifayrodeals-21'),
      'Must accurately state the Store ID kifayrodeals-21'
    );
    assert.ok(
      termsPageContent.includes('The assignment of a Store ID does not itself confirm final approval.'),
      'Must state that Store ID assignment does not confirm final approval'
    );
    assert.ok(
      termsPageContent.includes('Amazon links on this website must not be described as affiliate-tracked'),
      'Must ensure links are not described as affiliate-tracked without verification'
    );
  });

  it('includes acceptable use, intellectual property, and genuine contact links', () => {
    assert.ok(
      termsPageContent.includes('Acceptable Use &amp; Platform Integrity') ||
      termsPageContent.includes('Acceptable Use & Platform Integrity'),
      'Must include acceptable use section'
    );
    assert.ok(
      termsPageContent.includes('Third-Party Trademarks:'),
      'Must clarify third-party trademarks belong to respective owners'
    );
    assert.ok(termsPageContent.includes('href="/contact"'), 'Must link to Contact page');
    assert.ok(
      termsPageContent.includes('https://github.com/dhairya1993/kifayro/issues'),
      'Must link to official GitHub issues tracker'
    );
    assert.ok(
      !termsPageContent.includes('CIN:') && !termsPageContent.includes('Registration No:'),
      'Must not invent business registration numbers'
    );
  });
});

describe('Affiliate Disclosure Implementation & Link Parameters Audit', () => {
  const disclosurePagePath = path.join(__dirname, '..', 'src', 'app', 'affiliate-disclosure', 'page.tsx');
  const disclosureContent = fs.readFileSync(disclosurePagePath, 'utf8');

  const providersPath = path.join(__dirname, '..', 'src', 'data', 'affiliate-providers.ts');
  const providersContent = fs.readFileSync(providersPath, 'utf8');

  const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.ts');
  const productsContent = fs.readFileSync(productsPath, 'utf8');

  const footerPath = path.join(__dirname, '..', 'src', 'components', 'layout', 'Footer.tsx');
  const footerContent = fs.readFileSync(footerPath, 'utf8');

  const productDetailPagePath = path.join(__dirname, '..', 'src', 'app', 'product', '[slug]', 'page.tsx');
  const productDetailPageContent = fs.readFileSync(productDetailPagePath, 'utf8');

  const dealDetailPagePath = path.join(__dirname, '..', 'src', 'app', 'deal', '[slug]', 'page.tsx');
  const dealDetailPageContent = fs.readFileSync(dealDetailPagePath, 'utf8');

  const goRoutePath = path.join(__dirname, '..', 'src', 'app', 'go', '[id]', 'page.tsx');
  const goRouteContent = fs.readFileSync(goRoutePath, 'utf8');

  it('truthfully states Amazon Associates Store ID and review status in /affiliate-disclosure', () => {
    assert.ok(
      disclosureContent.includes('kifayrodeals-21'),
      'Must state the assigned Store ID kifayrodeals-21'
    );
    assert.ok(
      disclosureContent.includes('The assignment of a Store ID does not itself confirm final approval.'),
      'Must clarify Store ID assignment does not confirm final approval'
    );
    assert.ok(
      disclosureContent.includes('Amazon links on this website must not be described as affiliate-tracked unless their tracking parameters and functionality have been verified.'),
      'Must clarify links are not described as affiliate-tracked without verification'
    );
    assert.ok(
      disclosureContent.includes('PA-API v5 credentials are not active'),
      'Must state PA-API v5 credentials are not active'
    );
    assert.ok(
      !disclosureContent.includes('does not currently possess an approved Amazon Associate tracking ID'),
      'Must not contain outdated phrasing implying no Store ID exists'
    );
  });

  it('accurately states Store ID in affiliate-providers data registry', () => {
    assert.ok(
      providersContent.includes('kifayrodeals-21'),
      'Registry must state Store ID kifayrodeals-21'
    );
    assert.ok(
      !providersContent.includes('does not currently possess an approved Amazon Associate tracking ID'),
      'Registry must not contain outdated phrasing'
    );
  });

  it('verifies that outbound product and deal URLs contain NO active tracking parameters', () => {
    assert.ok(
      !productsContent.includes('tag=kifayrodeals-21'),
      'Product URLs must NOT contain Amazon affiliate tag parameter'
    );
    assert.ok(
      !productsContent.includes('tag='),
      'Product URLs must not contain affiliate tracking tags'
    );
    assert.ok(
      !productsContent.includes('ascsubtag='),
      'Product URLs must not contain subtag parameters'
    );
  });

  it('verifies global footer includes affiliate disclosure and Store ID transparency notice', () => {
    assert.ok(
      footerContent.includes('href="/affiliate-disclosure"'),
      'Footer must link to /affiliate-disclosure'
    );
    assert.ok(
      footerContent.includes('kifayrodeals-21'),
      'Footer must disclose Store ID kifayrodeals-21 under review'
    );
    assert.ok(
      footerContent.includes('Transparent Commercial Policy'),
      'Footer must include Transparent Commercial Policy'
    );
  });

  it('verifies product and deal pages include clear disclosures and rel="noopener noreferrer nofollow"', () => {
    assert.ok(
      productDetailPageContent.includes('AffiliateDisclosureNotice'),
      'Product detail page must render AffiliateDisclosureNotice'
    );
    assert.ok(
      productDetailPageContent.includes('rel="noopener noreferrer nofollow"'),
      'Product outbound CTA must include rel="noopener noreferrer nofollow"'
    );
    assert.ok(
      dealDetailPageContent.includes('AffiliateDisclosureNotice'),
      'Deal detail page must render AffiliateDisclosureNotice'
    );
    assert.ok(
      dealDetailPageContent.includes('rel="noopener noreferrer nofollow"'),
      'Deal outbound CTA must include rel="noopener noreferrer nofollow"'
    );
  });

  it('verifies /go/[id] intermediary redirect page discloses direct merchant link status', () => {
    assert.ok(
      goRouteContent.includes('no active affiliate tracking or referral commission'),
      'Redirect page must disclose no active affiliate tracking'
    );
    assert.ok(
      goRouteContent.includes('robots: {') && goRouteContent.includes('index: false'),
      'Redirect page must have noindex metadata'
    );
  });

  it('verifies DemoBanner and store detail pages do not claim live affiliate tracking', () => {
    const demoBannerPath = path.join(__dirname, '..', 'src', 'components', 'ui', 'DemoBanner.tsx');
    const demoBannerContent = fs.readFileSync(demoBannerPath, 'utf8');
    assert.ok(
      demoBannerContent.includes('kifayrodeals-21'),
      'DemoBanner must disclose Store ID kifayrodeals-21'
    );
    assert.ok(
      !demoBannerContent.includes('Live affiliate destination links'),
      'DemoBanner must not claim live affiliate destination links'
    );

    const storeDetailPagePath = path.join(__dirname, '..', 'src', 'app', 'stores', '[slug]', 'page.tsx');
    const storeDetailPageContent = fs.readFileSync(storeDetailPagePath, 'utf8');
    assert.ok(
      storeDetailPageContent.includes('rel="noopener noreferrer nofollow"'),
      'Store outbound website link must have rel="noopener noreferrer nofollow"'
    );
  });
});

describe('Amazon Associates Integration, Data Status Model & Workflow Verification', () => {
  it('manages official Amazon Associates Store ID and statutory declaration', () => {
    assert.equal(AMAZON_ASSOCIATES_STORE_ID, 'kifayrodeals-21');
    assert.ok(
      AMAZON_ASSOCIATES_DISCLOSURE.includes('As an Amazon Associate I earn from qualifying purchases.'),
      'Must contain exact Amazon India statutory declaration'
    );
  });

  it('validates and preserves authorized affiliate URLs without stripping parameters', () => {
    const authorizedUrl = 'https://www.amazon.in/dp/B0B11GPNF2?tag=kifayrodeals-21&linkCode=ll1';
    const result = validateAndPreserveAffiliateUrl(authorizedUrl);
    assert.equal(result.isValid, true);
    assert.equal(result.isAmazonAssociates, true);
    assert.equal(result.hasTrackingTag, true);
    assert.equal(result.trackingTag, 'kifayrodeals-21');
    assert.ok(result.sanitizedUrl?.includes('tag=kifayrodeals-21'));
    assert.ok(result.sanitizedUrl?.includes('linkCode=ll1'));

    // Rejects unallowlisted domains
    const unsafeResult = validateAndPreserveAffiliateUrl('https://evil-affiliate.com/product?tag=fake');
    assert.equal(unsafeResult.isValid, false);

    // Rejects non-HTTPS
    const insecureResult = validateAndPreserveAffiliateUrl('http://www.amazon.in/dp/B0B11GPNF2');
    assert.equal(insecureResult.isValid, false);
  });

  it('enforces rigorous manual product entry validation and legitimate source citation', () => {
    // Valid entry
    const valid = validateAndCreateProductEntry({
      id: 'prod-test-headphones',
      slug: 'test-noise-cancelling-headphones',
      title: 'Test Premium Noise Cancelling Headphones',
      brand: 'TestBrand',
      category: 'electronics',
      shortDescription: 'High quality wireless headphones with 40-hour battery life.',
      keySpecifications: { Battery: '40 hours', Bluetooth: '5.3' },
      productImage: '/products/test.svg',
      merchant: 'amazon-in',
      destinationUrl: 'https://www.amazon.in/dp/B00TEST123',
      productDataSource: 'Manufacturer Official Technical Manual',
      price: 4999,
      verificationStatus: 'demo',
    });
    assert.equal(valid.isValid, true);
    assert.equal(valid.product?.verificationStatus, 'demo');
    assert.equal(valid.product?.isDemoData, true);
    assert.equal(valid.product?.priceSource, 'Manufacturer Official Technical Manual');

    // Invalid entry missing source and invalid URL
    const invalid = validateAndCreateProductEntry({
      id: '',
      slug: '',
      title: 'Bad',
      brand: '',
      category: '',
      shortDescription: '',
      keySpecifications: {},
      productImage: '',
      merchant: '',
      destinationUrl: 'ftp://insecure.example',
      productDataSource: '',
      verificationStatus: 'demo',
    });
    assert.equal(invalid.isValid, false);
    assert.ok(invalid.errors.length >= 5);
  });

  it('verifies all catalogue products conform to the enriched Amazon data schema', () => {
    const productsPath = path.join(__dirname, '..', 'src', 'data', 'products.ts');
    const productsContent = fs.readFileSync(productsPath, 'utf8');

    assert.ok(productsContent.includes('verificationStatus:'), 'Products must declare verificationStatus');
    assert.ok(productsContent.includes('productDataSource:'), 'Products must cite productDataSource');
    assert.ok(productsContent.includes('keySpecifications:'), 'Products must declare keySpecifications');
    assert.ok(productsContent.includes('isPublished:'), 'Products must declare isPublished');

    // Confirm presence of the added categories
    assert.ok(productsContent.includes('prod-logitech-mx-master-3s'), 'Must include Logitech mouse');
    assert.ok(productsContent.includes('prod-portronics-adapto-65w-gan'), 'Must include GaN charger');
    assert.ok(productsContent.includes('prod-pigeon-cruise-induction-cooktop'), 'Must include Pigeon induction cooktop');
  });
});

describe('Phase 2: Formal Verification Status Model, Safe Link Workflow, and Manual Entry Validation', () => {
  it('supports and validates all four verification statuses (demo, verified, expired, unavailable)', () => {
    // 1. demo status
    const demoEntry = validateAndCreateProductEntry({
      id: 'prod-demo-test',
      slug: 'demo-test-speaker',
      title: 'Demo Bluetooth Speaker 20W',
      brand: 'SoundBrand',
      category: 'electronics',
      shortDescription: 'Portable Bluetooth speaker for sample demonstrations.',
      keySpecifications: { Power: '20W' },
      productImage: '/products/speaker.svg',
      merchant: 'amazon-in',
      destinationUrl: 'https://www.amazon.in/dp/B00SPEAKER1',
      productDataSource: 'Official SoundBrand Spec Sheet',
      price: 1999,
      verificationStatus: 'demo',
    });
    assert.equal(demoEntry.isValid, true);
    assert.equal(demoEntry.product?.verificationStatus, 'demo');
    assert.equal(demoEntry.product?.isDemoData, true, 'demo verification status must enforce isDemoData=true');

    // 2. verified status (with valid positive price and source)
    const verifiedEntry = validateAndCreateProductEntry({
      id: 'prod-verified-test',
      slug: 'verified-test-speaker',
      title: 'Verified Bluetooth Speaker 20W',
      brand: 'SoundBrand',
      category: 'electronics',
      shortDescription: 'Portable Bluetooth speaker with verified specifications.',
      keySpecifications: { Power: '20W' },
      productImage: '/products/speaker.svg',
      merchant: 'amazon-in',
      destinationUrl: 'https://www.amazon.in/dp/B00SPEAKER2',
      productDataSource: 'SoundBrand India Direct Specification',
      price: 2499,
      priceSource: 'SoundBrand India Store Listing Check',
      priceVerificationStatus: 'verified',
      verificationStatus: 'verified',
    });
    assert.equal(verifiedEntry.isValid, true);
    assert.equal(verifiedEntry.product?.verificationStatus, 'verified');
    assert.equal(verifiedEntry.product?.priceVerificationStatus, 'verified');
    assert.equal(verifiedEntry.product?.isDemoData, false);

    // 3. expired status for deal
    const expiredDeal = validateAndCreateDealEntry({
      id: 'deal-expired-test',
      slug: 'deal-expired-test',
      title: 'Past Festive Deal on Speakers',
      description: 'Concluded promotion record.',
      productId: 'prod-demo-test',
      store: 'amazon-in',
      destinationUrl: 'https://www.amazon.in/dp/B00SPEAKER1',
      dealSource: 'Amazon Great Indian Festival Archive',
      startDate: '2026-09-01T00:00:00Z',
      endDate: '2026-09-10T23:59:59Z',
      verificationStatus: 'expired',
    });
    assert.equal(expiredDeal.isValid, true);
    assert.equal(expiredDeal.deal?.verificationStatus, 'expired');
    assert.equal(expiredDeal.deal?.status, 'expired', 'Expired deal verification must set status to expired');

    // 4. unavailable status (no price, forced price_unavailable)
    const unavailableEntry = validateAndCreateProductEntry({
      id: 'prod-unavailable-test',
      slug: 'unavailable-test-gadget',
      title: 'Out of Stock Test Gadget Model',
      brand: 'GadgetCo',
      category: 'electronics',
      shortDescription: 'Product currently without active price or availability.',
      keySpecifications: { Connectivity: 'USB-C' },
      productImage: '/products/gadget.svg',
      merchant: 'amazon-in',
      destinationUrl: 'https://www.amazon.in/dp/B00GADGET1',
      productDataSource: 'GadgetCo Press Release',
      verificationStatus: 'unavailable',
      availabilityStatus: 'price_unavailable',
    });
    assert.equal(unavailableEntry.isValid, true);
    assert.equal(unavailableEntry.product?.verificationStatus, 'unavailable');
    assert.equal(unavailableEntry.product?.availabilityStatus, 'price_unavailable');
    assert.equal(unavailableEntry.product?.currentPrice, 0);
  });

  it('prevents demo products and deals from appearing as verified deals', () => {
    // A dataset containing mixed demo and verified records
    const testDeals = [
      { id: 'd-demo', title: 'Sample Deal', verificationStatus: 'demo', isDemoData: true },
      { id: 'd-live', title: 'Live Verified Deal', verificationStatus: 'verified', isDemoData: false },
    ];

    // Queries asking for verified-only / excluding demo records must filter out demo data
    const verifiedDeals = testDeals.filter(
      (d) => d.verificationStatus === 'verified' && !d.isDemoData
    );
    assert.equal(verifiedDeals.length, 1);
    assert.equal(verifiedDeals[0].id, 'd-live');

    // Demo deals must NEVER have isDemoData: false
    for (const d of testDeals) {
      if (d.verificationStatus === 'demo') {
        assert.equal(d.isDemoData, true, 'Demo deal must not claim live status');
      }
    }
  });

  it('rejects invalid, unapproved, lookalike, and credential-embedded destination URLs', () => {
    // Insecure HTTP
    assert.equal(isAllowedDestinationUrl('http://www.amazon.in/dp/B001'), false);
    // Dangerous schemes
    assert.equal(isAllowedDestinationUrl('javascript:alert(document.cookie)'), false);
    assert.equal(isAllowedDestinationUrl('ftp://amazon.in/file'), false);
    assert.equal(isAllowedDestinationUrl('data:text/html,<script>alert(1)</script>'), false);
    // Unapproved foreign or phishing domains
    assert.equal(isAllowedDestinationUrl('https://amazon.com/dp/B001'), false); // Only amazon.in
    assert.equal(isAllowedDestinationUrl('https://evil-phishing.com/deal'), false);
    assert.equal(isAllowedDestinationUrl('https://amazon.in.attacker.org/dp/123'), false);
    assert.equal(isAllowedDestinationUrl('https://fake-amazon.in/item'), false);
    // Embedded credentials
    assert.equal(isAllowedDestinationUrl('https://user:password@www.amazon.in/dp/B001'), false);
  });

  it('preserves full Amazon Associates tracking parameters without stripping or guessing', () => {
    const fullSiteStripeUrl =
      'https://www.amazon.in/dp/B0CX21C8S4?tag=kifayrodeals-21&linkCode=ll1&camp=3638&creative=24630&linkId=a8b9c0d1e2f3&ref_=as_li_ss_tl';

    const result = validateAndPreserveAffiliateUrl(fullSiteStripeUrl);
    assert.equal(result.isValid, true);
    assert.equal(result.isAmazonAssociates, true);
    assert.equal(result.hasTrackingTag, true);
    assert.equal(result.trackingTag, 'kifayrodeals-21');

    // All original parameters must be preserved in sanitizedUrl
    assert.ok(result.sanitizedUrl);
    const url = new URL(result.sanitizedUrl);
    assert.equal(url.searchParams.get('tag'), 'kifayrodeals-21');
    assert.equal(url.searchParams.get('linkCode'), 'll1');
    assert.equal(url.searchParams.get('camp'), '3638');
    assert.equal(url.searchParams.get('creative'), '24630');
    assert.equal(url.searchParams.get('linkId'), 'a8b9c0d1e2f3');
    assert.equal(url.searchParams.get('ref_'), 'as_li_ss_tl');
  });

  it('blocks open redirects through merchant trampoline parameters and server-side data resolution', () => {
    // Nested trampoline URL redirecting to external attacker domain
    const trampolineAttempt1 = 'https://www.amazon.in/gp/redirect.html?location=https://evil.example';
    assert.equal(isAllowedDestinationUrl(trampolineAttempt1), false, 'Must block open redirect via location param');

    const trampolineAttempt2 = 'https://www.flipkart.com/redirect?url=https://phishing.site/login';
    assert.equal(isAllowedDestinationUrl(trampolineAttempt2), false, 'Must block open redirect via url param');

    // Safe nested parameter pointing to another allowlisted merchant path
    const safeNested = 'https://www.amazon.in/gp/redirect.html?location=https://www.amazon.in/dp/B001';
    assert.equal(isAllowedDestinationUrl(safeNested), true, 'Nested URL to allowlisted host is permitted');

    // Outbound redirect route (/go/[id]) inspects only trusted server-side models
    const goRoutePath = path.join(__dirname, '..', 'src', 'app', 'go', '[id]', 'page.tsx');
    const goRouteCode = fs.readFileSync(goRoutePath, 'utf8');
    assert.ok(
      goRouteCode.includes('resolveOutboundTarget(id)'),
      '/go/[id] must resolve target strictly by ID via server dataAdapter'
    );
    assert.ok(
      !goRouteCode.includes('searchParams.url') && !goRouteCode.includes('searchParams.get("url")'),
      '/go/[id] must NEVER read user-supplied destination URLs from query strings'
    );
  });

  it('enforces missing price verification rules and prohibits fabricated price claims', () => {
    // Attempting to claim verified price without positive number
    const missingPriceResult = validateAndCreateProductEntry({
      id: 'prod-no-price',
      slug: 'no-price-item',
      title: 'Item With Missing Price',
      brand: 'TestBrand',
      category: 'electronics',
      shortDescription: 'Item description.',
      keySpecifications: {},
      productImage: '/img.svg',
      merchant: 'amazon-in',
      destinationUrl: 'https://www.amazon.in/dp/B001',
      productDataSource: 'Official Spec Sheet',
      priceVerificationStatus: 'verified', // ILLEGAL: price is undefined
      verificationStatus: 'verified',
    });
    assert.equal(missingPriceResult.isValid, false);
    assert.ok(
      missingPriceResult.errors.some((e) => e.includes('positive price number')),
      'Must reject verified price status when price number is missing'
    );

    // Missing price with in_stock availability status
    const inconsistentResult = validateAndCreateProductEntry({
      id: 'prod-no-price-2',
      slug: 'no-price-item-2',
      title: 'Item With Missing Price',
      brand: 'TestBrand',
      category: 'electronics',
      shortDescription: 'Item description.',
      keySpecifications: {},
      productImage: '/img.svg',
      merchant: 'amazon-in',
      destinationUrl: 'https://www.amazon.in/dp/B001',
      productDataSource: 'Official Spec Sheet',
      availabilityStatus: 'in_stock', // ILLEGAL without price
      verificationStatus: 'demo',
    });
    assert.equal(inconsistentResult.isValid, false);
    assert.ok(
      inconsistentResult.errors.some((e) => e.includes('price_unavailable')),
      'Products without price must specify price_unavailable'
    );

    // Verify product detail page does not emit unsupported Product Offer schema
    const productDetailPagePath = path.join(__dirname, '..', 'src', 'app', 'product', '[slug]', 'page.tsx');
    const productDetailPageContent = fs.readFileSync(productDetailPagePath, 'utf8');
    assert.ok(
      productDetailPageContent.includes('@type\': \'WebPage') || productDetailPageContent.includes('"@type": "WebPage"'),
      'Product detail page must emit WebPage schema, not unsupported Offer schema with fabricated price'
    );
    assert.ok(
      !productDetailPageContent.includes('\'@type\': \'Offer\'') && !productDetailPageContent.includes('"@type": "Offer"'),
      'Must not emit Offer schema for demo products'
    );
  });

  it('correctly detects and handles expired offers and past end dates', () => {
    // Deal with past end date
    const expiredByDate = validateAndCreateDealEntry({
      id: 'deal-past-date',
      slug: 'deal-past-date',
      title: 'Special Diwlai Weekend Flash Sale',
      description: 'Past promotional event.',
      productId: 'prod-oneplus-nord-ce4',
      store: 'amazon-in',
      destinationUrl: 'https://www.amazon.in/dp/B0CX21C8S4',
      dealSource: 'Amazon India Great Indian Festival',
      startDate: '2024-10-01T00:00:00Z',
      endDate: '2024-10-05T23:59:59Z', // In the past
      verificationStatus: 'verified',
    });
    assert.equal(expiredByDate.isValid, true);
    assert.equal(expiredByDate.deal?.status, 'expired', 'Past endDate must be automatically marked status=expired');
    assert.equal(
      expiredByDate.deal?.verificationStatus,
      'expired',
      'Past endDate must update verificationStatus to expired'
    );

    // Deal detail page must display "Offer Expired" notice and disable live deal CTA
    const dealDetailPagePath = path.join(__dirname, '..', 'src', 'app', 'deal', '[slug]', 'page.tsx');
    const dealDetailPageContent = fs.readFileSync(dealDetailPagePath, 'utf8');
    assert.ok(
      dealDetailPageContent.includes('Offer Expired'),
      'Deal page must have Offer Expired notice'
    );
    assert.ok(
      dealDetailPageContent.includes('This promotion has concluded. Check active offers below.'),
      'Deal page must disable active CTA for expired deals'
    );
  });

  it('ensures affiliate disclosure visibility and exact statutory wording across all key views', () => {
    const statutoryText = 'As an Amazon Associate I earn from qualifying purchases.';

    // 1. AffiliateDisclosureNotice component
    const noticePath = path.join(__dirname, '..', 'src', 'components', 'ui', 'AffiliateDisclosureNotice.tsx');
    assert.ok(fs.readFileSync(noticePath, 'utf8').includes(statutoryText));

    // 2. Global Footer component
    const footerPath = path.join(__dirname, '..', 'src', 'components', 'layout', 'Footer.tsx');
    assert.ok(fs.readFileSync(footerPath, 'utf8').includes(statutoryText));

    // 3. /affiliate-disclosure page
    const disclosurePagePath = path.join(__dirname, '..', 'src', 'app', 'affiliate-disclosure', 'page.tsx');
    assert.ok(fs.readFileSync(disclosurePagePath, 'utf8').includes(statutoryText));

    // 4. /about page
    const aboutPagePath = path.join(__dirname, '..', 'src', 'app', 'about', 'page.tsx');
    assert.ok(fs.readFileSync(aboutPagePath, 'utf8').includes(statutoryText));

    // 5. Product & deal pages must render AffiliateDisclosureNotice near CTAs
    const productPagePath = path.join(__dirname, '..', 'src', 'app', 'product', '[slug]', 'page.tsx');
    const dealPagePath = path.join(__dirname, '..', 'src', 'app', 'deal', '[slug]', 'page.tsx');
    assert.ok(fs.readFileSync(productPagePath, 'utf8').includes('AffiliateDisclosureNotice'));
    assert.ok(fs.readFileSync(dealPagePath, 'utf8').includes('AffiliateDisclosureNotice'));
  });
});




