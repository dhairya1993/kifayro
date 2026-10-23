import { AffiliateProvider } from '@/types';

export const affiliateProviders: AffiliateProvider[] = [
  {
    id: 'prov-amazon-in',
    name: 'Amazon Associates India',
    networkCode: 'AMZ-IN',
    status: 'demo',
    region: 'India',
    portalUrl: 'https://affiliate-program.amazon.in/',
    disclosureRequirement:
      'As an Amazon Associate, Kifayro earns from qualifying purchases. Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.',
    notes:
      'Currently operating in demo verification mode. Live Product Advertising API (PA-API v5.0) integration will be connected once the official associate application is formally approved and qualifying sales are achieved.',
    supportsSubIds: false,
  },
  {
    id: 'prov-flipkart',
    name: 'Flipkart Affiliate Programme',
    networkCode: 'FK-IN',
    status: 'demo',
    region: 'India',
    portalUrl: 'https://affiliate.flipkart.com/',
    disclosureRequirement:
      'Kifayro participates in affiliate marketing programs, earning commissions when users purchase through links to Flipkart.',
    notes:
      'Direct publisher API currently paused for open public registration; operating with verified direct merchant links and demo sample data.',
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
      'Merchants featured on Kifayro may be monetized via verified multi-network sub-affiliate channels.',
    notes:
      'Application prepared for unified merchant access (Croma, Tata CLiQ, Myntra, Nykaa, AJIO). Awaiting publisher credential dispatch.',
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
      'Select coupon offers and retail links are subject to affiliate tracking agreements.',
    notes:
      'Secondary backup network for coupon feeds and retail offer verification in India.',
    supportsSubIds: true,
  },
];
