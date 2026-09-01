// Feature: personal-portfolio-website
// Property 6: Portfolio Filter Correctness — Validates: Requirements 4.6
// Property 7: Minimum Portfolio Count — Validates: Requirements 4.1
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { projects } from '../projects';
import type { Project, ProjectCategory } from '../../types';

const VALID_CATEGORIES: ProjectCategory[] = ['Web', 'UI/UX', 'App', 'AI'];

/**
 * Filter function that mirrors what PortfolioSection will use.
 */
function filterProjects(allProjects: Project[], category: ProjectCategory | 'Semua'): Project[] {
  if (category === 'Semua') return allProjects;
  return allProjects.filter(p => p.category === category);
}

describe('Portfolio — Property 6: Portfolio Filter Correctness', () => {
  it('filtering by a category only returns projects with that category', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...VALID_CATEGORIES),
        (category) => {
          const filtered = filterProjects(projects, category);
          return filtered.every(p => p.category === category);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('filtering by "Semua" returns all projects', () => {
    fc.assert(
      fc.property(
        fc.constant('Semua' as const),
        (filter) => {
          const filtered = filterProjects(projects, filter);
          return filtered.length === projects.length;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('filtered results are a subset of all projects', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...VALID_CATEGORIES),
        (category) => {
          const filtered = filterProjects(projects, category);
          return filtered.every(p => projects.includes(p));
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe('Portfolio — Property 7: Minimum Portfolio Count', () => {
  it('has at least 6 projects in total', () => {
    expect(projects.length).toBeGreaterThanOrEqual(6);
  });

  it('always shows at least 6 projects when "Semua" filter is active', () => {
    fc.assert(
      fc.property(
        fc.constant('Semua' as const),
        (filter) => {
          const filtered = filterProjects(projects, filter);
          return filtered.length >= 6;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('includes a foundation website project (yayasan)', () => {
    const hasYayasan = projects.some(
      p => p.title.toLowerCase().includes('yayasan') || p.description.toLowerCase().includes('yayasan')
    );
    expect(hasYayasan).toBe(true);
  });

  it('includes a kindergarten/PAUD website project', () => {
    const hasTK = projects.some(
      p =>
        p.title.toLowerCase().includes('tk') ||
        p.title.toLowerCase().includes('paud') ||
        p.description.toLowerCase().includes('tk') ||
        p.description.toLowerCase().includes('paud')
    );
    expect(hasTK).toBe(true);
  });
});
