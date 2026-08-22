import { Heart } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { scrollToSection } from '../../utils/scrollUtils';
import { NAV_ITEMS } from '../../types';
import { personalInfo } from '../../data/personal';

/**
 * Footer with dynamic copyright year, social links, and nav links.
 * Copyright year uses new Date().getFullYear() — always current.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: personalInfo.social.linkedin,
      icon: FaLinkedin,
      label: 'LinkedIn',
    },
    {
      href: personalInfo.social.github,
      icon: FaGithub,
      label: 'GitHub',
    },
    {
      href: personalInfo.social.instagram,
      icon: FaInstagram,
      label: 'Instagram',
    },
  ];

  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h2 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
              {personalInfo.name}
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Nav links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 uppercase tracking-wider">
              Navigasi
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors focus:outline-none focus-visible:underline"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Social links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 uppercase tracking-wider">
              Sosial Media
            </h3>
            <div className="flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                  aria-label={`Kunjungi profil ${label} saya`}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-[var(--color-text-secondary)]">
            © {currentYear} {personalInfo.name}. Semua hak dilindungi.
          </p>
          <p className="text-sm text-[var(--color-text-secondary)] flex items-center gap-1">
            Dibuat dengan <Heart size={14} className="text-red-400" aria-hidden="true" /> menggunakan React + TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
