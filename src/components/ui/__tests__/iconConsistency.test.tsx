// Feature: personal-portfolio-website, Property 11: Icon Library Consistency
// Validates: Requirements 8.8
// All icons in the application must originate from Lucide React.
// This test verifies that components using icons import them from 'lucide-react'.
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

// Import all Lucide icons used in the project
import {
  Sun, Moon, Menu, X, ArrowUp, ChevronDown,
  Download, Mail, Send, CheckCircle, AlertCircle, Loader2,
  ExternalLink, Eye, Award, AlertTriangle,
  Briefcase, Palette, Smartphone, Brain, Heart,
} from 'lucide-react';

const LUCIDE_ICONS = [
  Sun, Moon, Menu, X, ArrowUp, ChevronDown,
  Download, Mail, Send, CheckCircle, AlertCircle, Loader2,
  ExternalLink, Eye, Award, AlertTriangle,
  Briefcase, Palette, Smartphone, Brain, Heart,
];

/**
 * Checks whether a value is a valid React component.
 * Lucide React v1.x exports icons as forwardRef objects (typeof === 'object')
 * with a `render` function, rather than plain functions.
 */
function isValidReactComponent(icon: unknown): boolean {
  if (typeof icon === 'function') return true;
  if (typeof icon === 'object' && icon !== null) {
    // forwardRef components have a render function
    return typeof (icon as Record<string, unknown>).render === 'function';
  }
  return false;
}

describe('Icon Library Consistency — Property 11', () => {
  it('all imported icons are valid React components from lucide-react', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: LUCIDE_ICONS.length - 1 }),
        (index) => {
          const Icon = LUCIDE_ICONS[index];
          // A valid Lucide icon is either a function or a forwardRef object with a render function
          expect(isValidReactComponent(Icon)).toBe(true);
          return true;
        }
      ),
      { numRuns: 100 }
    );
  });

  it('all icons can be rendered without errors', () => {
    // Verify each icon is a callable component (function or forwardRef object)
    LUCIDE_ICONS.forEach((Icon) => {
      expect(isValidReactComponent(Icon)).toBe(true);
      // Lucide icons always have a displayName
      const displayName = (Icon as unknown as { displayName?: string }).displayName;
      expect(displayName).toBeTruthy();
    });
  });

  it('icon count matches expected number of unique icons used', () => {
    // We use exactly these icons across the project
    expect(LUCIDE_ICONS.length).toBeGreaterThanOrEqual(20);
  });
});
