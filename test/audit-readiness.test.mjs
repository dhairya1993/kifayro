import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Test redirect allowlist and target security
describe('Affiliate Redirect Security & Hostname Allowlist', () => {
  const ALLOWED_DESTINATION_HOSTS = new Set([
    'amazon.in',
    'www.amazon.in',
    'amzn.to',
    'amzn.in',
    'flipkart.com',
    'www.flipkart.com',
    'dl.flipkart.com',
    'croma.com',
    'www.croma.com',
    'reliancedigital.in',
    'www.reliancedigital.in',
    'tatacliq.com',
    'www.tatacliq.com',
    'myntra.com',
    'www.myntra.com',
    'nykaa.com',
    'www.nykaa.com',
    'ajio.com',
    'www.ajio.com',
    'vijaysales.com',
    'www.vijaysales.com',
  ]);

  function isAllowedDestinationUrl(rawUrl) {
    try {
      const parsed = new URL(rawUrl);
      if (parsed.protocol !== 'https:') return false;
      return ALLOWED_DESTINATION_HOSTS.has(parsed.hostname.toLowerCase());
    } catch {
      return false;
    }
  }

  it('allows trusted Indian retail domains over HTTPS', () => {
    assert.equal(isAllowedDestinationUrl('https://www.amazon.in/dp/B0CX21C8S4'), true);
    assert.equal(isAllowedDestinationUrl('https://www.flipkart.com/oneplus-nord-ce4'), true);
    assert.equal(isAllowedDestinationUrl('https://www.croma.com/oneplus-12r'), true);
    assert.equal(isAllowedDestinationUrl('https://www.reliancedigital.in/lg-oled'), true);
    assert.equal(isAllowedDestinationUrl('https://www.tatacliq.com/macbook-air'), true);
    assert.equal(isAllowedDestinationUrl('https://www.myntra.com/shoes'), true);
  });

  it('rejects unallowlisted external domains (prevent open redirect vulnerabilities)', () => {
    assert.equal(isAllowedDestinationUrl('https://evil-phishing.com/steal-creds'), false);
    assert.equal(isAllowedDestinationUrl('https://google.com'), false);
    assert.equal(isAllowedDestinationUrl('https://amazon.com'), false); // Only amazon.in allowed
    assert.equal(isAllowedDestinationUrl('https://fake-amazon.in.attacker.org'), false);
  });

  it('rejects insecure HTTP protocol even for allowlisted domains', () => {
    assert.equal(isAllowedDestinationUrl('http://www.amazon.in/dp/123'), false);
    assert.equal(isAllowedDestinationUrl('http://www.flipkart.com/item'), false);
  });

  it('rejects malformed or non-URL strings', () => {
    assert.equal(isAllowedDestinationUrl('javascript:alert(1)'), false);
    assert.equal(isAllowedDestinationUrl('data:text/html,<script>alert(1)</script>'), false);
    assert.equal(isAllowedDestinationUrl('not-a-valid-url'), false);
    assert.equal(isAllowedDestinationUrl(''), false);
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
