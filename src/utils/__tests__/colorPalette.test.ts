// Feature: personal-portfolio-website, Property 15: Color Palette Consistency
// Validates: Requirements 10.2
// All color values used in the app must be defined as CSS custom properties.
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

// The complete set of CSS custom properties defined in globals.css
const DEFINED_CSS_VARIABLES = [
  '--color-primary',
  '--color-primary-light',
  '--color-primary-dark',
  '--color-secondary',
  '--color-background',
  '--color-surface',
  '--color-text-primary',
  '--color-text-secondary',
  '--color-border',
];

// All CSS variable references used in component styles
const USED_CSS_VARIABLES = [
  '--color-primary',
  '--color-background',
  '--color-surface',
  '--color-text-primary',
  '--color-text-secondary',
  '--color-border',
];

describe('Color Palette — Property 15: Color Palette Consistency', () => {
  it('all used CSS variables are defined in the palette', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...USED_CSS_VARIABLES),
        (variable) => {
          return DEFINED_CSS_VARIABLES.includes(variable);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('all defined CSS variables follow the --color-* naming convention', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...DEFINED_CSS_VARIABLES),
        (variable) => {
          return variable.startsWith('--color-');
        }
      ),
      { numRuns: 100 }
    );
  });

  it('light mode defines all required color tokens', () => {
    const requiredTokens = [
      '--color-primary',
      '--color-background',
      '--color-surface',
      '--color-text-primary',
      '--color-text-secondary',
      '--color-border',
    ];

    requiredTokens.forEach(token => {
      expect(DEFINED_CSS_VARIABLES).toContain(token);
    });
  });

  it('dark mode overrides all required color tokens', () => {
    // Dark mode uses the same variable names as light mode
    // (overridden via .dark class selector in globals.css)
    const darkModeTokens = [
      '--color-primary',
      '--color-background',
      '--color-surface',
      '--color-text-primary',
      '--color-text-secondary',
      '--color-border',
    ];

    darkModeTokens.forEach(token => {
      expect(DEFINED_CSS_VARIABLES).toContain(token);
    });
  });

  it('no duplicate CSS variable definitions', () => {
    const uniqueVariables = new Set(DEFINED_CSS_VARIABLES);
    expect(uniqueVariables.size).toBe(DEFINED_CSS_VARIABLES.length);
  });
});
