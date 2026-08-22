import type { ThemeColors } from '../types';

/**
 * Reads a CSS custom property value from the document root (active theme).
 * @param property - the CSS variable name, e.g. '--color-primary'
 * @returns the computed value as a string, or empty string if not found
 */
export function getCSSVariable(property: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement)
    .getPropertyValue(property)
    .trim();
}

/**
 * Sets a CSS custom property on the document root.
 * @param property - the CSS variable name
 * @param value - the value to set
 */
export function setCSSVariable(property: string, value: string): void {
  if (typeof window === 'undefined') return;
  document.documentElement.style.setProperty(property, value);
}

/**
 * Reads all theme color tokens from the active theme's CSS custom properties.
 * @returns ThemeColors object with all color token values
 */
export function getThemeColors(): ThemeColors {
  return {
    '--color-primary': getCSSVariable('--color-primary'),
    '--color-background': getCSSVariable('--color-background'),
    '--color-surface': getCSSVariable('--color-surface'),
    '--color-text-primary': getCSSVariable('--color-text-primary'),
    '--color-text-secondary': getCSSVariable('--color-text-secondary'),
    '--color-border': getCSSVariable('--color-border'),
  };
}

/**
 * Checks if a CSS variable is defined in the current theme.
 * @param property - the CSS variable name
 * @returns true if the variable has a non-empty value
 */
export function isCSSVariableDefined(property: string): boolean {
  return getCSSVariable(property).length > 0;
}
