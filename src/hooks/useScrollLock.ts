import { useCallback } from 'react';
import { lockPageScroll, unlockPageScroll } from '../utils/scrollLock';

/** @deprecated Use lockPageScroll / unlockPageScroll directly for modals */
export function useScrollLock(locked: boolean) {
  // Kept for any legacy usage — modals use imperative lock now
  void locked;
}

/**
 * Returns onExitComplete handler — unlock scroll after AnimatePresence exit.
 */
export function useModalScrollLock() {
  return useCallback(() => {
    unlockPageScroll();
  }, []);
}

export { lockPageScroll, unlockPageScroll };

export default useScrollLock;
