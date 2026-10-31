'use client';

import { useMemo, useState } from 'react';
import { ProjectCard } from '@/src/components/site/project-card';
import type { ProjectListItem } from '@/src/lib/content';
import { cn } from '@/src/lib/utils';

const CATEGORIES = ['Reels', 'Graphic Posts', 'Carousels', 'Campaigns'] as const;

export function SocialPortfolioFilter({ projects }: { projects: ProjectListItem[] }) {
  const [active, setActive] = useState<string>('All');
  const filters = ['All', ...CATEGORIES];
  const visible = useMemo(
    () =>
      active === 'All'
        ? projects
        : projects.filter((project) => project.categoryLabel.toLowerCase().includes(active.toLowerCase())),
    [active, projects],
  );

  if (!projects.length) {
    return (
      <div className="rounded-3xl border border-dashed border-white/15 bg-ink-soft/50 p-8 text-center sm:p-10">
        <p className="text-[15px] font-semibold text-white">Approved social work will appear here</p>
        <p className="mx-auto mt-2 max-w-lg text-[13.5px] leading-relaxed text-mute-onDark">
          We only publish work authorised for display. In the meantime, our service and workflow sections explain
          what an engagement includes.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div role="group" aria-label="Filter social media work" className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const count =
            filter === 'All'
              ? projects.length
              : projects.filter((project) =>
                  project.categoryLabel.toLowerCase().includes(filter.toLowerCase()),
                ).length;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={active === filter}
              disabled={count === 0}
              className={cn(
                'inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-[13px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-40',
                active === filter
                  ? 'border-brand bg-brand text-white'
                  : 'border-white/15 text-white/70 hover:border-white/30 hover:text-white',
              )}
            >
              {filter}
              <span className="text-[11px] opacity-70">{count}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} project{visible.length === 1 ? '' : 's'} shown
      </p>
      {visible.length > 0 ? (
        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <p className="mt-7 rounded-2xl border border-dashed border-white/12 p-7 text-center text-[13.5px] text-mute-onDark">
          No authorised {active.toLowerCase()} examples are published yet.
        </p>
      )}
    </div>
  );
}
