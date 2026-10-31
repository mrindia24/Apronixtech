'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const technologies = [
  {
    name: 'Shopify',
    category: 'E-commerce',
    description: 'Flexible online stores built to sell.',
    icon: '/technology-icons/shopify.svg',
  },
  {
    name: 'WordPress',
    category: 'Websites & CMS',
    description: 'Content-managed sites made for your team.',
    icon: '/technology-icons/wordpress.svg',
  },
  {
    name: 'Elementor',
    category: 'WordPress builder',
    description: 'Flexible page building for easier updates.',
    icon: '/technology-icons/elementor.svg',
  },
  {
    name: 'Tailwind CSS',
    category: 'UI framework',
    description: 'Responsive interfaces with a consistent system.',
    icon: '/technology-icons/tailwindcss.svg',
  },
];

export function TechnologySlider() {
  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = () => {
    const rail = railRef.current;
    if (!rail) return;
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    setProgress(maxScroll > 0 ? rail.scrollLeft / maxScroll : 0);
  };

  const scroll = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    rail.scrollBy({
      left: direction * rail.clientWidth * 0.82,
      behavior: reducedMotion ? 'instant' : 'smooth',
    });
  };

  return (
    <div role="region" aria-label="Technology slider" aria-roledescription="carousel">
      <div className="-mx-5 sm:mx-0">
        <div
          ref={railRef}
          onScroll={updateProgress}
          className="no-scrollbar flex touch-pan-x snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-5 pb-2 sm:gap-4 sm:px-0"
        >
          {technologies.map((technology) => (
            <article
              key={technology.name}
              aria-label={`${technology.name}: ${technology.description}`}
              className="group relative flex min-h-[188px] w-[82%] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.09] bg-ink-soft p-4 transition duration-300 active:scale-[0.99] hover:border-brand/40 sm:min-h-[205px] sm:w-auto sm:basis-[calc(50%-0.5rem)] sm:p-6 lg:basis-[calc(33.333%-0.667rem)] lg:hover:-translate-y-1 lg:hover:shadow-[0_18px_48px_-28px_rgba(224,31,39,0.65)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand/[0.07] blur-2xl transition group-hover:bg-brand/[0.16]"
              />
              <div className="relative flex items-start justify-between gap-3">
                <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/[0.045]">
                  <Image
                    src={technology.icon}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain brightness-0 invert"
                    aria-hidden="true"
                  />
                </span>
                <span className="rounded-full border border-white/[0.09] px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-white/55 sm:px-2.5 sm:text-[10px] sm:tracking-[0.12em]">
                  {technology.category}
                </span>
              </div>
              <div className="relative mt-6">
                <h3 className="text-[16px] font-semibold text-white sm:text-[17px]">
                  {technology.name}
                </h3>
                <p className="mt-1.5 text-[11px] leading-relaxed text-white/60 sm:text-[12px]">
                  {technology.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3">
          <div
            role="progressbar"
            aria-label="Slider position"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            className="h-1 w-full max-w-36 overflow-hidden rounded-full bg-white/10"
          >
            <div
              className="h-full rounded-full bg-brand transition-[width] duration-200"
              style={{ width: `${Math.max(14, progress * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-white/55 sm:text-[12px]">
            <span className="sm:hidden">Swipe to explore</span>
            <span className="hidden sm:inline">Explore the toolkit</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            disabled={progress <= 0.01}
            aria-label="Previous technologies"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-brand/50 hover:bg-white/[0.06] disabled:pointer-events-none disabled:opacity-35"
          >
            <ArrowLeft size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            disabled={progress >= 0.99}
            aria-label="Next technologies"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:border-brand/50 hover:bg-white/[0.06] disabled:pointer-events-none disabled:opacity-35"
          >
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
