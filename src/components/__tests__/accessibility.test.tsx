// Feature: personal-portfolio-website, Property 12: Accessibility Properties
// Validates: Requirements 11.2, 11.3, 11.4
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import { ProjectCard } from '../ui/ProjectCard';
import { CertificateCard } from '../ui/CertificateCard';
import type { Project, Certificate, ProjectCategory } from '../../types';

// Mock framer-motion
vi.mock('framer-motion', () => {
  const makeMotionComponent = (tag: string) =>
    React.forwardRef<HTMLElement, Record<string, unknown>>(
      ({ children, initial: _i, animate: _a, whileInView: _w, whileHover: _wh, viewport: _v, transition: _t, ...rest }, ref) =>
        React.createElement(tag, { ...rest, ref }, children as React.ReactNode)
    );
  const cache = new Map<string, ReturnType<typeof makeMotionComponent>>();
  const motionProxy = new Proxy({}, {
    get(_t, prop: string | symbol) {
      if (typeof prop !== 'string') return undefined;
      if (!cache.has(prop)) cache.set(prop, makeMotionComponent(prop));
      return cache.get(prop);
    },
  });
  return {
    motion: motionProxy,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
  };
});

vi.mock('lucide-react', () => {
  const Icon = () => React.createElement('svg', { 'data-testid': 'icon' });
  return { ExternalLink: Icon, Github: Icon, Eye: Icon, Award: Icon };
});

const VALID_CATEGORIES: ProjectCategory[] = ['Web', 'UI/UX', 'Aplikasi', 'AI'];

const visibleString = (min = 1, max = 100) =>
  fc.string({ minLength: min, maxLength: max }).filter(s => s.trim() === s && s.trim().length > 0);

const arbitraryProject = (): fc.Arbitrary<Project> =>
  fc.record({
    id: visibleString(1, 20),
    title: visibleString(1, 100),
    description: visibleString(1, 300),
    fullDescription: visibleString(1, 1000),
    category: fc.constantFrom(...VALID_CATEGORIES),
    thumbnail: fc.webUrl(),
    gallery: fc.array(fc.webUrl(), { minLength: 0, maxLength: 3 }),
    technologies: fc.array(visibleString(1, 30), { minLength: 1, maxLength: 5 }),
    projectUrl: fc.option(fc.webUrl(), { nil: undefined }),
    repoUrl: fc.option(fc.webUrl(), { nil: undefined }),
    challenges: visibleString(1, 200),
    solutions: visibleString(1, 200),
    featured: fc.boolean(),
  });

const arbitraryCertificate = (): fc.Arbitrary<Certificate> =>
  fc.record({
    id: visibleString(1, 20),
    name: visibleString(1, 100),
    issuer: visibleString(1, 100),
    year: fc.integer({ min: 2000, max: 2030 }),
    image: fc.webUrl(),
    verificationUrl: fc.option(fc.webUrl(), { nil: undefined }),
    featured: fc.boolean(),
  });

describe('Accessibility — Property 12: All images have non-empty alt text', () => {
  it('ProjectCard: all img elements have non-empty alt text', () => {
    fc.assert(
      fc.property(arbitraryProject(), (project) => {
        const { container, unmount } = render(
          <ProjectCard project={project} onOpenModal={vi.fn()} />
        );
        const images = container.querySelectorAll('img');
        const allHaveAlt = Array.from(images).every(
          img => img.getAttribute('alt') !== null && img.getAttribute('alt')!.trim().length > 0
        );
        expect(allHaveAlt).toBe(true);
        unmount();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('CertificateCard: all img elements have non-empty alt text', () => {
    fc.assert(
      fc.property(arbitraryCertificate(), (cert) => {
        const { container, unmount } = render(
          <CertificateCard certificate={cert} onOpenLightbox={vi.fn()} />
        );
        const images = container.querySelectorAll('img');
        const allHaveAlt = Array.from(images).every(
          img => img.getAttribute('alt') !== null && img.getAttribute('alt')!.trim().length > 0
        );
        expect(allHaveAlt).toBe(true);
        unmount();
        return true;
      }),
      { numRuns: 100 }
    );
  });
});

describe('Accessibility — Property 12: Interactive elements are keyboard-focusable', () => {
  it('ProjectCard: root element has tabIndex', () => {
    fc.assert(
      fc.property(arbitraryProject(), (project) => {
        const { container, unmount } = render(
          <ProjectCard project={project} onOpenModal={vi.fn()} />
        );
        const interactive = container.querySelector('[role="button"]');
        expect(interactive).toBeTruthy();
        const tabIndex = interactive?.getAttribute('tabindex');
        expect(tabIndex).not.toBeNull();
        expect(Number(tabIndex)).toBeGreaterThanOrEqual(0);
        unmount();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('CertificateCard: root element has tabIndex', () => {
    fc.assert(
      fc.property(arbitraryCertificate(), (cert) => {
        const { container, unmount } = render(
          <CertificateCard certificate={cert} onOpenLightbox={vi.fn()} />
        );
        const interactive = container.querySelector('[role="button"]');
        expect(interactive).toBeTruthy();
        const tabIndex = interactive?.getAttribute('tabindex');
        expect(tabIndex).not.toBeNull();
        expect(Number(tabIndex)).toBeGreaterThanOrEqual(0);
        unmount();
        return true;
      }),
      { numRuns: 100 }
    );
  });
});

describe('Accessibility — Property 12: Interactive elements have aria-label or semantic role', () => {
  it('ProjectCard: root button has aria-label', () => {
    fc.assert(
      fc.property(arbitraryProject(), (project) => {
        const { container, unmount } = render(
          <ProjectCard project={project} onOpenModal={vi.fn()} />
        );
        const button = container.querySelector('[role="button"]');
        expect(button?.getAttribute('aria-label')).toBeTruthy();
        unmount();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('CertificateCard: root button has aria-label', () => {
    fc.assert(
      fc.property(arbitraryCertificate(), (cert) => {
        const { container, unmount } = render(
          <CertificateCard certificate={cert} onOpenLightbox={vi.fn()} />
        );
        const button = container.querySelector('[role="button"]');
        expect(button?.getAttribute('aria-label')).toBeTruthy();
        unmount();
        return true;
      }),
      { numRuns: 100 }
    );
  });
});
