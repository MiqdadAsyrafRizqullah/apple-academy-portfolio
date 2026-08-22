// Feature: personal-portfolio-website, Property 10: Theme Toggle Correctness
// **Validates: Requirements 7.2, 7.3, 7.4**
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import * as fc from 'fast-check';
import { useTheme } from '../useTheme';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useTheme — Property 10: Theme Toggle Correctness', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.classList.remove('dark');
  });

  it('toggleTheme always produces the opposite theme', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark') as fc.Arbitrary<'light' | 'dark'>,
        (initialTheme) => {
          localStorageMock.setItem('theme', initialTheme);
          document.documentElement.classList.toggle('dark', initialTheme === 'dark');

          const { result } = renderHook(() => useTheme());
          expect(result.current.theme).toBe(initialTheme);

          act(() => {
            result.current.toggleTheme();
          });

          const expectedTheme = initialTheme === 'light' ? 'dark' : 'light';
          expect(result.current.theme).toBe(expectedTheme);
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('toggleTheme updates document.documentElement class', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark') as fc.Arbitrary<'light' | 'dark'>,
        (initialTheme) => {
          localStorageMock.setItem('theme', initialTheme);

          const { result } = renderHook(() => useTheme());

          act(() => {
            result.current.toggleTheme();
          });

          const expectedTheme = initialTheme === 'light' ? 'dark' : 'light';
          if (expectedTheme === 'dark') {
            expect(document.documentElement.classList.contains('dark')).toBe(true);
          } else {
            expect(document.documentElement.classList.contains('dark')).toBe(false);
          }
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('toggleTheme persists new theme to localStorage', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark') as fc.Arbitrary<'light' | 'dark'>,
        (initialTheme) => {
          localStorageMock.setItem('theme', initialTheme);

          const { result } = renderHook(() => useTheme());

          act(() => {
            result.current.toggleTheme();
          });

          const expectedTheme = initialTheme === 'light' ? 'dark' : 'light';
          expect(localStorageMock.getItem('theme')).toBe(expectedTheme);
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('double toggle returns to original theme', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark') as fc.Arbitrary<'light' | 'dark'>,
        (initialTheme) => {
          localStorageMock.setItem('theme', initialTheme);

          const { result } = renderHook(() => useTheme());

          act(() => { result.current.toggleTheme(); });
          act(() => { result.current.toggleTheme(); });

          expect(result.current.theme).toBe(initialTheme);
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
