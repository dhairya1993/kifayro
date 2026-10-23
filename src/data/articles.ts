import { Article } from '@/types';

export const articles: Article[] = [
  {
    id: 'art-spot-fake-discounts-festive-sales',
    slug: 'how-to-spot-fake-discounts-in-indian-sales',
    title: 'How to Spot Fake Discounts During Major Indian Online Sales',
    excerpt: 'Before clicking “Buy Now” on a tempting 60% discount badge during Diwali or Independence Day sales, learn how inflated MRPs trick buyers and how to verify real savings.',
    category: 'Shopping Guides',
    publishedAt: '2026-10-15T08:00:00Z',
    readingTime: '6 min read',
    author: {
      name: 'Aditya Sharma',
      role: 'Consumer Research Lead at Kifayro',
    },
    tags: ['Smart Shopping', 'Festive Sales', 'Price Verification', 'Consumer Rights'],
    keyTakeaways: [
      'Retailers often mark up the “Maximum Retail Price” (MRP) right before a sale to show exaggerated discount percentages.',
      'Check the actual street selling price over the last 90 days rather than trusting the crossed-out strikethrough price.',
      'Always calculate the effective price after factoring in mandatory delivery fees and convenience charges.',
      'Compare identical model numbers (SKUs) across multiple retailers before committing.',
    ],
    content: `
### The Psychology of the Strikethrough Price

Every festive shopping season in India—from the Great Indian Festival to Big Billion Days—shoppers are bombarded with banner ads proclaiming “Up to 70% Off!” or “Lowest Price Ever!”. Yet savvy buyers know that a discount percentage is only as honest as the baseline price it is measured against.

In Indian e-commerce, sellers frequently reference the manufacturer’s statutory MRP (Maximum Retail Price). However, many electronics, apparel items, and appliances rarely, if ever, sell at their theoretical MRP during normal business months. When a smartphone with an MRP of ₹29,999 has been selling at ₹24,999 for six months, a sale price of ₹23,999 represents a genuine saving of ₹1,000—not ₹6,000.

### 4 Practical Techniques to Verify Genuine Deals

#### 1. Look for the Exact Model Number (SKU)
Many electronics brands release specific retailer-exclusive variants that differ by a single letter in their product code (for example, TV model 55UQ8000 vs 55UQ8020). These variants may lack certain ports, use slower refresh rates, or come with older Bluetooth standards. When comparing across stores, always copy the exact alphanumeric model code from the technical specifications table.

#### 2. Beware of “Deal of the Day” Timers
Countdowns ticking down from 15 minutes to zero are frequently client-side scripts designed to induce artificial urgency (FOMO). In reality, the price often remains identical even after the clock expires. Take a breath, compare prices across other legitimate stores, and ensure the purchase fits your actual needs.

#### 3. Factor in Payment Gateway & Convenience Fees
Recently, several large marketplaces in India introduced non-refundable platform fees (typically ₹3 to ₹15) and handling fees for Cash on Delivery or specific bank processing. Always review the final checkout screen before OTP authentication to confirm the net out-of-pocket figure.

#### 4. Verify Open-Box Delivery Eligibility
On high-ticket items like smartphones, laptops, and large TVs, look for sellers offering “Open Box Delivery”. This allows you to inspect the physical device and serial number in the presence of the delivery agent before sharing your delivery OTP, protecting you against transit fraud and defective items.
    `,
  },
  {
    id: 'art-mastering-instant-bank-discounts-upi',
    slug: 'understanding-instant-bank-discounts-and-upi-offers',
    title: 'Understanding Instant Bank Discounts and UPI Offers in India',
    excerpt: 'Credit card EMI, instant debit card cuts, and UPI cashback: understand the terms, hidden interest charges, and minimum spend thresholds before paying.',
    category: 'Payment Tips',
    publishedAt: '2026-10-18T09:30:00Z',
    readingTime: '5 min read',
    author: {
      name: 'Pooja Iyer',
      role: 'Fintech & Deals Analyst',
    },
    tags: ['Bank Offers', 'Credit Cards', 'UPI', 'No Cost EMI'],
    keyTakeaways: [
      'Instant discounts reduce invoice value at checkout; cashback credits your bank account after 30 to 90 days.',
      '“No Cost EMI” discounts the interest upfront, but banks still levy an 18% GST charge on the interest portion.',
      'Check whether the offer applies to Corporate / Commercial credit cards (most promotions exclude them).',
      'Ensure your cart meets the qualifying threshold excluding delivery and gift-wrap fees.',
    ],
    content: `
### Instant Discount vs. Cashback: What’s the Difference?

When browsing deals on Indian e-commerce platforms, bank offers represent the most consistent path to genuine extra savings. However, understanding the mechanics of how these offers are applied will prevent surprises on your monthly credit card statement.

An **instant discount** is deducted directly from your cart total before you enter your CVV or OTP. If a laptop costs ₹60,000 and has a 10% instant discount (max ₹5,000), your bank account or card is charged exactly ₹55,000. 

A **cashback offer**, conversely, charges your card the full ₹60,000. The promotional ₹5,000 is credited back as statement credit within 60 to 90 calendar days. If you return or cancel the item, the cashback is voided.

### The Truth About “No Cost EMI”

Under Reserve Bank of India (RBI) regulations, banks are not legally allowed to offer zero-percent loans on consumer goods. To offer “No Cost EMI”, retailers provide an upfront product discount equal to the interest the bank will charge over your selected repayment tenure (e.g. 3 or 6 months).

While the total principal plus interest equals the original product price, keep two hidden costs in mind:
1. **One-Time Processing Fees**: Most Indian credit card issuers charge a non-refundable EMI processing fee of ₹99 to ₹299 + 18% GST.
2. **GST on Monthly Interest**: Government tax (18% GST) is charged monthly on the interest portion of each EMI instalment. Because of this, a “No Cost EMI” often costs 1% to 2% more than paying upfront in a single lump sum.
    `,
  },
  {
    id: 'art-laptop-buying-guide-students-india',
    slug: 'best-laptop-buying-guide-for-indian-students',
    title: 'Student Laptop Buying Guide: What Specs Actually Matter Under ₹60,000',
    excerpt: 'Confused between Intel Core i5, AMD Ryzen 5, 8GB vs 16GB RAM, and OLED vs IPS? Here is an honest, budget-conscious breakdown for Indian college students.',
    category: 'Buying Guides',
    publishedAt: '2026-10-20T11:00:00Z',
    readingTime: '7 min read',
    author: {
      name: 'Aditya Sharma',
      role: 'Consumer Research Lead at Kifayro',
    },
    tags: ['Laptops', 'Student Tech', 'Hardware Specs', 'Budget Advice'],
    keyTakeaways: [
      'Never purchase an 8GB non-upgradable laptop in 2026; modern operating systems and web browsers require 16GB for smooth multi-tasking.',
      'Prioritize display quality (minimum 100% sRGB or 300 nits) over unnecessary touchscreens.',
      'Look for Type-C Power Delivery charging so you can power your laptop using standard phone chargers.',
      'Verify if MS Office Student Edition is bundled with a lifetime license.',
    ],
    content: `
### Finding the Sweet Spot for Student Productivity

For most college students in India—whether studying engineering, commerce, humanities, or medicine—a laptop represents a major investment meant to last 4 to 5 years. Unfortunately, retail stores frequently push older generation inventory with flashy marketing stickers that disguise mediocre core components.

Here is the straightforward minimum specification checklist recommended by Kifayro’s independent testing:

### 1. The 16GB RAM Rule
Operating systems like Windows 11 consume 4GB to 5GB of memory simply idling with background security agents. When you open a dozen browser tabs for research alongside a coding IDE or PDF reader, an 8GB machine begins swapping to disk, causing micro-stutters. Whenever possible, choose a laptop with 16GB dual-channel RAM or ensure there is an accessible SO-DIMM expansion slot.

### 2. Processor Generation Over Model Badges
An Intel Core i3 from the latest 13th or 14th generation or AMD Ryzen 3 7000-series frequently outperforms a 10th-generation Core i7. Check the suffix letters:
- **U-series** (e.g. i5-1335U): Power-efficient, delivers 7-9 hours of battery life, ideal for note-taking and coding.
- **H / HS-series** (e.g. Ryzen 5 7640HS): Higher thermal wattage, faster rendering and compiling, but heavier chargers and shorter unplugged endurance.

### 3. Display Matters More Than You Think
Students spend 6 to 10 hours daily staring at their screens. Avoid cheap 220-nit displays with 45% NTSC colour accuracy—they appear washed out in brightly lit Indian lecture halls. Look for 300 nits brightness and IPS panels with anti-glare coatings.
    `,
  },
  {
    id: 'art-how-coupons-and-promo-codes-work',
    slug: 'how-coupon-codes-work-and-why-they-fail',
    title: 'How Coupon Codes Really Work and Why They Often Fail at Checkout',
    excerpt: 'Ever spent 20 minutes copying 10 random coupon codes only for every single one to say “Code Invalid”? Understand how affiliate coupon systems operate and where to find verified codes.',
    category: 'Shopping Guides',
    publishedAt: '2026-10-22T14:00:00Z',
    readingTime: '4 min read',
    author: {
      name: 'Pooja Iyer',
      role: 'Fintech & Deals Analyst',
    },
    tags: ['Coupons', 'Promo Codes', 'Checkout Tips', 'Savings'],
    keyTakeaways: [
      'Most coupon codes are tied to specific user segments (new user, VIP, specific cardholder, or mobile app only).',
      'Many generic deals sites invent fake “reveal code” popups to drop affiliate cookies without delivering a real discount.',
      'At Kifayro, every coupon is manually verified against the merchant checkout system with verified terms and timestamps.',
    ],
    content: `
### The Frustration of the Expired Coupon Loop

We have all experienced it: you find an attractive coupon code on a generic website, click “Show Code”, get redirected through five ad networks, copy the string, paste it at checkout, and get the dreaded message: *“This voucher code has expired or is invalid for items in your cart.”*

### Why Do Retail Promo Codes Fail?

1. **Category Exclusions**: Retailers often exclude brand-new releases or items already discounted by more than 30%.
2. **Account Whitelisting**: Many codes generated during influencer promotions or SMS campaigns are tied to specific registered phone numbers or email addresses.
3. **Cart Threshold Calculations**: The minimum spend threshold is calculated **before** taxes and **after** any standard store markdown.
4. **Platform-Specific Rules**: Several coupons only activate when applied inside Android or iOS mobile applications, failing on desktop browsers.

At Kifayro, we never publish unverified promotional strings. If an offer is expired or restricted to a specific bank card, we state those constraints clearly upfront.
    `,
  },
];
