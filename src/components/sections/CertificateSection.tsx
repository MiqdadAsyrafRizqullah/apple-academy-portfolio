import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css/effect-coverflow';
import { CertificateCard } from '../ui/CertificateCard';
import { CertificateLightbox } from '../ui/CertificateLightbox';
import { certificates } from '../../data/certificates';
import type { Certificate } from '../../types';
import { forceUnlockPageScroll, lockPageScroll } from '../../utils/scrollLock';

export type SpawnShapesAt = (x: number, y: number) => void;

const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  '.certificate-card',
  '.swiper-button-next',
  '.swiper-button-prev',
  '.swiper-pagination',
  '.swiper-pagination-bullet',
].join(', ');

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return true;
  return Boolean(target.closest(INTERACTIVE_SELECTOR));
}

type ShapeType = 'circle' | 'square' | 'triangle' | 'cross' | 'plus';

interface Shape {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  angle: number;
  spinSpeed: number;
  type: ShapeType;
  color: string;
  baseOpacity: number;
  isRipple: boolean;
  lifetime: number;
  maxLifetime: number;
}

const COLORS = ['#60a5fa', '#a78bfa', '#22d3ee', '#818cf8', '#c084fc', '#34d399'];
const TYPES: ShapeType[] = ['circle', 'square', 'triangle', 'cross', 'plus'];
const MAX_SHAPES = 280;
const SPAWN_PER_CLICK = 8;

function randomType(): ShapeType {
  return TYPES[Math.floor(Math.random() * TYPES.length)];
}

function createAmbientShape(w: number, h: number): Shape {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() * 6 + 5,
    speedX: (Math.random() - 0.5) * 1.2,
    speedY: (Math.random() - 0.5) * 1.2,
    angle: Math.random() * Math.PI * 2,
    spinSpeed: (Math.random() - 0.5) * 0.04,
    type: randomType(),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    baseOpacity: Math.random() * 0.25 + 0.2,
    isRipple: false,
    lifetime: 0,
    maxLifetime: 0,
  };
}

function createClickShape(cx: number, cy: number): Shape {
  return {
    x: cx + (Math.random() - 0.5) * 36,
    y: cy + (Math.random() - 0.5) * 36,
    size: Math.random() * 4 + 5,
    speedX: (Math.random() - 0.5) * 2.5,
    speedY: (Math.random() - 0.5) * 2.5,
    angle: Math.random() * Math.PI * 2,
    spinSpeed: (Math.random() - 0.5) * 0.08,
    type: randomType(),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    baseOpacity: 0.75,
    isRipple: true,
    lifetime: 70 + Math.floor(Math.random() * 30),
    maxLifetime: 100,
  };
}

/**
 * Canvas background — shapes drift; click adds small ripples at pointer.
 */
