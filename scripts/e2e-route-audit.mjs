import http from 'node:http';
import https from 'node:https';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

function fetchUrl(path) {
  const url = new URL(path, BASE_URL);
  const client = url.protocol === 'https:' ? https : http;

  return new Promise((resolve, reject) => {
    client
      .get(url.toString(), (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({ status: res.statusCode, headers: res.headers, body: data });
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

async function runRouteAudit() {
  console.log(`--- Starting Comprehensive Kifayro Route & Interaction Audit (${BASE_URL}) ---`);

  const testCases = [
    { path: '/', expectedStatus: 200, checks: ['Platform Preview', 'Kifayro'] },
    { path: '/search?q=phone', expectedStatus: 200, checks: ['Search Results for', 'phone'] },
    { path: '/categories', expectedStatus: 200, checks: ['Categories', 'Mobiles'] },
    { path: '/categories/mobiles', expectedStatus: 200, checks: ['Mobiles &amp; Tablets'] },
    { path: '/stores', expectedStatus: 200, checks: ['Supported Indian Retail Stores', 'Amazon India'] },
    { path: '/stores/amazon-in', expectedStatus: 200, checks: ['Amazon India', 'Deals'] },
    { path: '/deals', expectedStatus: 200, checks: ['Indian Deals', 'Offers (Preview)'] },
    { path: '/deal/deal-oneplus-nord-ce4-flat-2000-off', expectedStatus: 200, checks: ['OnePlus Nord CE 4', 'Sample Offer'] },
    { path: '/deal/non-existent-deal-xyz', expectedStatus: 404, checks: ['404'] },
    { path: '/product/oneplus-nord-ce-4-5g', expectedStatus: 200, checks: ['OnePlus Nord CE 4', 'Benchmark Store Price'] },
    { path: '/product/non-existent-product-xyz', expectedStatus: 404, checks: ['404'] },
    { path: '/compare', expectedStatus: 200, checks: ['Multi-Store Price Comparison Engine', 'Benchmark Lowest'] },
    { path: '/coupons', expectedStatus: 200, checks: ['Indian Store Coupons', 'Sample Voucher'] },
    { path: '/about', expectedStatus: 200, checks: ['About Kifayro', 'Commercial Transparency'] },
    { path: '/how-it-works', expectedStatus: 200, checks: ['How Kifayro Works', 'Direct Merchant Navigation'] },
    { path: '/affiliate-disclosure', expectedStatus: 200, checks: ['Affiliate Disclosure', 'Platform Preview &amp; Affiliate Notice'] },
    { path: '/editorial-policy', expectedStatus: 200, checks: ['Editorial &amp; Verification Policy'] },
    { path: '/privacy-policy', expectedStatus: 200, checks: ['Privacy Policy'] },
    { path: '/terms', expectedStatus: 200, checks: ['Terms of Use'] },
    { path: '/disclaimer', expectedStatus: 200, checks: ['Disclaimer'] },
    { path: '/contact', expectedStatus: 200, checks: ['Contact Channels', 'Setup Pending'] },
    { path: '/robots.txt', expectedStatus: 200, checks: ['Disallow: /go/', 'Disallow: /search'] },
    { path: '/sitemap.xml', expectedStatus: 200, checks: ['<urlset', '/deals', '/categories', '/stores'] },

    // Redirect tests & injection resistance checks
    {
      path: '/go/prod-oneplus-nord-ce4',
      expectedStatus: 200,
      checks: ['Taking You to', 'https://www.amazon.in/dp/B0CX21C8D2'],
    },
    {
      path: '/go/prod-oneplus-nord-ce4?url=https%3A%2F%2Fevil.example',
      expectedStatus: 200,
      checks: [
        'Taking You to',
        'https://www.amazon.in/dp/B0CX21C8D2', // Server-defined target remains completely intact
      ],
      negativeChecks: [
        'https://evil.example',
        'href="https://evil.example',
        '"destinationUrl":"https://evil.example',
      ],
    },
    {
      path: '/go/non-existent-random-target-id',
      expectedStatus: 404,
      checks: ['404'],
      negativeChecks: [
        'Taking You to',
        'Direct Merchant Destination',
      ],
    },
    {
      path: '/go/non-existent-random-target-id?url=https%3A%2F%2Fevil.example',
      expectedStatus: 404,
      checks: ['404'],
      negativeChecks: [
        'https://evil.example',
        'href="https://evil.example',
        '"destinationUrl":"https://evil.example',
        'Taking You to',
        'Direct Merchant Destination',
      ],
    },
  ];

  let passed = 0;
  let failed = 0;

  for (const tc of testCases) {
    try {
      const res = await fetchUrl(tc.path);
      const statusOk = res.status === tc.expectedStatus;
      let contentOk = true;
      const missingChecks = [];
      const unwantedFound = [];

      for (const check of tc.checks || []) {
        if (!res.body.includes(check)) {
          contentOk = false;
          missingChecks.push(check);
        }
      }

      for (const unwanted of tc.negativeChecks || []) {
        if (res.body.includes(unwanted)) {
          contentOk = false;
          unwantedFound.push(unwanted);
        }
      }

      if (statusOk && contentOk) {
        console.log(`[PASS] ${tc.path} (HTTP ${res.status})`);
        passed++;
      } else {
        const failureDetails = [];
        if (!statusOk) failureDetails.push(`status=${res.status} (expected ${tc.expectedStatus})`);
        if (missingChecks.length) failureDetails.push(`missing=[${missingChecks.join(', ')}]`);
        if (unwantedFound.length) failureDetails.push(`unwanted_found=[${unwantedFound.join(', ')}]`);
        console.error(`[FAIL] ${tc.path}: ${failureDetails.join('; ')}`);
        failed++;
      }
    } catch (err) {
      console.error(`[ERROR] ${tc.path}: ${err.message}`);
      failed++;
    }
  }

  // Specific check for Sitemap: Ensure demo-only products are excluded
  try {
    const sitemapRes = await fetchUrl('/sitemap.xml');
    const hasDemoProductInSitemap = sitemapRes.body.includes('/product/oneplus-nord-ce-4-5g');
    if (hasDemoProductInSitemap) {
      console.error('[FAIL] Sitemap contains demo product URL! Expected demo-only products to be excluded.');
      failed++;
    } else {
      console.log('[PASS] Sitemap correctly excludes demo-only products from public indexation.');
      passed++;
    }
  } catch (err) {
    console.error(`[ERROR] Sitemap check: ${err.message}`);
    failed++;
  }

  console.log(`\nAudit Route Summary: ${passed} Passed, ${failed} Failed.`);
  if (failed > 0) {
    process.exit(1);
  }
}

runRouteAudit();
