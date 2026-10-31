'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { TeamMember } from '@/src/lib/team';

function TeamFace({ member, back = false }: { member: TeamMember; back?: boolean }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden rounded-[2rem] [backface-visibility:hidden] ${
        back ? '[transform:rotateY(180deg)]' : ''
      }`}
    >
      <Image
        src={member.image}
        alt={`${member.name}, ${member.role} at Apronix Tech`}
        fill
        priority={!back}
        sizes="(max-width: 1024px) 72vw, 390px"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        style={{ objectPosition: member.position }}
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent px-5 pb-5 pt-20 sm:px-7 sm:pb-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-soft">Meet the team</p>
        <p className="mt-1 text-xl font-semibold text-white">{member.name}</p>
        <p className="mt-1 text-xs text-white/75">{member.role}</p>
      </div>
    </div>
  );
}

export function TeamHeroCard({ members }: { members: TeamMember[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    if (!resetting) return;

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setResetting(false));
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, [resetting]);

  useEffect(() => {
    if (members.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = window.setInterval(() => {
      setFlipped(true);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [members.length]);

  const currentMember = members[currentIndex];
  const nextMember = members[(currentIndex + 1) % members.length];

  return (
    <div className="relative z-10 mx-auto aspect-[4/4.5] w-[78%] [perspective:1200px]">
      <div
        className={`group relative h-full w-full rounded-[2rem] border border-white/10 bg-ink-soft shadow-[0_35px_90px_-40px_rgba(255,48,56,0.4)] [transform-style:preserve-3d] ${
          resetting ? 'transition-none' : 'transition-transform duration-700'
        }`}
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        onTransitionEnd={(event) => {
          if (event.target !== event.currentTarget || event.propertyName !== 'transform' || !flipped) return;
          setCurrentIndex((index) => (index + 1) % members.length);
          setFlipped(false);
          setResetting(true);
        }}
      >
        <TeamFace member={currentMember} />
        <TeamFace member={nextMember} back />
      </div>
    </div>
  );
}
