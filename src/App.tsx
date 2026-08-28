// Framer Motion automatically respects prefers-reduced-motion globally.
// The CSS rule in globals.css provides an additional layer for non-Framer animations.
import { createContext, useContext } from 'react';
import { useTheme } from './hooks/useTheme';
import { useIntroLoader } from './hooks/useIntroLoader';
import './styles/globals.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { NavigationBar } from './components/layout/NavigationBar';
import { ScrollProgressIndicator } from './components/layout/ScrollProgressIndicator';
import { CustomCursor } from './components/layout/CustomCursor';
import { BackToTopButton } from './components/layout/BackToTopButton';
import { Footer } from './components/layout/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { PortfolioSection } from './components/sections/PortfolioSection';
import { CertificateSection } from './components/sections/CertificateSection';
import { ContactSection } from './components/sections/ContactSection';
import type { Theme } from './types';
import { SectionReveal } from './components/ui/SectionReveal';
import { PortfolioIntroLoader } from './components/loading/PortfolioIntroLoader';

// Theme context
interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => {},
});

export function useThemeContext() {
  return useContext(ThemeContext);
}

/**
 * Root App component.
 * - Provides ThemeContext to the entire app
 * - Assembles all layout and section components
 * - Wraps each section in ErrorBoundary
 */
function App() {
  const { theme, toggleTheme } = useTheme();
  const { showIntro, completeIntro, skipIntro } = useIntroLoader();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {showIntro && (
        <PortfolioIntroLoader onComplete={completeIntro} onSkip={skipIntro} />
      )}

      <div className={`relative min-h-screen overflow-x-hidden ${showIntro ? 'hidden' : ''}`} aria-hidden={showIntro}>
        {/* Custom cursor (desktop only) */}
        <CustomCursor />

        {/* Scroll progress bar */}
        <ScrollProgressIndicator />

        {/* Navigation */}
        <NavigationBar />

        {/* Main content */}
        <main id="main-content">
          <ErrorBoundary sectionName="Hero">
            <SectionReveal variant="slide-up" delay={0.1}>
              <HeroSection />
            </SectionReveal>
          </ErrorBoundary>

          <ErrorBoundary sectionName="Tentang">
            <SectionReveal variant="split" delay={0}>
              <AboutSection />
            </SectionReveal>
          </ErrorBoundary>

          <ErrorBoundary sectionName="Keahlian">
            <SectionReveal variant="curtain-down" delay={0.05}>
              <SkillsSection />
            </SectionReveal>
          </ErrorBoundary>

          <ErrorBoundary sectionName="Portofolio">
            <SectionReveal variant="fan-left" delay={0.05}>
              <PortfolioSection />
            </SectionReveal>
          </ErrorBoundary>

          <ErrorBoundary sectionName="Sertifikat">
            <SectionReveal variant="tilt-3d" delay={0.05}>
              <CertificateSection />
            </SectionReveal>
          </ErrorBoundary>

          <ErrorBoundary sectionName="Kontak">
            <SectionReveal variant="glow-up" delay={0.05}>
              <ContactSection />
            </SectionReveal>
          </ErrorBoundary>
        </main>

        {/* Footer */}
        <Footer />

        {/* Back to top button */}
        <BackToTopButton />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
