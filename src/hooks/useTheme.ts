import { useState, useEffect } from 'react';
import type { Theme } from '../types';

interface UseThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeReturn {
  // 1. Check localStorage first
  // 2. Fallback to prefers-color-scheme
  // 3. Default to 'light'

  const getInitialTheme = (): Theme => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      // localStorage not available
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // localStorage not available
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}
