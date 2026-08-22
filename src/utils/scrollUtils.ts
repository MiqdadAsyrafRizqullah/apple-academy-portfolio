/**
 * Smoothly scrolls to a section by its ID.
 * @param id - the ID of the target section element
 */
export function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Smoothly scrolls to the top of the page.
 */
export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
