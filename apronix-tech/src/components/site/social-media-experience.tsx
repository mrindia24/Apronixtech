import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Instagram,
  MessageCircle,
  Play,
  Sparkles,
} from 'lucide-react';
import { Accordion } from '@/src/components/ui/accordion';
import { Breadcrumbs } from '@/src/components/site/breadcrumbs';
import { CtaBand, SectionHeading, ServiceIcon } from '@/src/components/site/sections';
import { EnquiryForm } from '@/src/components/site/enquiry-form';
import { FormSkeleton } from '@/src/components/site/form-skeleton';
import { SocialPortfolioFilter } from '@/src/components/site/social-portfolio-filter';
import type { ProjectListItem, PricingPlanRecord, ServiceRecord } from '@/src/lib/content';
import type { SiteSettings } from '@/src/lib/settings';
import { cn } from '@/src/lib/utils';
import { Suspense } from 'react';
import { SERVICE_SEED } from '@/src/content/services';

const SOCIAL_KEY = 'SOCIAL_MEDIA_MANAGEMENT';
const SOCIAL_MEDIA_SEED = SERVICE_SEED.find((service) => service.key === SOCIAL_KEY);
const INDUSTRY_EXAMPLES = SOCIAL_MEDIA_SEED?.sections.industries ?? [];
const INDUSTRY_NAMES = SOCIAL_MEDIA_SEED?.sections.industryMarquee ?? [];
const SOCIAL_SERVICE_DEFAULTS = SOCIAL_MEDIA_SEED?.sections.socialServices ?? [];
const SOCIAL_WORKFLOW_DEFAULTS = SOCIAL_MEDIA_SEED?.sections.workflow ?? [];

type FAQItem = { id: string; question: string; answer: string };

function industriesFor(service: ServiceRecord) {
  return service.sections.industries?.length ? service.sections.industries : INDUSTRY_EXAMPLES;
}

function marqueeFor(service: ServiceRecord) {
  return service.sections.industryMarquee?.length ? service.sections.industryMarquee : INDUSTRY_NAMES;
}

function socialServicesFor(service: ServiceRecord) {
  return service.sections.socialServices?.length ? service.sections.socialServices : SOCIAL_SERVICE_DEFAULTS;
}

function workflowFor(service: ServiceRecord) {
  return service.sections.workflow?.length === 8 ? service.sections.workflow : SOCIAL_WORKFLOW_DEFAULTS;
}

