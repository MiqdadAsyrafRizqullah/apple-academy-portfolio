// Feature: personal-portfolio-website, Property 14: Counting Animation Correctness
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import * as fc from 'fast-check';
import { useCountingAnimation } from '../useCountingAnimation';

describe('useCountingAnimation — Property 14: Counting Animation Correctness', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('starts at 0 for any valid non-negative integer target', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10000 }),
        (target) => {
          const { result } = renderHook(() =>
            useCountingAnimation(target, 2000, true)
          );
          // Before any animation frames, value should be 0
          expect(result.current).toBe(0);
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('ends at exactly target after animation completes', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 10000 }),
        (target) => {
          const { result } = renderHook(() =>
            useCountingAnimation(target, 100, true)
          );

          act(() => {
            vi.advanceTimersByTime(200);
          });

          expect(result.current).toBe(target);
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('duration is capped at 2000ms regardless of input', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 100 }),
        fc.integer({ min: 2001, max: 10000 }),
        (target, duration) => {
          const { result } = renderHook(() =>
            useCountingAnimation(target, duration, true)
          );

          act(() => {
            vi.advanceTimersByTime(2000);
          });

          expect(result.current).toBe(target);
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('returns 0 immediately when isActive is false', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10000 }),
        (target) => {
          const { result } = renderHook(() =>
            useCountingAnimation(target, 2000, false)
          );
          expect(result.current).toBe(0);
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
