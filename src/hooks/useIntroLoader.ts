import { useCallback, useState } from 'react';
/**
 * Controls full-screen intro overlay (shown on every page load).
 */
export function useIntroLoader() {
  const [showIntro, setShowIntro] = useState(true);

  const completeIntro = useCallback(() => {
    setShowIntro(false);
  }, []);

  const skipIntro = useCallback(() => {
    setShowIntro(false);
  }, []);

  return { showIntro, completeIntro, skipIntro };
}

export default useIntroLoader;
