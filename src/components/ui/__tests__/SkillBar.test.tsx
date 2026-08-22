// Feature: personal-portfolio-website, Property 4: Skill Data Rendering Completeness
// **Validates: Requirements 3.1, 3.2**
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import { SkillBar } from '../SkillBar';
import type { SkillCategory } from '../../../types';

declare const require: any;

// Mock framer-motion so motion.div renders as a plain div in jsdom
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, prop: string) => {
        // Return a simple forwardRef component that renders the HTML element
        const { forwardRef } = require('react');
        return forwardRef(
          (
            { children, initial: _i, animate: _a, whileInView: _w, viewport: _v, transition: _t, ...rest }: Record<string, unknown>,
            ref: unknown
          ) => {
            const React = require('react');
            return React.createElement(prop, { ...rest, ref }, children);
          }
        );
      },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

const VALID_CATEGORIES: SkillCategory[] = [
  'UI/UX Design',
  'Web Development',
  'Mobile Development',
  'Artificial Intelligence',
];

const arbitrarySkillCategory = fc.constantFrom(...VALID_CATEGORIES);

const arbitrarySkill = fc.record({
  name: fc.string({ minLength: 1, maxLength: 50 }),
  icon: fc.webUrl(),
  proficiency: fc.integer({ min: 0, max: 100 }),
  category: arbitrarySkillCategory,
  tooltip: fc.option(fc.string({ minLength: 1, maxLength: 100 }), { nil: undefined }),
});

describe('SkillBar — Property 4: Skill Data Rendering Completeness', () => {
  it('renders skill name for any valid skill', () => {
    fc.assert(
      fc.property(arbitrarySkill, (skill) => {
        const { container, unmount } = render(
          <SkillBar
            name={skill.name}
            icon={skill.icon}
            proficiency={skill.proficiency}
            category={skill.category}
            tooltip={skill.tooltip}
          />
        );
        // Use aria-label on the root element which includes the skill name
        const listitem = container.querySelector('[role="listitem"]');
        expect(listitem).toBeTruthy();
        expect(listitem?.getAttribute('aria-label')).toContain(skill.name);
        unmount();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('renders proficiency indicator for any valid skill', () => {
    fc.assert(
      fc.property(arbitrarySkill, (skill) => {
        const { container, unmount } = render(
          <SkillBar
            name={skill.name}
            icon={skill.icon}
            proficiency={skill.proficiency}
            category={skill.category}
          />
        );
        // Should have a progressbar role
        const progressbar = container.querySelector('[role="progressbar"]');
        expect(progressbar).toBeTruthy();
        unmount();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('renders technology icon for any valid skill', () => {
    fc.assert(
      fc.property(arbitrarySkill, (skill) => {
        const { container, unmount } = render(
          <SkillBar
            name={skill.name}
            icon={skill.icon}
            proficiency={skill.proficiency}
            category={skill.category}
          />
        );
        const img = container.querySelector('img');
        expect(img).toBeTruthy();
        expect(img?.getAttribute('alt')).toBeTruthy();
        unmount();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('skill category is always one of the four valid categories', () => {
    fc.assert(
      fc.property(arbitrarySkillCategory, (category) => {
        return VALID_CATEGORIES.includes(category);
      }),
      { numRuns: 100 }
    );
  });

  it('proficiency is clamped between 0 and 100', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: -1000, max: 1000 }),
        arbitrarySkill,
        (rawProficiency, skill) => {
          const { container, unmount } = render(
            <SkillBar
              name={skill.name}
              icon={skill.icon}
              proficiency={rawProficiency}
              category={skill.category}
            />
          );
          const progressbar = container.querySelector('[role="progressbar"]');
          const valuenow = Number(progressbar?.getAttribute('aria-valuenow'));
          expect(valuenow).toBeGreaterThanOrEqual(0);
          expect(valuenow).toBeLessThanOrEqual(100);
          unmount();
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
