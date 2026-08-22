let lockCount = 0;
let savedScrollY = 0;
let savedFocus: HTMLElement | null = null;

/**
 * Freeze page at current scroll position (call synchronously before opening modal).
 */
export function lockPageScroll(): void {
  if (lockCount === 0) {
    savedFocus = document.activeElement as HTMLElement | null;
    savedScrollY = window.scrollY;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const { style } = document.body;

    document.documentElement.classList.add('modal-scroll-lock');
    document.documentElement.style.scrollBehavior = 'auto';

    style.position = 'fixed';
    style.top = `-${savedScrollY}px`;
    style.left = '0';
    style.right = '0';
    style.width = '100%';
    style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      style.paddingRight = `${scrollbarWidth}px`;
    }
  }
  lockCount += 1;
}

function applyUnlock(): void {
  const y = savedScrollY;
  const { style } = document.body;

  style.position = '';
  style.top = '';
  style.left = '';
  style.right = '';
  style.width = '';
  style.overflow = '';
  style.paddingRight = '';

  document.documentElement.style.scrollBehavior = 'auto';
  window.scrollTo(0, y);

  requestAnimationFrame(() => {
    if (Math.abs(window.scrollY - y) > 2) {
      window.scrollTo(0, y);
    }
    document.documentElement.classList.remove('modal-scroll-lock');
    try {
      savedFocus?.focus({ preventScroll: true });
    } catch {
      savedFocus?.focus();
    }
  });
}

/**
 * Restore scroll position instantly (call after modal exit animation).
 */
export function unlockPageScroll(): void {
  if (lockCount <= 0) return;
  lockCount = 0;
  applyUnlock();
}

/** Safety reset if exit callback did not run */
export function forceUnlockPageScroll(): void {
  lockCount = 0;
  applyUnlock();
}
