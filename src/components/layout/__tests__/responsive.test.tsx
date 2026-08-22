// Feature: personal-portfolio-website, Property 3: Responsive Layout at All Breakpoints
// Validates: Requirements 9.1, 9.3
import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import { NavigationBar } from '../NavigationBar';

// Mock all hooks and dependencies
vi.mock('../../../hooks/useActiveSection', () => ({
  useActiveSection: () => 'hero',
}));

vi.mock('../../../hooks/useTheme', () => ({
  useTheme: () => ({ theme: 'light', toggleTheme: vi.fn() }),
}));

vi.mock('../../../utils/scrollUtils', () => ({
  scrollToSection: vi.fn(),
}));

vi.mock('../../../data/personal', () => ({
  personalInfo: {
    name: 'Rafly',
    social: { linkedin: '#', github: '#', instagram: '#' },
  },
}));

vi.mock('lucide-react', () => {
  const Icon = () => React.createElement('svg', { 'data-testid': 'icon' });
  return { Menu: Icon, X: Icon, Sun: Icon, Moon: Icon };
});

const BREAKPOINTS = [320, 768, 1024, 1440];

describe('NavigationBar — Property 3: Responsive Layout', () => {
  let originalInnerWidth: number;

  beforeEach(() => {
    originalInnerWidth = window.innerWidth;
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
  });

  it('renders at all defined breakpoints without crashing', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...BREAKPOINTS),
        (width) => {
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: width,
          });

          const { container, unmount } = render(<NavigationBar />);
          expect(container.querySelector('header')).toBeTruthy();
          expect(container.querySelector('nav')).toBeTruthy();
          unmount();
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('hamburger button is present in the DOM at all breakpoints', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...BREAKPOINTS),
        (width) => {
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: width,
          });

          const { container, unmount } = render(<NavigationBar />);
          // Hamburger button should always be in the DOM (hidden via CSS on desktop)
          const hamburger = container.querySelector('[aria-controls="mobile-menu"]');
          expect(hamburger).toBeTruthy();
          unmount();
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('nav landmark is always present', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...BREAKPOINTS),
        (width) => {
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: width,
          });

          const { container, unmount } = render(<NavigationBar />);
          const nav = container.querySelector('nav[aria-label]');
          expect(nav).toBeTruthy();
          unmount();
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
