import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '@/src/components/site/breadcrumbs';
import { TeamHeroCard } from '@/src/components/site/team-hero-card';
import { TEAM_MEMBERS } from '@/src/lib/team';
import { buildMetadata, breadcrumbSchema } from '@/src/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Our Team — Meet the People Behind Apronix Tech',
  description:
    'Meet the creative thinkers, strategists and technology enthusiasts building thoughtful digital experiences at Apronix Tech.',
  path: '/team',
});

export default function TeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', href: '/' },
              { name: 'Our Team', href: '/team' },
            ]),
          ),
        }}
      />

      <section className="relative isolate overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-35" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-36 -top-32 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(255,48,56,0.2),transparent_67%)] blur-2xl"
          aria-hidden="true"
        />
        <div className="shell relative grid min-h-[620px] items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-24">
          <div className="relative z-10">
            <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Our Team', href: '/team' }]} />
            <p className="eyebrow mt-9">
              <span className="dot" aria-hidden="true" />
              Meet the people behind Apronix
            </p>
            <h1 className="mt-5 max-w-3xl text-display-lg text-white">
              Creative Minds.
              <br />
              <span className="text-white/65">Bold Ideas.</span>
              <br />
              One Team.
            </h1>
            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-mute-onDark text-pretty sm:text-base">
              Behind every successful digital experience is a team of passionate people. Meet the creative
              thinkers, strategists, and technology enthusiasts building brands with Apronix Tech.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-[0_12px_34px_-16px_rgba(255,48,56,0.95)] transition hover:-translate-y-0.5 hover:bg-brand-dark"
              >
                Let&apos;s Work Together
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
              <a
                href="#team"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
              >
                Meet the team
                <ArrowDown size={15} aria-hidden="true" />
              </a>
            </div>
            <div className="mt-10 flex items-center gap-3 text-xs font-medium text-white/60">
              <span className="flex -space-x-2" aria-hidden="true">
                {TEAM_MEMBERS.slice(0, 4).map((member) => (
                  <span
                    key={member.name}
                    className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-ink bg-ink-soft"
                  >
                    <Image src={member.image} alt="" fill sizes="32px" className="object-cover" />
                  </span>
                ))}
              </span>
              <span>One team. Many ways to make an impact.</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[500px]">
            <div className="pointer-events-none absolute -right-8 top-4 h-64 w-64 rounded-full border border-brand/20" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-3 top-9 h-64 w-64 rounded-full border border-white/[0.06]" aria-hidden="true" />
            <div className="absolute -left-7 top-1/4 z-0 select-none text-[17rem] font-extrabold leading-none text-brand/[0.09]" aria-hidden="true">
              A
            </div>
            <TeamHeroCard members={TEAM_MEMBERS} />
            <div className="absolute -bottom-5 -left-2 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-soft/95 p-3 shadow-card backdrop-blur sm:-left-5 sm:p-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/15 text-brand-soft">
                <Sparkles size={18} aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-semibold text-white">Good work, together</span>
                <span className="mt-0.5 block text-[11px] text-mute-onDark">Different skills. Shared vision.</span>
              </span>
            </div>
            <div className="absolute -right-1 bottom-12 z-20 grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-ink-soft p-2 shadow-card sm:-right-3">
              <Image
                src="/brand/apronix-mark.png"
                alt=""
                width={48}
                height={48}
                className="h-full w-full object-contain"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="section scroll-mt-24">
        <div className="shell">
          <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">
                <span className="dot" aria-hidden="true" />
                The people behind the work
              </p>
              <h2 className="mt-4 text-display-md text-white">Meet Our Team</h2>
            </div>
            <p className="max-w-lg text-[14.5px] leading-relaxed text-mute-onDark sm:text-right">
              Different skills. Shared vision. Together, we turn ideas into meaningful digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {TEAM_MEMBERS.map((member) => (
              <article
                key={member.name}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-soft shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_70px_-35px_rgba(255,48,56,0.45)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#17191f]">
                  <Image
                    src={member.image}
                    alt={`Portrait of ${member.name}, ${member.role} at Apronix Tech`}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                    style={{ objectPosition: member.position }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white/85 backdrop-blur-md">
                    {member.expertise}
                  </span>
                </div>
                <div className="relative p-5 sm:p-5">
                  <span className="absolute left-5 top-0 h-[2px] w-9 -translate-y-1/2 bg-brand transition-all duration-300 group-hover:w-14" aria-hidden="true" />
                  <h3 className="text-[18px] font-bold tracking-[-0.025em] text-white">{member.name}</h3>
                  <p className="mt-1.5 min-h-[2.75rem] text-[13px] leading-relaxed text-mute-onDark">
                    {member.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-ink-soft px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
            <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,48,56,0.2),transparent_70%)]" aria-hidden="true" />
            <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow">
                  <span className="dot" aria-hidden="true" />
                  Let&apos;s make something meaningful
                </p>
                <h2 className="mt-4 text-display-sm text-white">Good things happen when the right people work together.</h2>
              </div>
              <Link
                href="/contact"
                className="inline-flex min-h-12 flex-none items-center justify-center gap-2 self-start rounded-full bg-brand px-6 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-dark md:self-center"
              >
                Let&apos;s Work Together
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