function CertificateShapesCanvas({
  containerRef,
  spawnRef,
  mouseRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  spawnRef: React.MutableRefObject<SpawnShapesAt>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let shapes: Shape[] = [];
    let frameId = 0;
    let w = 0;
    let h = 0;
    let ready = false;

    const drawShape = (shape: Shape, drawOpacity: number) => {
      const { size, type } = shape;
      ctx.beginPath();
      if (type === 'circle') {
        ctx.arc(0, 0, size, 0, Math.PI * 2);
      } else if (type === 'square') {
        ctx.rect(-size, -size, size * 2, size * 2);
      } else if (type === 'triangle') {
        ctx.moveTo(0, -size);
        ctx.lineTo(size, size);
        ctx.lineTo(-size, size);
        ctx.closePath();
      } else if (type === 'cross') {
        ctx.moveTo(-size, -size);
        ctx.lineTo(size, size);
        ctx.moveTo(size, -size);
        ctx.lineTo(-size, size);
      } else {
        ctx.moveTo(0, -size);
        ctx.lineTo(0, size);
        ctx.moveTo(-size, 0);
        ctx.lineTo(size, 0);
      }
      ctx.strokeStyle = shape.color;
      ctx.globalAlpha = drawOpacity;
      ctx.lineWidth = 1.25;
      ctx.stroke();
    };

    const updateShape = (shape: Shape) => {
      shape.x += shape.speedX;
      shape.y += shape.speedY;
      shape.angle += shape.spinSpeed;

      if (shape.x > w + 16) shape.x = -16;
      if (shape.x < -16) shape.x = w + 16;
      if (shape.y > h + 16) shape.y = -16;
      if (shape.y < -16) shape.y = h + 16;

      if (shape.isRipple) {
        shape.lifetime -= 1;
        return;
      }

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const dx = mx - shape.x;
      const dy = my - shape.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 0 && dist < 120) {
        const push = ((120 - dist) / 120) * 2.2;
        shape.x -= (dx / dist) * push;
        shape.y -= (dy / dist) * push;
      }
    };

    const getDrawOpacity = (shape: Shape) => {
      if (shape.isRipple) {
        return shape.baseOpacity * (shape.lifetime / shape.maxLifetime);
      }
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const dist = Math.hypot(mx - shape.x, my - shape.y);
      if (dist < 100) {
        return Math.min(shape.baseOpacity + 0.2, 0.55);
      }
      return shape.baseOpacity;
    };

    const initAmbient = () => {
      if (w < 1 || h < 1) return;
      shapes = [];
      const count = Math.min(Math.max(40, Math.floor((w * h) / 5000)), MAX_SHAPES - 20);
      for (let i = 0; i < count; i++) {
        shapes.push(createAmbientShape(w, h));
      }
      ready = true;
    };

    const spawnAt: SpawnShapesAt = (cx, cy) => {
      if (w < 1 || h < 1) return;
      if (shapes.length >= MAX_SHAPES) return;

      const n = Math.min(SPAWN_PER_CLICK, MAX_SHAPES - shapes.length);
      for (let i = 0; i < n; i++) {
        const s = createClickShape(cx, cy);
        s.maxLifetime = s.lifetime;
        shapes.push(s);
      }
    };

    spawnRef.current = spawnAt;

    const resize = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.width < 1 || rect.height < 1) return;

      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!ready || shapes.length === 0) {
        initAmbient();
      }
      spawnRef.current = spawnAt;
    };

    const tick = () => {
      if (w < 1 || h < 1) {
        frameId = requestAnimationFrame(tick);
        return;
      }
      ctx.clearRect(0, 0, w, h);
      shapes = shapes.filter((s) => !s.isRipple || s.lifetime > 0);
      for (const shape of shapes) {
        updateShape(shape);
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.angle);
        drawShape(shape, getDrawOpacity(shape));
        ctx.restore();
      }
      frameId = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(resize);
    const root = containerRef.current;
    if (root) ro.observe(root);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) resize();
      },
      { threshold: 0.01 },
    );
    if (root) io.observe(root);

    window.addEventListener('resize', resize);
    resize();
    frameId = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
      spawnRef.current = () => {};
    };
  }, [containerRef, spawnRef, mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

export function CertificateSection() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const spawnRef = useRef<SpawnShapesAt>(() => {});
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const spawnAtClientPoint = useCallback((clientX: number, clientY: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;
    spawnRef.current(x, y);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const clearTextSelection = () => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;
      if (!section.contains(selection.anchorNode)) return;
      if (selection.anchorNode && isInteractiveTarget(selection.anchorNode)) return;
      selection.removeAllRanges();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      if (isInteractiveTarget(event.target)) return;
      event.preventDefault();
      spawnAtClientPoint(event.clientX, event.clientY);
    };

    const blockSelection = (event: Event) => {
      if (isInteractiveTarget(event.target)) return;
      event.preventDefault();
    };

    section.addEventListener('pointerdown', onPointerDown, true);
    section.addEventListener('selectstart', blockSelection);
    section.addEventListener('dragstart', blockSelection);
    section.addEventListener('dblclick', blockSelection);
    section.addEventListener('pointerup', clearTextSelection);

    return () => {
      section.removeEventListener('pointerdown', onPointerDown, true);
      section.removeEventListener('selectstart', blockSelection);
      section.removeEventListener('dragstart', blockSelection);
      section.removeEventListener('dblclick', blockSelection);
      section.removeEventListener('pointerup', clearTextSelection);
    };
  }, [spawnAtClientPoint]);

  const openCertificateLightbox = useCallback((cert: Certificate) => {
    lockPageScroll();
    setSelectedCertificate(cert);
  }, []);

  const closeCertificateLightbox = useCallback(() => {
    setSelectedCertificate(null);
    window.setTimeout(() => {
      if (document.body.style.position === 'fixed') {
        forceUnlockPageScroll();
      }
    }, 500);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
  };

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="certificate-section relative overflow-hidden bg-[var(--color-surface)] py-20 lg:py-32"
      aria-label="Certificates"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <CertificateShapesCanvas
          containerRef={sectionRef}
          spawnRef={spawnRef}
          mouseRef={mouseRef}
        />
      </div>

      <div className="certificate-section-content relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="certificate-section-header mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
            Sertifikat
          </h2>
          <p className="mx-auto mb-2 max-w-xl text-[var(--color-text-secondary)]">
            Professional certifications I have achieved
          </p>
          <p className="text-sm font-medium text-[var(--color-primary)]">
            Total: {certificates.length} certificates
          </p>
          <div
            className="mx-auto mt-4 h-1 w-16 rounded-full bg-[var(--color-primary)]"
            aria-hidden="true"
          />
        </motion.div>

        <motion.div
          className="certificate-swiper-wrap"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor={false}
            centeredSlides
            coverflowEffect={{
              rotate: 18,
              stretch: 0,
              depth: 80,
              modifier: 1,
              slideShadows: false,
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="certificate-swiper pb-12"
            aria-label="Carousel certificates"
          >
            {certificates.map((cert) => (
              <SwiperSlide key={cert.id} className="!h-auto">
                <CertificateCard
                  certificate={cert}
                  onOpenLightbox={openCertificateLightbox}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <CertificateLightbox
        certificate={selectedCertificate}
        onClose={closeCertificateLightbox}
      />
    </section>
  );
}

export default CertificateSection;
