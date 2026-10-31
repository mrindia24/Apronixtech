import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/src/components/ui/accordion';
import { TEAM_MEMBERS, type TeamMember } from '@/src/lib/team';

export function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <Reveal
      as="article"
      delay={index * 70}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-soft shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_60px_-34px_rgba(255,48,56,0.38)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#17191f]">
        <Image
          src={member.image}
          alt={`Portrait of ${member.name}, ${member.role} at Apronix Tech`}
          fill
          sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          style={{ objectPosition: member.position }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />
      </div>
      <div className="relative min-h-[112px] p-3.5 sm:min-h-[120px] sm:p-5">
        <span
          className="absolute left-3.5 top-0 h-[2px] w-8 -translate-y-1/2 bg-brand transition-all duration-300 group-hover:w-12 sm:left-5"
          aria-hidden="true"
        />
        <h3 className="text-[15px] font-bold tracking-[-0.02em] text-white sm:text-[17px]">{member.name}</h3>
        <p className="mt-1.5 text-[11.5px] leading-relaxed text-mute-onDark sm:text-[13px]">{member.role}</p>
        <span className="absolute bottom-4 right-3.5 grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-colors group-hover:border-brand/40 group-hover:text-brand-soft sm:right-5">
          <ArrowUpRight size={14} aria-hidden="true" />
        </span>
      </div>
    </Reveal>
  );
}

export function TeamSection() {
  return (
    <section
      aria-label="Meet the Team at Apronix Tech"
      className="section relative isolate overflow-hidden border-y border-white/[0.07] bg-ink-soft/35"
    >
      <div
        className="pointer-events-none absolute -right-36 top-12 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(255,48,56,0.12),transparent_68%)]"
        aria-hidden="true"
      />
      <div className="shell">
        <div className="relative mb-9 max-w-2xl sm:mb-11">
          <p className="eyebrow">
            <span className="dot" aria-hidden="true" />
            The people behind Apronix
          </p>
          <h2 className="mt-4 text-display-md text-white">
            Meet the Minds
            <br className="sm:hidden" /> Behind the Magic.
          </h2>
          <span
            className="mt-5 block h-[3px] w-20 rounded-full bg-gradient-to-r from-brand to-brand/0 sm:w-28"
            aria-hidden="true"
          />
          <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-mute-onDark sm:text-[15px]">
            Great digital experiences are built by passionate people. Meet the creative thinkers,
            strategists, and technology specialists who bring ideas to life at Apronix Tech.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 max-[359px]:grid-cols-1 sm:gap-5 lg:grid-cols-4">
          {TEAM_MEMBERS.slice(0, 4).map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/team"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-[13.5px] font-semibold text-white shadow-[0_12px_34px_-18px_rgba(255,48,56,0.9)] transition hover:-translate-y-0.5 hover:bg-brand-dark"
          >
            Meet Our Full Team
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <p className="text-[13px] text-mute-onDark">
            Want to work with us?{' '}
            <Link href="/contact" className="font-semibold text-white underline decoration-brand/70 underline-offset-4 transition hover:text-brand-soft">
              Let&apos;s talk.
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
