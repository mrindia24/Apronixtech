import Link from 'next/link';
import { ArrowUpRight, Instagram, Mail, MessageCircle, Phone } from 'lucide-react';
import { Logo } from '@/src/components/site/logo';
import { SERVICE_NAV } from '@/src/lib/constants';
import { getSiteSettings } from '@/src/lib/settings';

const SOCIAL_PROFILES = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'facebook', label: 'Facebook' },
  { key: 'pinterest', label: 'Pinterest' },
] as const;

function SocialIcon({ platform }: { platform: (typeof SOCIAL_PROFILES)[number]['key'] }) {
  if (platform === 'instagram') return <Instagram size={17} strokeWidth={1.8} aria-hidden="true" />;

  if (platform === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] fill-current" aria-hidden="true">
        <path d="M13.2 21v-8.2H16l.4-3.2h-3.2v-2c0-.9.3-1.5 1.6-1.5h1.7V3.2c-.3 0-1.3-.2-2.5-.2-2.5 0-4.2 1.5-4.2 4.3v2.3H7v3.2h2.8V21h3.4Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-[17px] w-[17px] fill-current" aria-hidden="true">
      <path d="M12.1 2C6.5 2 3.6 6 3.6 9.3c0 2 .8 3.8 2.5 4.5.3.1.5 0 .6-.3l.2-.9c.1-.3 0-.4-.2-.7-.5-.6-.8-1.4-.8-2.5 0-3.2 2.4-6.1 6.3-6.1 3.4 0 5.3 2.1 5.3 4.9 0 3.7-1.6 6.8-4 6.8-1.3 0-2.3-1.1-2-2.4.4-1.6 1.1-3.4 1.1-4.5 0-1-.5-1.8-1.6-1.8-1.3 0-2.4 1.3-2.4 3.1 0 1.1.4 1.9.4 1.9l-1.6 6.7c-.5 2-.1 4.5-.1 4.7.1.1.2.2.3.1.1-.1 1.7-2 2.2-4 .2-.6.8-3.4.8-3.4.4.8 1.7 1.5 3 1.5 4 0 6.7-3.7 6.7-8.7C20.3 5.5 17 2 12.1 2Z" />
    </svg>
  );
}

export async function Footer() {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();
  const socialProfiles = SOCIAL_PROFILES.map((profile) => ({
    ...profile,
    href: settings.socials.find(
      (social) => social.label.trim().toLowerCase() === profile.key,
    )?.url,
  }));

  return (
    <footer className="relative border-t border-white/[0.08] bg-ink">
      <div className="shell py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo size="md" />
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-mute-onDark">
              {settings.description}
            </p>
            <nav aria-label="Social media" className="mt-5">
              <ul className="flex items-center gap-2">
                {socialProfiles.map(({ key, label, href }) => (
                  <li key={key}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow Apronix Tech on ${label}`}
                        className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white/65 transition hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand/[0.1] hover:text-brand-soft"
                      >
                        <SocialIcon platform={key} />
                      </a>
                    ) : (
                      <span
                        title={`${label} profile can be added in Admin settings`}
                        aria-label={`${label} profile link not configured`}
                        className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.07] bg-white/[0.02] text-white/35"
                      >
                        <SocialIcon platform={key} />
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6 flex flex-col gap-2.5 text-[13.5px]">
              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="inline-flex items-center gap-2 py-3 -my-3 text-white/85 transition hover:text-brand-soft"
                >
                  <Mail size={14} aria-hidden="true" />
                  {settings.email}
                </a>
              )}
              {settings.phone && (
                <a
                  href={`tel:${settings.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 py-3 -my-3 text-white/85 transition hover:text-brand-soft"
                >
                  <Phone size={14} aria-hidden="true" />
                  {settings.phone}
                </a>
              )}
              {settings.whatsapp && (
                <a
                  href={settings.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 py-3 -my-3 text-white/85 transition hover:text-brand-soft"
                >
                  <MessageCircle size={14} aria-hidden="true" />
                  Chat on WhatsApp
                </a>
              )}
            </div>
          </div>

          <nav aria-label="Services">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">Services</h2>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              {SERVICE_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-block py-3 -my-3 text-mute-onDark transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="inline-block py-3 -my-3 text-mute-onDark transition hover:text-white">
                  All services
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">Company</h2>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              {[
                { label: 'About us', href: '/about' },
                { label: 'Our team', href: '/team' },
                { label: 'Our work', href: '/work' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="inline-block py-3 -my-3 text-mute-onDark transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">Start a project</h2>
            <p className="mt-4 text-[13.5px] leading-relaxed text-mute-onDark">
              Tell us what you are working on. We reply within one business day.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-white transition hover:text-brand-soft"
            >
              Book a free consultation
              <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
            {settings.businessHours && (
              <p className="mt-5 text-[12.5px] text-white/65">{settings.businessHours}</p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-white/60">
            © {year} {settings.siteName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px]">
            <Link href="/privacy-policy" className="inline-block py-3 -my-3 text-white/65 transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="inline-block py-3 -my-3 text-white/65 transition hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link href="/sitemap.xml" className="inline-block py-3 -my-3 text-white/65 transition hover:text-white">
              Sitemap
            </Link>
            <Link href="/admin/login" className="inline-block py-3 -my-3 text-white/70 transition hover:text-white">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
