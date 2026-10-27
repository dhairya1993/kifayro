import { AffiliateProvider } from '@/types';

export const affiliateProviders: AffiliateProvider[] = [
  {
    id: 'prov-amazon-in',
    name: 'Amazon Associates India',
    networkCode: 'AMZ-IN',
    status: 'pending_approval',
    region: 'India',
    portalUrl: 'https://affiliate-program.amazon.in/',
    disclosureRequirement:
      'Statutory disclosure upon program approval: As an Amazon Associate, Kifayro earns from qualifying purchases. Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.',
    notes:
      "Kifayro has been issued the Amazon Associates tracking ID kifayrodeals-21. The application remains subject to Amazon's review and applicable program requirements. The assignment of a Store ID does not itself confirm final approval. Amazon links currently route without active affiliate tracking parameters, and PA-API credentials are not active.",
    supportsSubIds: false,
  },
  {
    id: 'prov-flipkart',
    name: 'Flipkart Affiliate Programme',
    networkCode: 'FK-IN',
    status: 'pending_approval',
    region: 'India',
    portalUrl: 'https://affiliate.flipkart.com/',
    disclosureRequirement:
      'Statutory disclosure upon program approval: Kifayro will disclose referral fees earned on qualifying purchases through authorized Flipkart affiliate links.',
    notes:
      'Application in preparation. Direct publisher API currently paused for open public registration; operating with direct merchant links and sample data.',
    supportsSubIds: true,
  },
  {
    id: 'prov-cuelinks',
    name: 'Cuelinks Sub-Affiliate Network',
    networkCode: 'CL-IN',
    status: 'pending_approval',
    region: 'India & South Asia',
    portalUrl: 'https://www.cuelinks.com/',
    disclosureRequirement:
      'Statutory disclosure upon network approval: Select merchant links on Kifayro may be monetized via verified multi-network sub-affiliate channels once approved.',
    notes:
      'Application prepared for unified merchant access (Croma, Tata CLiQ, Myntra, Nykaa, AJIO). No active monetization tracking is currently enabled.',
    supportsSubIds: true,
  },
  {
    id: 'prov-vcommission',
    name: 'vCommission Media',
    networkCode: 'VC-IN',
    status: 'pending_approval',
    region: 'India',
    portalUrl: 'https://www.vcommission.com/',
    disclosureRequirement:
      'Statutory disclosure upon network approval: Select coupon offers and retail links will be subject to affiliate tracking agreements once active.',
    notes:
      'Secondary backup network for coupon feeds and retail offer verification in India. Currently pending partner activation.',
    supportsSubIds: true,
  },
];