function IndustryMarquee({ items }: { items: string[] }) {
  return (
    <div className="mask-fade-r mt-8 overflow-hidden" aria-label="Industries we support">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[false, true].map((duplicate) => (
          <ul
            key={String(duplicate)}
            aria-hidden={duplicate || undefined}
            className="flex shrink-0 items-center gap-3 pr-3"
          >
            {items.map((item, index) => (
              <li
                key={`${duplicate ? 'copy-' : ''}${item}-${index}`}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-bold tracking-[0.16em] text-white/70 sm:text-[11px]"
              >
                {item} <span className="ml-1 text-brand-soft" aria-hidden="true">•</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

function IndustryShowcase({ service }: { service: ServiceRecord }) {
  const industries = industriesFor(service);
  return (
    <section className="section border-y border-white/[0.07] bg-ink-soft/40" aria-labelledby="social-industries-heading">
      <div className="shell">
        <SectionHeading
          eyebrow="Industries we serve"
          title={<span id="social-industries-heading">Social Media Solutions for Every Business.</span>}
          description="Whether you're running a café, managing a hotel, growing a healthcare practice, or building a real estate brand, we create social media strategies that match your business goals."
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <article
              key={industry.name}
              className={cn(
                'group rounded-2xl border border-white/[0.08] bg-ink p-5 transition duration-300 hover:-translate-y-1 hover:border-brand/40',
                index === industries.length - 1 && industries.length % 3 === 2 && 'lg:col-span-2',
              )}
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-brand/20 bg-brand/[0.08] text-brand-soft">
                  <ServiceIcon name={industry.icon} className="h-[18px] w-[18px]" />
                </span>
                <h3 className="text-[15px] font-semibold text-white">{industry.name}</h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {industry.examples.map((example) => (
                  <li key={example} className="rounded-full border border-white/[0.08] px-2.5 py-1 text-[11px] text-white/65">
                    {example}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <IndustryMarquee items={marqueeFor(service)} />
      </div>
    </section>
  );
}

function ServicesGrid({ service, compact = false }: { service: ServiceRecord; compact?: boolean }) {
  const items = socialServicesFor(service);
  return (
    <div className={cn('grid gap-3 sm:grid-cols-2', compact ? 'lg:grid-cols-4' : 'lg:grid-cols-4')}>
      {items.map((item, index) => (
        <article
          key={item.title}
          className="group rounded-2xl border border-white/[0.08] bg-ink-soft p-5 transition duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-[#14171d]"
        >
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/[0.09] text-brand-soft transition group-hover:bg-brand/15">
            <ServiceIcon name={item.icon} className="h-[18px] w-[18px]" />
          </span>
          <p className="mt-4 text-[10px] font-bold tracking-[0.18em] text-brand-soft">
            {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-2 text-[14px] font-semibold text-white">{item.title}</h3>
          <p className="mt-2 text-[12.5px] leading-relaxed text-mute-onDark">{item.body}</p>
        </article>
      ))}
    </div>
  );
}

function SocialWorkflow({ service }: { service: ServiceRecord }) {
  const steps = workflowFor(service);
  return (
    <section className="section border-y border-white/[0.07] bg-ink-soft/40" aria-labelledby="social-workflow-heading">
      <div className="shell">
        <SectionHeading
          eyebrow="Our process"
          title={<span id="social-workflow-heading">From Strategy to Scroll-Stopping Content.</span>}
          description="We follow a structured process to make social media management simple, transparent, and effective for your business."
        />
        <ol className="relative mt-9 grid list-none gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.step}
              className="relative rounded-2xl border border-white/[0.08] bg-ink p-5 transition-colors hover:border-brand/30"
            >
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-3 left-8 z-10 h-3 w-px bg-brand/40 sm:hidden"
                />
              )}
              {index % 4 !== 3 && index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-3 top-9 z-10 hidden h-px w-3 bg-brand/40 lg:block"
                />
              )}
              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.17em] text-brand-soft">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-brand/30 bg-brand/[0.08]">
                  {step.step}
                </span>
                STEP {step.step}
              </span>
              <h3 className="mt-4 text-[14px] font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-mute-onDark">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-5 text-[11.5px] leading-relaxed text-white/55">
          The exact workflow, platforms and deliverables depend on your selected package. Content is published only after your approval; revision rounds are agreed in writing.
        </p>
      </div>
    </section>
  );
}

function ClientMarquee({ projects, fallback }: { projects: ProjectListItem[]; fallback: string[] }) {
  const clients = Array.from(
    new Set(
      projects
        .filter((project) => !project.isSampleContent && project.clientName?.trim())
        .map((project) => project.clientName!.trim()),
    ),
  );
  const entries = clients.length ? clients : fallback;
  const isIndustryFallback = clients.length === 0;
  return (
    <section className="overflow-hidden border-b border-white/[0.07] bg-ink-soft/60 py-8" aria-labelledby="social-client-heading">
      <div className="shell">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="social-client-heading" className="text-[14px] font-semibold text-white">
            Brands That Trust Our Creative Approach.
          </h2>
          <p className="text-[11.5px] text-white/55">
            {isIndustryFallback ? 'Industry experience, not a client-logo claim.' : 'Published client names, shown with permission.'}
          </p>
        </div>
        <div className="mask-fade-r mt-5 overflow-hidden">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[false, true].map((duplicate) => (
              <ul
                key={String(duplicate)}
                aria-hidden={duplicate || undefined}
                className="flex shrink-0 items-center gap-3 pr-3"
              >
                {entries.map((name, index) => (
                  <li
                    key={`${duplicate ? 'copy-' : ''}${name}-${index}`}
                    className="flex min-h-[54px] items-center rounded-xl border border-white/[0.08] bg-white/[0.025] px-5 text-[12px] font-bold uppercase tracking-[0.1em] text-white/70"
                  >
                    {isIndustryFallback ? `${name} business` : name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  plan,
  compact = false,
}: {
  plan: PricingPlanRecord;
  compact?: boolean;
}) {
  const price = plan.isSampleContent || !plan.price.trim() ? 'Contact for Pricing' : plan.price;
  const packageHref = `/contact?service=${SOCIAL_KEY}&package=${encodeURIComponent(plan.name)}`;
  const lowerName = plan.name.toLowerCase();
  const fallbackCta = lowerName.includes('premium')
    ? 'Talk to Our Team'
    : lowerName.includes('growth')
      ? 'Choose Growth'
      : 'Get Started';
  const features = plan.isSampleContent ? [] : plan.features.filter((feature) => feature.included);
  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-3xl border p-5 sm:p-6',
        !plan.isSampleContent && plan.highlighted
          ? 'border-brand/45 bg-gradient-to-b from-brand/[0.10] to-ink-soft shadow-[0_30px_80px_-40px_rgba(224,31,39,0.65)]'
          : 'border-white/[0.08] bg-ink-soft',
        compact && 'p-5',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[17px] font-semibold text-white">{plan.name}</h3>
        {!plan.isSampleContent && plan.highlighted && (
          <span className="rounded-full bg-brand px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white">
            Recommended
          </span>
        )}
      </div>
      {!plan.isSampleContent && plan.tagline && (
        <p className="mt-2 text-[12.5px] leading-relaxed text-mute-onDark">{plan.tagline}</p>
      )}
      <div className="mt-5 border-t border-white/[0.07] pt-5">
        <p className="text-[23px] font-bold leading-tight tracking-tight text-white sm:text-[25px]">{price}</p>
        {!plan.isSampleContent && plan.priceNote && (
          <p className="mt-1 text-[12px] text-white/60">{plan.priceNote}</p>
        )}
        {!plan.isSampleContent && plan.billingNote && (
          <p className="mt-2 text-[11px] leading-relaxed text-white/55">{plan.billingNote}</p>
        )}
        {plan.isSampleContent && (
          <p className="mt-2 text-[11px] leading-relaxed text-white/55">
            Confirm the monthly scope and terms with our team.
          </p>
        )}
      </div>
      {features.length > 0 && (
        <ul className="mt-4 space-y-2.5">
          {features.slice(0, compact ? 3 : undefined).map((feature) => (
            <li key={feature.id} className="flex items-start gap-2 text-[12.5px] leading-relaxed text-white/80">
              <Check size={14} className="mt-0.5 flex-none text-brand-soft" aria-hidden="true" />
              {feature.label}
            </li>
          ))}
        </ul>
      )}
      {!plan.isSampleContent && plan.notIncluded.length > 0 && !compact && (
        <p className="mt-4 border-t border-white/[0.07] pt-3 text-[11px] leading-relaxed text-white/55">
          Not included: {plan.notIncluded.join(' · ')}
        </p>
      )}
      <Link
        href={packageHref}
        className={cn(
          'mt-auto inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full text-[13px] font-semibold transition hover:bg-brand-dark',
          !plan.isSampleContent && plan.highlighted ? 'mt-6 bg-brand text-white' : 'mt-6 border border-white/15 text-white hover:bg-white/[0.07]',
        )}
      >
        {plan.isSampleContent ? fallbackCta : plan.ctaLabel || fallbackCta}
        <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </article>
  );
}

function PricingSection({ plans, compact = false }: { plans: PricingPlanRecord[]; compact?: boolean }) {
  const ordered = plans
    .filter((plan) => plan.serviceKey === SOCIAL_KEY)
    .slice(0, 3);
  return (
    <div className="mt-8">
      {ordered.length ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ordered.map((plan) => (
            <PricingCard key={plan.id} plan={plan} compact={compact} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/[0.08] bg-ink-soft p-7 text-center">
          <p className="text-[15px] font-semibold text-white">Package pricing is being finalised.</p>
          <p className="mt-2 text-[13px] text-mute-onDark">Ask us for a scope and current monthly pricing.</p>
        </div>
      )}
      <div className="mt-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 text-center sm:flex-row sm:text-left">
        <p className="text-[13px] text-white/75">Need a customised social media strategy?</p>
        <Link
          href={`/contact?service=${SOCIAL_KEY}`}
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-brand px-5 text-[12.5px] font-semibold text-white transition hover:bg-brand-dark"
        >
          Get a Custom Quote <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
      {!compact && (
        <p className="mt-4 text-[11.5px] leading-relaxed text-white/55">
          Paid advertising budgets, professional on-location shoots, travel and additional revision rounds are scoped separately unless explicitly listed. Confirm platform access, deliverable quantities, revisions and billing terms in the written proposal.
        </p>
      )}
      {!compact && ordered.some((plan) => !plan.isSampleContent) && (
        <div className="mt-8 hidden overflow-x-auto rounded-2xl border border-white/[0.08] lg:block">
          <table className="w-full border-collapse text-left text-[12px]">
            <caption className="sr-only">Social media package feature comparison</caption>
            <thead className="bg-white/[0.035]">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold text-white/75">Deliverable</th>
                {ordered.filter((plan) => !plan.isSampleContent).map((plan) => (
                  <th key={plan.id} scope="col" className="px-4 py-3 font-semibold text-white">{plan.name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.07]">
              {Array.from(new Set(ordered.filter((plan) => !plan.isSampleContent).flatMap((plan) => plan.features.map((feature) => feature.label)))).map((feature) => (
                <tr key={feature}>
                  <th scope="row" className="px-4 py-3 font-medium text-white/70">{feature}</th>
                  {ordered.filter((plan) => !plan.isSampleContent).map((plan) => (
                    <td key={plan.id} className="px-4 py-3 text-white/60">
                      {plan.features.some((item) => item.label === feature && item.included) ? 'Included' : '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!compact && (
        <div className="mt-5 grid gap-3 lg:hidden">
          {ordered.filter((plan) => !plan.isSampleContent).map((plan) => (
            <div key={plan.id} className="rounded-2xl border border-white/[0.08] bg-ink-soft p-4">
              <p className="font-semibold text-white">{plan.name}</p>
              <ul className="mt-2 space-y-1.5 text-[12px] text-white/70">
                {plan.features.map((feature) => (
                  <li key={feature.id} className="flex justify-between gap-3">
                    <span>{feature.label}</span><span>{feature.included ? 'Included' : 'Not included'}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function SocialMediaHomeShowcase({
  service,
  plans,
}: {
  service?: ServiceRecord;
  plans: PricingPlanRecord[];
}) {
  if (!service) return null;
  const serviceHref = `/services/${service.slug}`;
  return (
    <>
      <section className="section overflow-hidden border-y border-white/[0.07] bg-ink-soft/40" aria-labelledby="home-social-heading">
        <div className="shell">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <p className="eyebrow"><span className="dot" aria-hidden="true" />Social Media Management</p>
              <h2 id="home-social-heading" className="mt-4 max-w-2xl text-display-md text-white">
                Your Brand Deserves More Than Just Posting.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-mute-onDark">
                We plan, create, manage, and optimise your social media presence so you can focus on running your business while we take care of your digital growth.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href={serviceHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-[13.5px] font-semibold text-white transition hover:bg-brand-dark">
                  Explore Social Media Services <ArrowRight size={15} aria-hidden="true" />
                </Link>
                <Link href="#home-social-pricing" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-[13.5px] font-semibold text-white transition hover:bg-white/[0.07]">
                  View Pricing <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-white/60">
                {['Strategy-led', 'Content approval before publishing', 'Clear monthly scope'].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5"><Check size={13} className="text-brand-soft" aria-hidden="true" />{item}</span>
                ))}
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[470px]">
              <div className="absolute -inset-8 rounded-full bg-brand/[0.12] blur-3xl" aria-hidden="true" />
              <div className="relative grid grid-cols-[1fr_0.72fr] items-center gap-3 sm:gap-4">
                <article className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#181a20] p-3 shadow-2xl sm:rounded-[1.7rem] sm:p-4">
                  <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand to-[#ff8c56]"><Instagram size={15} /></span>
                    <div className="min-w-0"><p className="truncate text-[11px] font-semibold text-white">yourbrand</p><p className="text-[9px] text-white/50">Content calendar · this month</p></div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-1.5">
                    {['01', '02', '03', '04', '05', '06'].map((item, index) => (
                      <div key={item} className={cn('aspect-square rounded-lg p-2', index % 3 === 0 ? 'bg-gradient-to-br from-[#4b2024] to-brand/70' : index % 3 === 1 ? 'bg-gradient-to-br from-[#252b38] to-[#596a83]' : 'bg-gradient-to-br from-[#302a21] to-[#b88354]')}>
                        <span className="text-[8px] font-bold text-white/70">POST {item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-xl border border-white/[0.08] bg-black/20 p-2.5">
                    <div className="flex items-center justify-between text-[9px] text-white/55"><span>Content plan</span><span className="text-emerald-300">Ready for review</span></div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full w-3/4 rounded-full bg-brand" /></div>
                  </div>
                </article>
                <div className="space-y-3">
                  <div className="relative overflow-hidden rounded-[1.3rem] border border-white/10 bg-gradient-to-br from-[#3d1115] via-brand/80 to-[#f28b62] p-3 shadow-2xl sm:rounded-[1.6rem] sm:p-4">
                    <div className="flex h-24 items-center justify-center rounded-xl border border-white/20 bg-black/20 sm:h-32">
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-black/20"><Play size={16} fill="currentColor" /></span>
                    </div>
                    <p className="mt-2 text-[10px] font-semibold text-white">REEL PREVIEW</p>
                    <p className="text-[9px] text-white/70">Short-form video edit</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#181a20] p-3 shadow-xl sm:p-4">
                    <div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-full bg-white/[0.08]"><MessageCircle size={13} /></span><span className="text-[10px] font-semibold text-white">Community inbox</span></div>
                    <p className="mt-2 text-[9px] leading-relaxed text-white/55">Reply drafted for client review</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-[9px] text-emerald-300"><Sparkles size={10} /> Ready to approve</span>
                  </div>
                </div>
              </div>
              <p className="relative mt-3 text-center text-[10px] text-white/45">Illustrative planning interface — no client results or account metrics implied.</p>
            </div>
          </div>

          <div className="mt-14 border-t border-white/[0.07] pt-10">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">What we manage</p>
                <h3 className="mt-3 text-[22px] font-semibold text-white sm:text-[26px]">One connected social workflow.</h3>
              </div>
              <Link href={serviceHref} className="hidden min-h-10 items-center gap-1.5 text-[12.5px] font-semibold text-white/75 transition hover:text-brand-soft sm:inline-flex">
                All services <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
            <ServicesGrid service={service} compact />
            <Link href={serviceHref} className="mt-5 inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold text-brand-soft sm:hidden">
              Explore all social media services <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <IndustryShowcase service={service} />
      <section className="section" id="home-social-pricing" aria-labelledby="home-social-pricing-heading">
        <div className="shell">
          <SectionHeading
            eyebrow="Monthly packages"
            title={<span id="home-social-pricing-heading">Simple Packages. Clear Deliverables. No Guesswork.</span>}
            description="Choose a social media management package that fits your business goals, content requirements, and growth stage."
            action={<Link href={serviceHref} className="inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold text-white/75 hover:text-brand-soft">View All Packages <ArrowRight size={14} aria-hidden="true" /></Link>}
          />
          <PricingSection plans={plans} compact />
          <Link href={`/contact?service=${SOCIAL_KEY}`} className="mt-5 inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold text-brand-soft">
            Get a Custom Quote <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

export function SocialMediaLandingPage({
  service,
  plans,
  projects,
  faqs,
  settings,
}: {
  service: ServiceRecord;
  plans: PricingPlanRecord[];
  projects: ProjectListItem[];
  faqs: FAQItem[];
  settings: SiteSettings;
}) {
  const realSocialProjects = projects.filter(
    (project) => project.serviceCategory === SOCIAL_KEY && !project.isSampleContent,
  );
  const defaultFaqs = SOCIAL_MEDIA_SEED?.sections.faqs ?? [];
  const faqItems = Array.from(
    new Map(
      [
        ...faqs,
        ...defaultFaqs.map((faq, index) => ({
          id: `default-social-faq-${index}`,
          question: faq.question,
          answer: faq.answer,
        })),
      ].map((faq) => [faq.question.trim().toLowerCase(), faq]),
    ).values(),
  );
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 -top-32 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(255,48,56,0.18),transparent_65%)] blur-2xl" aria-hidden="true" />
        <div className="shell relative py-12 sm:py-16 lg:py-20">
          <Breadcrumbs items={[{ name: 'Home', href: '/' }, { name: 'Services', href: '/services' }, { name: service.shortName, href: `/services/${service.slug}` }]} />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="eyebrow"><span className="dot" aria-hidden="true" />Social Media Management</p>
              <h1 className="mt-5 text-display-lg text-white">{service.heroHeadline}</h1>
              <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-mute-onDark text-pretty">{service.heroDescription}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href={`/contact?service=${SOCIAL_KEY}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-[13.5px] font-semibold text-white transition hover:bg-brand-dark">
                  Book a Free Consultation <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <Link href="#social-pricing" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-[13.5px] font-semibold text-white transition hover:bg-white/[0.07]">
                  View Social Media Packages <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-5 flex items-start gap-2 text-[11.5px] leading-relaxed text-white/60"><Check size={14} className="mt-0.5 flex-none text-brand-soft" aria-hidden="true" />Scope, content quantities and revision terms are confirmed in writing before work begins.</p>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-soft">
              <Image src="/media/service-social.jpg" alt="Social media planning and creative review on a phone and desktop" width={1600} height={1000} priority sizes="(max-width: 1024px) 100vw, 46vw" className="h-auto w-full" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-ink/90 p-4 backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-soft">Plan · create · review · publish</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-white/80">A transparent content rhythm with your approval before anything goes live.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientMarquee
        projects={projects.filter((project) => project.serviceCategory === SOCIAL_KEY)}
        fallback={marqueeFor(service)}
      />
      <IndustryShowcase service={service} />

      <section className="section" aria-labelledby="social-challenges-heading">
        <div className="shell">
          <SectionHeading eyebrow="The challenge" title={<span id="social-challenges-heading">A consistent online presence takes more than occasional posts.</span>} description="A clear social media management process brings planning, production, approvals and publishing into one predictable rhythm." />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(service.sections.problems ?? []).map((problem, index) => (
              <article key={problem.title} className="rounded-2xl border border-white/[0.08] bg-ink-soft p-5">
                <span className="text-[11px] font-bold tracking-[0.16em] text-brand-soft">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-[14px] font-semibold text-white">{problem.title}</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-mute-onDark">{problem.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-y border-white/[0.07] bg-ink-soft/40" aria-labelledby="social-services-heading">
        <div className="shell">
          <SectionHeading eyebrow="What we do" title={<span id="social-services-heading">Social media services, connected from the first idea to the monthly report.</span>} description="A single team can plan, create and manage the content your business needs, with the exact scope confirmed in your package." />
          <div className="mt-8"><ServicesGrid service={service} /></div>
        </div>
      </section>

      <SocialWorkflow service={service} />

      <section className="section" aria-labelledby="social-portfolio-heading">
        <div className="shell">
          <SectionHeading eyebrow="Selected work" title={<span id="social-portfolio-heading">Creative Content That Gives Brands a Voice.</span>} description="Browse only published social work authorised for portfolio display. No sample client claims or unverified campaign metrics." />
          <div className="mt-7"><SocialPortfolioFilter projects={realSocialProjects} /></div>
        </div>
      </section>

      <section className="section border-y border-white/[0.07] bg-ink-soft/40" id="social-pricing" aria-labelledby="social-pricing-heading">
        <div className="shell">
          <SectionHeading eyebrow="Monthly packages" title={<span id="social-pricing-heading">Simple Packages. Clear Deliverables. No Guesswork.</span>} description="Choose a social media management package that fits your business goals, content requirements, and growth stage." />
          <PricingSection plans={plans} />
        </div>
      </section>

      <section className="section" aria-labelledby="social-value-heading">
        <div className="shell grid gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow"><span className="dot" aria-hidden="true" />Why Apronix Tech</p>
            <h2 id="social-value-heading" className="mt-4 text-display-md text-white">More Than Content. A Consistent Brand Experience.</h2>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-mute-onDark">A structured social media partner helps your team stay organised, communicate clearly and make the next content cycle more considered.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              'A stronger, more consistent brand identity',
              'Professional content quality across channels',
              'Clearer audience communication',
              'Structured campaign and content planning',
              'Data-informed improvements using available analytics',
              'More time to focus on business operations',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-ink-soft p-4">
                <Check size={15} className="mt-0.5 flex-none text-brand-soft" aria-hidden="true" />
                <p className="text-[13px] leading-relaxed text-white/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-y border-white/[0.07] bg-ink-soft/40" aria-labelledby="social-faq-heading">
        <div className="shell grid gap-9 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow"><span className="dot" aria-hidden="true" />FAQs</p>
            <h2 id="social-faq-heading" className="mt-4 text-display-md text-white">Questions before you get started.</h2>
            <p className="mt-4 text-[14px] leading-relaxed text-mute-onDark">Clear answers about platforms, approvals, production and monthly scope.</p>
          </div>
          <Accordion items={faqItems} defaultOpenId={faqItems[0]?.id} />
        </div>
      </section>

      <section className="section" id="social-enquiry" aria-labelledby="social-enquiry-heading">
        <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow"><span className="dot" aria-hidden="true" />Start a conversation</p>
            <h2 id="social-enquiry-heading" className="mt-4 text-display-md text-white">Tell us what your brand needs.</h2>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-mute-onDark">Share your business, preferred platforms and priorities. Your enquiry is saved only after the server confirms receipt.</p>
            <Link href="/contact" className="mt-5 inline-flex min-h-11 items-center gap-2 text-[13px] font-semibold text-brand-soft">More ways to contact us <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
          <div className="card-dark p-5 sm:p-7">
            <h3 className="text-[18px] font-semibold text-white">Get a Custom Quote</h3>
            <p className="mt-2 text-[12.5px] leading-relaxed text-mute-onDark">We will review your brief and respond with clear next steps.</p>
            <div className="mt-5">
              <Suspense fallback={<FormSkeleton />}>
                <EnquiryForm defaultService={SOCIAL_KEY} source="SERVICE_PAGE" compact whatsapp={settings.whatsapp} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        headline="Ready to make social media simpler?"
        text="Start with a conversation. We will help you define a practical scope for your business."
        primaryLabel="Start Your Social Media Journey"
        primaryHref={`/contact?service=${SOCIAL_KEY}`}
        secondaryLabel="Explore all services"
        secondaryHref="/services"
      />
    </>
  );
}
