import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check, Star } from 'lucide-react';
import { HeroTextRotator } from '@/src/components/site/hero-text-rotator';
import { HeroTechFloaters } from '@/src/components/site/hero-tech-floaters';
import { TechnologySlider } from '@/src/components/site/technology-slider';
import { TeamSection } from '@/src/components/site/team-section';
import {
  CtaBand,
  ProcessTimeline,
  SectionHeading,
  ServiceCards,
  WhyApronix,
} from '@/src/components/site/sections';
import { ProjectCard } from '@/src/components/site/project-card';
import { PostCard } from '@/src/components/site/post-card';
import { Accordion, Reveal } from '@/src/components/ui/accordion';
import { Breadcrumbs } from '@/src/components/site/breadcrumbs';
import {
  getApprovedTestimonials,
  getFaqs,
  getFeaturedProjects,
  getProjects,
  getServices,
  getBlogPosts,
  getPricingPlans,
} from '@/src/lib/content';
import { getSiteSettings } from '@/src/lib/settings';
import { buildMetadata, faqSchema } from '@/src/lib/seo';
import { PAGE_KEYWORDS } from '@/src/lib/keywords';
import { CAPABILITIES } from '@/src/lib/constants';
import { SocialMediaHomeShowcase } from '@/src/components/site/social-media-experience';
import { InstagramReelsSection } from '@/src/components/site/instagram-reels-section';
import { IndustryCarousel } from '@/src/components/site/industry-carousel';
import type { ClientLogo } from '@/src/content/client-logos';

export const metadata: Metadata = buildMetadata({
  title: 'Apronix Tech — Social Media, Shopify & WordPress Development',
  description:
    'Make your brand impossible to ignore. Apronix Tech provides social media management and high-performing Shopify and WordPress website design and development.',
  path: '/',
  keywords: [...PAGE_KEYWORDS.home],
});

export const revalidate = 300;

