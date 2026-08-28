import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useActiveSection } from '../../hooks/useActiveSection';
import { scrollToSection } from '../../utils/scrollUtils';
import { NAV_ITEMS } from '../../types';
import { personalInfo } from '../../data/personal';

/**
 * Sticky navigation bar with:
 * - Logo/name, nav links, ThemeToggle
 * - Backdrop blur when scrolled past Hero
 * - Mobile hamburger menu (< 768px)
 * - Active section highlighting
 */
export function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sectionIds = NAV_ITEMS.map(item => item.id);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-md bg-[var(--color-background)]/90 border-b border-[var(--color-border)]'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Navigasi utama"
      >
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick('hero')}
          className="text-lg font-bold text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          aria-label="Kembali ke beranda"
        >
          {personalInfo.name}
        </button>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
                  activeSection === item.id
                    ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
                }`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side: ThemeToggle + hamburger */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Hamburger button — mobile only */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="md:hidden p-3 rounded-lg text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>
    </header>

      {/* Mobile Menu Container (handles overflow clipping for iOS) */}
      <div 
        className={`fixed inset-0 z-50 overflow-hidden md:hidden pointer-events-none transition-all duration-300 ${
          isMobileMenuOpen ? 'visible' : 'invisible delay-300'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Mobile menu overlay */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile menu sidebar */}
        <div
          id="mobile-menu"
          className={`absolute top-0 right-0 bottom-0 w-72 bg-[var(--color-surface)] border-l border-[var(--color-border)] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col pointer-events-auto ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
            <span className="text-lg font-bold text-[var(--color-text-primary)]">Menu</span>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-background)] transition-colors focus:outline-none"
              aria-label="Tutup menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <ul className="flex flex-col gap-3" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-5 py-4 rounded-xl text-base font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
                      activeSection === item.id
                        ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-sm border border-[var(--color-primary)]/20'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background)]'
                    }`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavigationBar;
