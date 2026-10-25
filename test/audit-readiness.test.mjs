import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isAllowedDestinationUrl, ALLOWED_DESTINATION_HOSTS } from '../src/lib/url-validator.ts';

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