function ClientLogoRow({ logos, duplicate = false }: { logos: ClientLogo[]; duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className={`flex shrink-0 items-center gap-3 pr-3 ${duplicate ? 'hidden sm:flex' : ''}`}
    >
      {logos.map((logo) => {
        const content = (
          <Image
            src={logo.image}
            alt={duplicate ? '' : `${logo.name} logo`}
            width={180}
            height={80}
            sizes="180px"
            className="h-9 w-auto max-w-[145px] object-contain"
          />
        );
        return (
          <li
            key={`${duplicate ? 'copy-' : ''}${logo.image}`}
            className="flex h-[72px] w-[190px] flex-none items-center justify-center rounded-xl border border-white/[0.09] bg-white px-5 transition duration-300 hover:-translate-y-0.5 hover:border-brand/40 sm:h-[80px]"
          >
            {logo.url ? (
              <a
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={duplicate ? undefined : `${logo.name} website`}
                tabIndex={duplicate ? -1 : undefined}
              >
                {content}
              </a>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ul>
  );
}

function ClientLogoShowcase({ logos }: { logos: ClientLogo[] }) {
  const midpoint = Math.ceil(logos.length / 2);
  const rows = [logos.slice(0, midpoint), logos.slice(midpoint)].filter((row) => row.length > 0);

  return (
    <section
      aria-labelledby="client-work-heading"
      className="overflow-hidden border-y border-white/[0.07] bg-ink-soft/60 py-8 sm:py-10"
    >
      <div className="shell">
        <div className="mb-5 sm:mb-6">
          <div>
            <h2 id="client-work-heading" className="text-[20px] font-semibold text-white sm:text-[23px]">
              Brands that choose Apronix Tech
            </h2>
            <p className="mt-1 max-w-2xl text-[12.5px] leading-relaxed text-white/60 sm:text-[13px]">
              We collaborate with ambitious businesses to create stronger digital experiences and build lasting growth.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {rows.map((row, index) => (
            <div
              key={index}
              className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:overflow-hidden"
            >
              <div className="flex w-max sm:animate-marquee sm:hover:[animation-play-state:paused] motion-reduce:animate-none">
                <ClientLogoRow logos={row} />
                <ClientLogoRow logos={row} duplicate />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [services, featuredProjects, projects, posts, faqs, testimonials, settings, pricingPlans] = await Promise.all([
    getServices(),
    getFeaturedProjects(3),
    getProjects(),
    getBlogPosts({ perPage: 3 }),
    getFaqs(null),
    getApprovedTestimonials(),
    getSiteSettings(),
    getPricingPlans(),
  ]);

  const clientLogos = settings.clientLogos.filter((logo) => logo.enabled);
  const caseStudies = [
    ...featuredProjects,
    ...projects.filter((project) => !featuredProjects.some((featured) => featured.id === project.id)),
  ].slice(0, 3);
  const industryItems =
    services.find((service) => service.key === 'SOCIAL_MEDIA_MANAGEMENT')?.sections.industries ?? [];
  const faqLd = faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })));
  const showTestimonials = settings.showTestimonials && testimonials.length > 0;

  return (
    <>
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}

      {/* ---------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.55]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(255,48,56,0.20),transparent_65%)] blur-2xl"
          aria-hidden="true"
        />
        <div className="shell relative pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
          <div className="mx-auto max-w-5xl text-center">
            <Reveal>
              <p className="eyebrow justify-center">
                <span className="dot" aria-hidden="true" />
                Social · Shopify · WordPress
              </p>
            </Reveal>

            <HeroTechFloaters />

            <Reveal delay={60}>
              <h1 className="mt-3 text-[clamp(1.65rem,9vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-white sm:mt-4 sm:text-display-xl">
                <span className="block">Make your brand</span>
                <HeroTextRotator />
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mx-auto mt-6 max-w-2xl text-[15.5px] leading-relaxed text-mute-onDark text-pretty">
                We help ambitious businesses grow through strategic social media management and
                high-performing Shopify and WordPress websites.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-8 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-brand px-7 text-[14.5px] font-semibold text-white shadow-[0_16px_44px_-18px_rgba(255,48,56,0.95)] transition hover:bg-brand-dark active:scale-[0.99] sm:w-auto"
                >
                  Book a free consultation
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  href="/work"
                  className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full border border-white/15 px-7 text-[14.5px] font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.06] sm:w-auto"
                >
                  Explore our work
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <ul className="mt-9 flex flex-wrap justify-center gap-x-5 gap-y-2.5">
                {['No obligation consultation', 'Clear fixed-fee scopes', 'Reply within one business day'].map(
                  (item) => (
                    <li key={item} className="inline-flex items-center gap-1.5 text-[12.5px] text-white/60">
                      <Check size={13} className="text-brand-soft" aria-hidden="true" />
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {settings.showClients && clientLogos.length > 0 && <ClientLogoShowcase logos={clientLogos} />}

      {/* -------------------------------------------------------------- trust */}
      <section aria-labelledby="capabilities-heading" className="border-y border-white/[0.07] bg-ink-soft/60">
        <div className="shell py-8">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <h2
              id="capabilities-heading"
              className="flex-none text-[11px] font-bold uppercase tracking-[0.18em] text-white/60"
            >
              What we do
            </h2>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
              {CAPABILITIES.slice(0, 6).map((item) => (
                <li key={item} className="text-[13px] font-medium text-white/65">
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="inline-flex min-h-[44px] flex-none items-center gap-1 text-[12.5px] font-semibold text-white transition hover:text-brand-soft sm:min-h-0"
            >
              All services
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ services */}
      <section className="section" aria-labelledby="services-heading">
        <div className="shell">
          <SectionHeading
            eyebrow="Services"
            title={
              <span id="services-heading">
                Three disciplines.
                <br />
                <span className="text-white/65">One coherent presence.</span>
              </span>
            }
            description="Whether people find you in a feed or in search, the experience has to hold together. We handle the strategy, the content and the build."
            action={
              <Link
                href="/services"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-[13.5px] font-semibold text-white transition hover:bg-white/[0.07]"
              >
                Compare services
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            }
          />
          <div className="mt-10">
            <ServiceCards services={services} />
          </div>
        </div>
      </section>

      <SocialMediaHomeShowcase
        service={services.find((service) => service.key === 'SOCIAL_MEDIA_MANAGEMENT')}
        plans={pricingPlans}
      />

      <InstagramReelsSection
        reels={settings.instagramReels}
        instagramProfile={
          settings.socials.find((social) => social.label.trim().toLowerCase() === 'instagram')?.url
        }
      />

      {industryItems.length > 0 && (
        <section
          className="section border-y border-white/[0.07] bg-ink-soft/40"
          aria-labelledby="industries-heading"
        >
          <div className="shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
            <div>
              <p className="eyebrow">
                <span className="dot" aria-hidden="true" />
                Industries we serve
              </p>
              <h2 id="industries-heading" className="mt-4 text-display-md text-white">
                Digital Solutions Across Multiple Industries
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mute-onDark">
                Every industry has a different audience, different challenges, and different growth
                opportunities. We shape creative, marketing, and website strategies around each business.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-brand px-6 text-[13px] font-semibold text-white shadow-[0_12px_34px_-18px_rgba(255,48,56,0.9)] transition hover:bg-brand-dark"
              >
                Let&apos;s grow your business
                <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <IndustryCarousel items={industryItems} />
          </div>
        </section>
      )}

      {/* -------------------------------------------------------- technologies */}
      <section
        className="border-y border-white/[0.07] bg-ink-soft/40 py-14 sm:py-16 lg:py-20"
        aria-labelledby="technology-heading"
      >
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">
              <span className="dot" aria-hidden="true" />
              The toolkit
            </p>
            <h2 id="technology-heading" className="mt-4 text-display-md text-white">
              Built with tools that fit the job.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-mute-onDark sm:text-[15px]">
              From flexible storefronts to easy-to-manage websites, we choose proven platforms
              that make your next step simpler.
            </p>
          </div>

          <div className="mt-8 sm:mt-10">
            <TechnologySlider />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- capabilities */}
      <section className="section border-t border-white/[0.07] bg-ink-soft/40" aria-labelledby="capabilities-title">
        <div className="shell">
          <SectionHeading
            eyebrow="Agency capabilities"
            title={<span id="capabilities-title">Your One-Stop Digital Growth Partner</span>}
            description="From building your online presence to creating engaging content and high-performing websites, Apronix Tech brings strategy, creativity, and technology together."
          />
          <div className="mt-8">
            <WhyApronix />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- case studies */}
      <section className="section" aria-labelledby="work-heading">
          <div className="shell">
            <SectionHeading
              eyebrow="Case studies"
              title={<span id="work-heading">Real Projects. Real Digital Experiences.</span>}
              description="Explore selected digital projects, creative solutions, and website experiences developed to help businesses strengthen their online presence."
              action={
                caseStudies.length > 0 ? (
                  <Link
                    href="/work"
                    className="inline-flex min-h-[44px] items-center gap-2 text-[13.5px] font-semibold text-white transition hover:text-brand-soft"
                  >
                    View all case studies
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                ) : undefined
              }
            />
            {caseStudies.length > 0 ? (
              <div
                className={`mt-8 grid gap-4 ${
                  caseStudies.length > 1 ? 'lg:grid-cols-[1.2fr_0.8fr]' : 'lg:grid-cols-1'
                }`}
              >
                <Link
                  href={`/work/${caseStudies[0].slug}`}
                  aria-label={`View case study: ${caseStudies[0].title}`}
                  className="group relative flex min-h-[390px] flex-col justify-end overflow-hidden rounded-3xl border border-white/[0.08] bg-ink-soft p-6 transition hover:border-brand/40 sm:min-h-[480px] sm:p-8"
                >
                  {caseStudies[0].featuredImage ? (
                    <Image
                      src={caseStudies[0].featuredImage}
                      alt={caseStudies[0].featuredImageAlt || `${caseStudies[0].title} project`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 65vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,48,56,0.24),transparent_35%),linear-gradient(145deg,#191b22,#111318_55%,#3b0c10)]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
                  <div className="relative">
                    <span className="inline-flex rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/85 backdrop-blur">
                      {caseStudies[0].industry || caseStudies[0].categoryLabel}
                    </span>
                    <h3 className="mt-4 max-w-2xl text-[26px] font-semibold leading-tight text-white sm:text-[34px]">
                      {caseStudies[0].title}
                    </h3>
                    <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-white/75 sm:text-[14px]">
                      {caseStudies[0].shortDescription}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-white">
                      View case study
                      <ArrowUpRight
                        size={15}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>

                {caseStudies.length > 1 && (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    {caseStudies.slice(1).map((project, index) => (
                      <Reveal key={project.id} delay={index * 80} as="div">
                        <ProjectCard project={project} index={index + 1} />
                      </Reveal>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-8 rounded-3xl border border-white/[0.08] bg-ink-soft p-6 sm:p-8">
                <p className="max-w-2xl text-[14px] leading-relaxed text-mute-onDark">
                  Approved case studies will appear here when real project details and visuals are ready to publish.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex min-h-[44px] items-center gap-1.5 text-[13px] font-semibold text-white hover:text-brand-soft"
                >
                  Discuss a project
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
      </section>

      <TeamSection />

      {/* ------------------------------------------------------------ process */}
      <section className="section border-t border-white/[0.07] bg-ink-soft/40" aria-labelledby="process-heading">
        <div className="shell">
          <SectionHeading
            eyebrow="How we work"
            title={<span id="process-heading">A process you can plan around</span>}
            description="Six stages, each with a defined output. You always know what is happening now and what comes next."
          />
          <div className="mt-10">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- testimonials */}
      {showTestimonials && (
        <section className="section" aria-labelledby="testimonials-heading">
          <div className="shell">
            <SectionHeading
              eyebrow="Client feedback"
              title={<span id="testimonials-heading">Voices That Speak for Our Work</span>}
              description="Strong partnerships begin with trust. Discover feedback from businesses and people who have experienced our work."
            />
            <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              {testimonials.slice(0, 3).map((t, i) => (
                <Reveal
                  key={t.id}
                  delay={i * 80}
                  className={`card-dark relative flex h-full flex-col overflow-hidden p-6 ${
                    i === 0 ? 'border-brand/20 bg-[radial-gradient(circle_at_top_right,rgba(255,48,56,0.12),transparent_40%),#111318] sm:p-8 lg:row-span-2' : ''
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 -top-8 select-none text-[150px] font-semibold leading-none text-brand/[0.08]"
                  >
                    “
                  </span>
                  {t.rating ? (
                    <div className="relative flex gap-0.5" aria-label={`${t.rating} out of 5`}>
                      {Array.from({ length: t.rating }).map((_, idx) => (
                        <Star key={idx} size={13} className="fill-brand text-brand-soft" aria-hidden="true" />
                      ))}
                    </div>
                  ) : null}
                  <blockquote
                    className={`relative mt-4 flex-1 leading-relaxed text-white/85 ${
                      i === 0 ? 'text-[17px] sm:text-[19px]' : 'text-[14.5px]'
                    }`}
                  >
                    “{t.quote}”
                  </blockquote>
                  <footer className="relative mt-5 border-t border-white/[0.07] pt-4 text-[12.5px]">
                    <span className="font-semibold text-white">{t.authorName}</span>
                    {(t.authorRole || t.company) && (
                      <span className="text-white/65">
                        {t.authorRole ? ` · ${t.authorRole}` : ''}
                        {t.company ? ` · ${t.company}` : ''}
                      </span>
                    )}
                  </footer>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------------- faq */}
      {faqs.length > 0 && (
        <section className="section border-t border-white/[0.07] bg-ink-soft/40" aria-labelledby="faq-heading">
          <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">
                <span className="dot" aria-hidden="true" />
                Questions
              </p>
              <h2 id="faq-heading" className="mt-4 text-display-md text-white">
                Good to know
              </h2>
              <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-mute-onDark">
                Still unsure about something? Ask us directly — we answer plainly, even when the answer
                is “that is not the right fit for us”.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex min-h-[44px] items-center gap-1.5 text-[13.5px] font-semibold text-white transition hover:text-brand-soft sm:min-h-0"
              >
                Ask a question
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
            <Accordion
              items={faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))}
              defaultOpenId={faqs[0]?.id}
            />
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------- blog */}
      {posts.items.length > 0 && (
        <section className="section" aria-labelledby="journal-heading">
          <div className="shell">
            <SectionHeading
              eyebrow="Journal"
              title={<span id="journal-heading">Practical notes on digital growth</span>}
              description="Plain-English writing about social media, storefronts and websites — no recycled listicles."
              action={
                <Link
                  href="/blog"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-[13.5px] font-semibold text-white transition hover:bg-white/[0.07]"
                >
                  Read the blog
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              }
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {posts.items.map((post, index) => (
                <Reveal key={post.slug} delay={index * 80}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />

      <div className="shell pb-10">
        <Breadcrumbs items={[{ name: 'Home', href: '/' }]} className="pt-6" />
      </div>
    </>
  );
}
