import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface ThemeToggleProps {
  className?: string;
}

/**
 * Button that toggles between light and dark mode.
 * Uses sun/moon icons from Lucide React.
 * Accessible: descriptive aria-label, keyboard-focusable.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Aktifkan mode gelap' : 'Aktifkan mode terang'}
      className={`
        relative inline-flex items-center justify-center
        w-11 h-11 rounded-full
        text-[var(--color-text-primary)]
        bg-[var(--color-surface)]
        border border-[var(--color-border)]
        transition-colors duration-300
        hover:bg-[var(--color-primary)] hover:text-white
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2
        ${className ?? ''}
      `}
    >
      {theme === 'light' ? (
        <Moon size={18} aria-hidden="true" />
      ) : (
        <Sun size={18} aria-hidden="true" />
      )}
    </button>
  );
}

export default ThemeToggle;
