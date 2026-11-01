import 'server-only';
import { unstable_cache } from 'next/cache';
import { prisma } from '@/src/lib/prisma';
import { publicEnv, serverEnv, features, whatsappLink } from '@/src/lib/env';
import { DEFAULT_CLIENT_LOGOS, type ClientLogo } from '@/src/content/client-logos';

/**
 * Editable site settings. Values live in the SiteSetting table so the agency can
 * change copy, contact details and social links from /admin/settings without a
 * code change. Code defaults are used when a key has never been saved.
 */

export type SiteSettings = {
  siteName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  addressLine: string;
  serviceArea: string;
  whatsapp: string | null;
  socials: { label: string; url: string }[];
  instagramReels: string[];
  footerNote: string;
  businessHours: string;
  showTestimonials: boolean;
  showClients: boolean;
  clientNames: string[];
  clientLogos: ClientLogo[];
  facts: { label: string; value: string }[];
  analyticsConsent: boolean;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: publicEnv.siteName,
  tagline: 'Digital Experiences. Measurable Growth.',
  description:
    'Apronix Tech helps ambitious businesses build a stronger digital presence through strategic social media management and high-performing Shopify and WordPress websites.',
  email: serverEnv.supportEmail,
  phone: '',
  addressLine: '',
  serviceArea: 'Working with clients remotely across India and worldwide.',
  whatsapp: whatsappLink('Hi Apronix Tech, I would like to discuss a project.'),
  socials: [],
  instagramReels: [],
  footerNote: 'Built with care by Apronix Tech.',
  businessHours: 'Mon–Fri, 10:00–19:00 IST',
  showTestimonials: true,
  showClients: false,
  clientNames: [],
  clientLogos: DEFAULT_CLIENT_LOGOS,
  facts: [
    { label: 'Disciplines', value: 'Social · Shopify · WordPress' },
    { label: 'Engagement', value: 'Project-based & retained' },
    { label: 'Collaboration', value: 'Remote-first, async-friendly' },
    { label: 'Reporting', value: 'Clear, plain-English updates' },
  ],
  analyticsConsent: true,
};

async function loadSettings(): Promise<SiteSettings> {
  try {
    const rows = await prisma.siteSetting.findMany();
    const stored = Object.fromEntries(rows.map((row) => [row.key, row.value as unknown]));
    const savedSettings = { ...DEFAULT_SETTINGS, ...(stored as Partial<SiteSettings>) };
    return {
      ...savedSettings,
      instagramReels: Array.isArray(savedSettings.instagramReels)
        ? savedSettings.instagramReels.filter(isInstagramReelUrl).slice(0, 3)
        : [],
      clientLogos: Array.isArray(savedSettings.clientLogos)
        ? savedSettings.clientLogos.filter(isClientLogo).slice(0, 100)
        : DEFAULT_CLIENT_LOGOS,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

/** Cached site settings, revalidated when settings change. */
export const getSiteSettings = unstable_cache(loadSettings, ['site-settings'], {
  revalidate: 300,
  tags: ['site-settings'],
});

const SETTING_KEYS: (keyof SiteSettings)[] = [
  'siteName',
  'tagline',
  'description',
  'email',
  'phone',
  'addressLine',
  'serviceArea',
  'whatsapp',
  'socials',
  'instagramReels',
  'footerNote',
  'businessHours',
  'showTestimonials',
  'showClients',
  'clientNames',
  'clientLogos',
  'facts',
  'analyticsConsent',
];

export async function saveSiteSettings(input: Partial<SiteSettings>) {
  const entries = Object.entries(input).filter(([key]) =>
    SETTING_KEYS.includes(key as keyof SiteSettings),
  );
  await prisma.$transaction(
    entries.map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value: value as object },
        create: { key, value: value as object },
      }),
    ),
  );
}

function isInstagramReelUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return (
      url.protocol === 'https:' &&
      url.hostname.replace(/^www\./, '') === 'instagram.com' &&
      /^\/(?:reel|p)\/[\w-]+\/?$/.test(url.pathname)
    );
  } catch {
    return false;
  }
}

function isClientLogo(value: unknown): value is ClientLogo {
  if (!value || typeof value !== 'object') return false;
  const logo = value as Partial<ClientLogo>;
  return (
    typeof logo.name === 'string' &&
    logo.name.trim().length > 0 &&
    typeof logo.image === 'string' &&
    /^\/(?:media\/client-logos|uploads)\/(?:[A-Za-z0-9._-]|%20|%26)+$/.test(logo.image) &&
    typeof logo.enabled === 'boolean' &&
    (logo.url === undefined || isHttpsUrl(logo.url))
  );
}

function isHttpsUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

export { features };
