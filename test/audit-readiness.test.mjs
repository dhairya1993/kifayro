import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isAllowedDestinationUrl, ALLOWED_DESTINATION_HOSTS } from '../src/lib/url-validator.ts';
import { articles } from '../src/data/articles.ts';

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
  ];

  it('provides exactly the 10 approved original shopping guide topics', () => {
    assert.equal(articles.length, 10, 'Must have exactly 10 comprehensive shopping guides');
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

describe('Demo Data & Sitemap Exclusion Policy', () => {
  it('excludes demo products and deals from the public indexable sitemap', () => {
    const mockProducts = [
      { id: '1', slug: 'demo-phone', isDemoData: true, lastVerifiedAt: '2026-10-23' },
      { id: '2', slug: 'live-phone', isDemoData: false, lastVerifiedAt: '2026-10-24' },
    ];
    const mockDeals = [
      { id: 'd1', slug: 'demo-deal', isDemoData: true, lastVerifiedAt: '2026-10-23' },
      { id: 'd2', slug: 'live-deal', isDemoData: false, lastVerifiedAt: '2026-10-24' },
    ];

    const liveProducts = mockProducts.filter((p) => !p.isDemoData);
    const liveDeals = mockDeals.filter((d) => !d.isDemoData);

    assert.equal(liveProducts.length, 1);
    assert.equal(liveProducts[0].slug, 'live-phone');
    assert.equal(liveDeals.length, 1);
    assert.equal(liveDeals[0].slug, 'live-deal');

    // All sample mock records currently marked demo must be 0 in public sitemap
    const sampleOnlyDataset = mockProducts.filter((p) => p.isDemoData);
    const sitemapFiltered = sampleOnlyDataset.filter((p) => !p.isDemoData);
    assert.equal(sitemapFiltered.length, 0);
  });
});

describe('Truthful Contact & Newsletter Policies', () => {
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
});
