import Link from 'next/link';
import { ArrowUpRight, Instagram, Play, Sparkles } from 'lucide-react';
import { SectionHeading } from '@/src/components/site/sections';

type InstagramReelsSectionProps = {
  reels: string[];
  instagramProfile?: string;
};

function reelEmbedUrl(reel: string) {
  return `${reel.replace(/\/+$/, '')}/embed`;
}

export function InstagramReelsSection({ reels, instagramProfile }: InstagramReelsSectionProps) {
  return (
    <section
      className="relative isolate overflow-hidden border-y border-white/[0.07] bg-ink-soft/45 py-14 sm:py-20 lg:py-24"
      aria-labelledby="instagram-reels-heading"
    >
      <div
        className="pointer-events-none absolute -left-40 top-10 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(255,48,56,0.12),transparent_68%)]"
        aria-hidden="true"
      />
      <div className="shell">
        <SectionHeading
          eyebrow="Apronix in motion"
          title={<span id="instagram-reels-heading">A little scroll. A lot of creativity.</span>}
          description="Meet the people, ideas and behind-the-scenes moments that bring Apronix Tech to life."
          action={
            instagramProfile ? (
              <a
                href={instagramProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-[13px] font-semibold text-white transition hover:border-brand/40 hover:bg-white/[0.05] hover:text-brand-soft"
              >
                <Instagram size={15} aria-hidden="true" />
                Follow along
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ) : undefined
          }
        />

        {reels.length > 0 ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reels.map((reel, index) => (
              <article
                key={reel}
                className="group overflow-hidden rounded-3xl border border-white/[0.09] bg-ink shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-[0_24px_70px_-38px_rgba(255,48,56,0.42)]"
              >
                <div className="relative aspect-[9/12] overflow-hidden bg-[#121318]">
                  <iframe
                    src={reelEmbedUrl(reel)}
                    title={`Apronix Tech Instagram Reel ${index + 1}`}
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] px-4 py-3.5">
                  <span className="inline-flex items-center gap-2 text-[12px] font-medium text-white/75">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-brand/[0.12] text-brand-soft">
                      <Play size={12} fill="currentColor" aria-hidden="true" />
                    </span>
                    From our Instagram
                  </span>
                  <a
                    href={reel}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-9 items-center gap-1 text-[11.5px] font-semibold text-white/60 transition hover:text-brand-soft"
                    aria-label={`Open Apronix Tech Instagram Reel ${index + 1}`}
                  >
                    View on Instagram <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-3xl border border-white/[0.09] bg-ink">
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:p-10">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-soft">
                  <Sparkles size={12} aria-hidden="true" />
                  Behind the scenes
                </span>
                <h3 className="mt-4 text-[22px] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[28px]">
                  Our next story could be your favourite.
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-mute-onDark">
                  We&apos;re getting our Instagram Reels ready for this space. Check back soon for creative moments
                  and a closer look at life at Apronix Tech.
                </p>
                {instagramProfile && (
                  <a
                    href={instagramProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-brand px-5 text-[12.5px] font-semibold text-white transition hover:bg-brand-dark"
                  >
                    <Instagram size={15} aria-hidden="true" />
                    Visit our Instagram
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
              <div className="relative mx-auto grid aspect-[4/5] w-full max-w-[190px] place-items-center overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,48,56,0.24),transparent_56%),linear-gradient(145deg,#191b22,#0b0c0f)] p-5 lg:mx-0">
                <div className="absolute inset-3 rounded-[1.5rem] border border-white/[0.07]" aria-hidden="true" />
                <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-white/[0.06] text-white shadow-[0_0_50px_-15px_rgba(255,48,56,0.65)]">
                  <Play size={22} fill="currentColor" aria-hidden="true" />
                </div>
                <span className="absolute bottom-7 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
                  Reel soon
                </span>
              </div>
            </div>
          </div>
        )}

        <p className="mt-4 text-[11px] leading-relaxed text-white/45">
          Reels are embedded from Instagram. Availability and playback are controlled by Instagram.
          {reels.length === 0 && (
            <>
              {' '}
              Add public Reel links under <Link href="/admin/settings" className="underline underline-offset-2 hover:text-white">Admin settings</Link> to feature them here.
            </>
          )}
        </p>
      </div>
    </section>
  );
}
