'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ServiceIcon } from '@/src/components/site/sections';

type Industry = {
  name: string;
  examples: string[];
  icon: string;
  image?: string;
};

function isLocalIndustryImage(value: string | undefined): value is string {
  return Boolean(value && /^\/(?:uploads|media)\/(?:[A-Za-z0-9._-]|%20|%26)+$/.test(value));
}

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

export function IndustryCarousel({ items }: { items: Industry[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function move(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: scrollBehavior() });
  }

  function goTo(index: number) {
    const track = trackRef.current;
    const card = track?.querySelectorAll<HTMLElement>('[data-industry-card]')[index];
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft, behavior: scrollBehavior() });
  }

  return (
    <div className="min-w-0">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-[12px] text-white/55">Explore the industries we work with</p>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous industries"
            onClick={() => move(-1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition hover:border-brand/50 hover:bg-brand/10"
          >
            <ArrowLeft size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next industries"
            onClick={() => move(1)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white transition hover:border-brand/50 hover:bg-brand/10"
          >
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-label="Industry categories"
        tabIndex={0}
        className="relative flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4"
      >
        {items.map((industry, index) => (
          <article
            key={industry.name}
            data-industry-card
            className="group relative min-h-[300px] w-[84%] flex-none snap-start overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-soft p-5 transition duration-300 hover:-translate-y-1 hover:border-brand/35 sm:w-[calc(50%-0.5rem)] sm:p-6"
          >
            {isLocalIndustryImage(industry.image) && (
              <Image
                src={industry.image}
                alt=""
                fill
                sizes="(max-width: 640px) 84vw, 40vw"
                className="object-cover opacity-20 transition duration-500 group-hover:scale-[1.04] group-hover:opacity-30"
              />
            )}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_12%,rgba(255,48,56,0.2),transparent_38%),linear-gradient(145deg,rgba(8,9,11,0.85),rgba(8,9,11,0.55)_55%,rgba(8,9,11,0.92))]"
            />
            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-14 w-14 place-items-center rounded-2xl border border-brand/20 bg-brand/[0.08] text-brand-soft transition-transform duration-300 group-hover:scale-105">
                  <ServiceIcon name={industry.icon} className="h-6 w-6" />
                </span>
                <span className="text-[11px] font-bold tracking-[0.16em] text-white/40">
                  0{index + 1}
                </span>
              </div>
              <h3 className="mt-7 text-[18px] font-semibold text-white">{industry.name}</h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-white/60">
                Digital experiences shaped around the people and needs in this space.
              </p>
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                {industry.examples.slice(0, 4).map((example) => (
                  <li
                    key={example}
                    className="rounded-full border border-white/[0.09] bg-black/10 px-2.5 py-1 text-[10.5px] text-white/70"
                  >
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2" role="group" aria-label="Choose an industry">
        {items.map((industry, index) => (
          <button
            key={industry.name}
            type="button"
            aria-label={`Show ${industry.name}`}
            onClick={() => goTo(index)}
            className="h-2 w-2 rounded-full bg-white/25 transition hover:bg-brand focus-visible:bg-brand"
          />
        ))}
      </div>
    </div>
  );
}
