/**
 * Shared constants used by both the server and the client bundles.
 * Keep this file free of secrets and server-only imports.
 */

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', hasChildren: true },
  { label: 'Work', href: '/work' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const;

export const SERVICE_NAV = [
  {
    label: 'Social Media Management',
    href: '/services/social-media-management',
    description: 'Strategy, content and community management that keeps your brand consistent.',
  },
  {
    label: 'Shopify Development',
    href: '/services/shopify-development',
    description: 'Fast, conversion-focused Shopify stores built to scale with your catalogue.',
  },
  {
    label: 'WordPress Development',
    href: '/services/wordpress-development',
    description: 'Business websites and CMS builds your team can actually manage.',
  },
] as const;

export const PUBLIC_STATUS = {
  PUBLISHED: 'PUBLISHED',
  DRAFT: 'DRAFT',
  ARCHIVED: 'ARCHIVED',
} as const;

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discover',
    body: 'We start with a structured conversation about your business, customers and goals — then audit what you already have.',
  },
  {
    step: '02',
    title: 'Plan',
    body: 'You get a written scope: pages, content, integrations, timeline and what success looks like. No surprises later.',
  },
  {
    step: '03',
    title: 'Design',
    body: 'Layouts and content structures are designed around how your customers decide, not around a template.',
  },
  {
    step: '04',
    title: 'Develop',
    body: 'We build in a staging environment with regular checkpoints so you can see progress and give feedback early.',
  },
  {
    step: '05',
    title: 'Launch',
    body: 'Quality assurance, accessibility checks, analytics, redirects and a handover walkthrough of your new site.',
  },
  {
    step: '06',
    title: 'Optimise',
    body: 'After launch we review real behaviour and refine content, performance and conversion paths.',
  },
] as const;

export const WHY_APRONIX = [
  {
    title: '360° Digital Solutions',
    body: 'Bring marketing and website requirements together with creative execution and strategic planning designed around your business.',
    icon: 'compass',
    href: '/services',
  },
  {
    title: 'Social Media Strategy',
    body: 'Build a consistent brand presence through content planning, creative campaigns, platform-specific strategies, and audience-focused communication.',
    icon: 'layers',
    href: '/services/social-media-management',
  },
  {
    title: 'Shopify & WordPress Development',
    body: 'Create responsive websites that showcase your brand, improve user experience, and support your business goals.',
    icon: 'shopping-bag',
    href: '/services',
  },
  {
    title: 'Industry-Focused Approach',
    body: 'Shape creative and digital work around your audience, industry, competition, and objectives.',
    icon: 'building',
    href: '/services',
  },
  {
    title: 'Smooth Onboarding & Collaboration',
    body: 'Follow a clear workflow from the first discussion to delivery, with structured communication, feedback, and approvals.',
    icon: 'message-square',
    href: '/contact',
  },
  {
    title: 'Research & Creative Thinking',
    body: 'Make informed decisions through audience research, competitor analysis, creative exploration, and practical digital recommendations.',
    icon: 'compass',
    href: '/contact',
  },
] as const;

export const CAPABILITIES = [
  'Social media strategy',
  'Shopify storefronts',
  'WordPress builds',
  'Content design',
  'Conversion-focused UX',
  'Performance optimisation',
  'Technical SEO',
  'Ongoing support',
] as const;

export const SITE_FACTS_FALLBACK = [
  { label: 'Disciplines', value: 'Social · Shopify · WordPress' },
  { label: 'Engagement', value: 'Project-based & retained' },
  { label: 'Collaboration', value: 'Remote-first, async-friendly' },
  { label: 'Reporting', value: 'Clear, plain-English updates' },
];
