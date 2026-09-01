// Feature: personal-portfolio-website, Property 5: Project Card Rendering Completeness
// **Validates: Requirements 4.2**
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import { ProjectCard } from '../ProjectCard';
import type { Project, ProjectCategory } from '../../../types';

// ---------------------------------------------------------------------------
// Mock framer-motion
// Replace every motion.X with a plain HTML element that forwards all standard
// DOM props. Only string tag names are forwarded; Symbol keys are ignored.
// ---------------------------------------------------------------------------
vi.mock('framer-motion', () => {
  const makeMotionComponent = (tag: string) =>
    React.forwardRef<HTMLElement, Record<string, unknown>>(
      (
        {
          children,
          // strip framer-motion-only props
          initial: _i,
          animate: _a,
          whileInView: _w,
          whileHover: _wh,
          viewport: _v,
          transition: _t,
          ...rest
        },
        ref
      ) => React.createElement(tag, { ...rest, ref }, children as React.ReactNode)
    );

  const cache = new Map<string, ReturnType<typeof makeMotionComponent>>();

  const motionProxy = new Proxy(
    {},
    {
      get(_target, prop: string | symbol) {
        if (typeof prop !== 'string') return undefined;
        if (!cache.has(prop)) cache.set(prop, makeMotionComponent(prop));
        return cache.get(prop);
      },
    }
  );

  return {
    motion: motionProxy,
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
  };
});

// ---------------------------------------------------------------------------
// Mock lucide-react
// The installed version of lucide-react does not export a `Github` icon.
// Stub all icons used by ProjectCard so rendering never fails due to missing
// icon exports.
// ---------------------------------------------------------------------------
vi.mock('lucide-react', () => {
  const Icon = ({ size: _s, 'aria-hidden': _ah }: Record<string, unknown>) =>
    React.createElement('svg', { 'data-testid': 'icon' });
  return {
    ExternalLink: Icon,
    Github: Icon,
    Eye: Icon,
  };
});

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------
const VALID_CATEGORIES: ProjectCategory[] = ['Web', 'UI/UX', 'Aplikasi', 'AI'];

/**
 * String with at least one non-whitespace character and no leading/trailing
 * whitespace. This ensures textContent comparisons work correctly since the
 * DOM normalises surrounding whitespace in text nodes.
 */
const visibleString = (minLength = 1, maxLength = 100) =>
  fc
    .string({ minLength, maxLength })
    .filter((s) => s.trim() === s && s.trim().length > 0);

const arbitraryProject = (): fc.Arbitrary<Project> =>
  fc.record({
    id: visibleString(1, 20),
    title: visibleString(1, 100),
    description: visibleString(1, 300),
    fullDescription: visibleString(1, 1000),
    category: fc.constantFrom(...VALID_CATEGORIES),
    thumbnail: fc.webUrl(),
    gallery: fc.array(fc.webUrl(), { minLength: 0, maxLength: 5 }),
    technologies: fc.array(visibleString(1, 30), { minLength: 1, maxLength: 10 }),
    projectUrl: fc.option(fc.webUrl(), { nil: undefined }),
    repoUrl: fc.option(fc.webUrl(), { nil: undefined }),
    impact: visibleString(1, 500),
    learnings: visibleString(1, 500),
    featured: fc.boolean(),
  });

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('ProjectCard — Property 5: Project Card Rendering Completeness', () => {
  it('renders project title for any valid project', () => {
    fc.assert(
      fc.property(arbitraryProject(), (project) => {
        const onOpenModal = vi.fn();
        const { container, unmount } = render(
          <ProjectCard project={project} onOpenModal={onOpenModal} />
        );
        // Query the h3 element directly to avoid ambiguity when title equals
        // description or technology text
        const heading = container.querySelector('h3');
        expect(heading).toBeTruthy();
        expect(heading?.textContent?.trim()).toBe(project.title.trim());
        unmount();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('renders project description for any valid project', () => {
    fc.assert(
      fc.property(arbitraryProject(), (project) => {
        const onOpenModal = vi.fn();
        const { container, unmount } = render(
          <ProjectCard project={project} onOpenModal={onOpenModal} />
        );
        // Query the <p> element directly to avoid ambiguity
        const paragraph = container.querySelector('p');
        expect(paragraph).toBeTruthy();
        expect(paragraph?.textContent?.trim()).toBe(project.description.trim());
        unmount();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('renders thumbnail image with alt text for any valid project', () => {
    fc.assert(
      fc.property(arbitraryProject(), (project) => {
        const onOpenModal = vi.fn();
        const { container, unmount } = render(
          <ProjectCard project={project} onOpenModal={onOpenModal} />
        );
        const img = container.querySelector('img');
        expect(img).toBeTruthy();
        expect(img?.getAttribute('alt')).toBeTruthy();
        expect(img?.getAttribute('alt')?.trim().length).toBeGreaterThan(0);
        unmount();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('renders at least one technology tag for any valid project', () => {
    fc.assert(
      fc.property(arbitraryProject(), (project) => {
        const onOpenModal = vi.fn();
        const { container, unmount } = render(
          <ProjectCard project={project} onOpenModal={onOpenModal} />
        );
        // Technology tags are rendered as <span> elements inside the card body
        const techContainer = container.querySelector('.flex.flex-wrap');
        expect(techContainer).toBeTruthy();
        const spans = techContainer?.querySelectorAll('span');
        expect(spans?.length).toBeGreaterThan(0);
        // First technology should be present in the rendered spans
        const firstTech = project.technologies[0];
        const found = Array.from(spans ?? []).some(
          (s) => s.textContent?.trim() === firstTech.trim()
        );
        expect(found).toBe(true);
        unmount();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('calls onOpenModal when card is clicked', () => {
    fc.assert(
      fc.property(arbitraryProject(), (project) => {
        const onOpenModal = vi.fn();
        const { container, unmount } = render(
          <ProjectCard project={project} onOpenModal={onOpenModal} />
        );
        const card = container.querySelector('[role="button"]');
        card?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(onOpenModal).toHaveBeenCalledWith(project);
        unmount();
        return true;
      }),
      { numRuns: 100 }
    );
  });
});
