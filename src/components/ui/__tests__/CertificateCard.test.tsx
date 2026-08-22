// Feature: personal-portfolio-website, Property 8: Certificate Card Rendering Completeness
// **Validates: Requirements 5.1, 5.2**
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import { CertificateCard } from '../CertificateCard';
import type { Certificate } from '../../../types';

vi.mock('framer-motion', () => {
  const makeMotionComponent = (tag: string) =>
    React.forwardRef<HTMLElement, Record<string, unknown>>(
      ({ children, initial: _i, animate: _a, whileInView: _w, whileHover: _wh, viewport: _v, transition: _t, ...rest }, ref) =>
        React.createElement(tag, { ...rest, ref }, children as React.ReactNode)
    );
  const cache = new Map<string, ReturnType<typeof makeMotionComponent>>();
  const motionProxy = new Proxy({}, {
    get(_t, prop: string | symbol) {
      if (typeof prop !== 'string') return undefined;
      if (!cache.has(prop)) cache.set(prop, makeMotionComponent(prop));
      return cache.get(prop);
    },
  });
  return {
    motion: motionProxy,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
  };
});

vi.mock('lucide-react', () => {
  const Icon = () => React.createElement('svg', { 'data-testid': 'icon' });
  return { ExternalLink: Icon, Award: Icon };
});

const visibleString = (min = 1, max = 100) =>
  fc.string({ minLength: min, maxLength: max }).filter(s => s.trim() === s && s.trim().length > 0);

const arbitraryCertificate = (): fc.Arbitrary<Certificate> =>
  fc.record({
    id: visibleString(1, 20),
    name: visibleString(1, 100),
    issuer: visibleString(1, 100),
    year: fc.integer({ min: 2000, max: 2030 }),
    image: fc.webUrl(),
    verificationUrl: fc.option(fc.webUrl(), { nil: undefined }),
    featured: fc.boolean(),
  });

describe('CertificateCard — Property 8: Certificate Card Rendering Completeness', () => {
  it('renders certificate name for any valid certificate', () => {
    fc.assert(
      fc.property(arbitraryCertificate(), (cert) => {
        const onOpenLightbox = vi.fn();
        const { container, unmount } = render(
          <CertificateCard certificate={cert} onOpenLightbox={onOpenLightbox} />
        );
        const h3 = container.querySelector('h3');
        expect(h3?.textContent?.trim()).toBe(cert.name);
        unmount();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('renders issuer for any valid certificate', () => {
    fc.assert(
      fc.property(arbitraryCertificate(), (cert) => {
        const onOpenLightbox = vi.fn();
        const { getByText, unmount } = render(
          <CertificateCard certificate={cert} onOpenLightbox={onOpenLightbox} />
        );
        expect(getByText(cert.issuer)).toBeTruthy();
        unmount();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('renders year for any valid certificate', () => {
    fc.assert(
      fc.property(arbitraryCertificate(), (cert) => {
        const onOpenLightbox = vi.fn();
        const { getByText, unmount } = render(
          <CertificateCard certificate={cert} onOpenLightbox={onOpenLightbox} />
        );
        expect(getByText(String(cert.year))).toBeTruthy();
        unmount();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('renders certificate image with non-empty alt text', () => {
    fc.assert(
      fc.property(arbitraryCertificate(), (cert) => {
        const onOpenLightbox = vi.fn();
        const { container, unmount } = render(
          <CertificateCard certificate={cert} onOpenLightbox={onOpenLightbox} />
        );
        const img = container.querySelector('img');
        expect(img).toBeTruthy();
        expect(img?.getAttribute('alt')?.trim().length).toBeGreaterThan(0);
        unmount();
        return true;
      }),
      { numRuns: 100 }
    );
  });

  it('renders Verifikasi link if and only if verificationUrl exists', () => {
    fc.assert(
      fc.property(arbitraryCertificate(), (cert) => {
        const onOpenLightbox = vi.fn();
        const { container, unmount } = render(
          <CertificateCard certificate={cert} onOpenLightbox={onOpenLightbox} />
        );
        const verifyLink = container.querySelector('a[href]');
        if (cert.verificationUrl) {
          expect(verifyLink).toBeTruthy();
        } else {
          expect(verifyLink).toBeNull();
        }
        unmount();
        return true;
      }),
      { numRuns: 100 }
    );
  });
});
