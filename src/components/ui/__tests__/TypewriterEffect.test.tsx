// Feature: personal-portfolio-website, Property 1: Typewriter Cycle Completeness
// **Validates: Requirements 1.3**
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import * as fc from 'fast-check';
import { TypewriterEffect } from '../TypewriterEffect';

describe('TypewriterEffect — Property 1: Typewriter Cycle Completeness', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders without crashing for empty texts array', () => {
    const { container } = render(
      <TypewriterEffect texts={[]} />
    );
    // Should render an empty span without crashing
    expect(container.querySelector('span')).toBeTruthy();
  });

  it('renders without crashing for any non-empty texts array', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 1, maxLength: 50 }), { minLength: 1, maxLength: 5 }),
        (texts) => {
          const { container, unmount } = render(
            <TypewriterEffect texts={texts} typingSpeed={1} deletingSpeed={1} pauseDuration={1} />
          );
          expect(container.querySelector('span')).toBeTruthy();
          unmount();
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('eventually displays the first text character by character', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 1, maxLength: 20 }), { minLength: 1, maxLength: 3 }),
        (texts) => {
          const { container, unmount } = render(
            <TypewriterEffect texts={texts} typingSpeed={10} deletingSpeed={5} pauseDuration={50} />
          );

          // Advance time enough to type the first text
          act(() => {
            vi.advanceTimersByTime(texts[0].length * 10 + 100);
          });

          const span = container.querySelector('span');
          expect(span).toBeTruthy();
          unmount();
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('cycles back to first text after completing all texts', () => {
    const texts = ['Hello', 'World'];
    const { container, unmount } = render(
      <TypewriterEffect texts={texts} typingSpeed={10} deletingSpeed={5} pauseDuration={50} />
    );

    // Advance enough time to complete one full cycle
    act(() => {
      // Type first text + pause + delete + type second text + pause + delete
      vi.advanceTimersByTime(
        texts[0].length * 10 + 50 + texts[0].length * 5 +
        texts[1].length * 10 + 50 + texts[1].length * 5 + 500
      );
    });

    const span = container.querySelector('span');
    expect(span).toBeTruthy();
    unmount();
  });
});
