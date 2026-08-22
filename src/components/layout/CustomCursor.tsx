import { useState, useEffect } from 'react';

/**
 * Custom cursor that follows mouse position.
 * Hidden on mobile/touch devices.
 */
export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const computedStyle = window.getComputedStyle(target);
      setIsPointer(computedStyle.cursor === 'pointer');
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full border-2 border-[var(--color-primary)] transition-transform duration-150"
        style={{
          left: position.x,
          top: position.y,
          width: isPointer ? 40 : 32,
          height: isPointer ? 40 : 32,
          transform: 'translate(-50%, -50%)',
          opacity: 0.6,
        }}
        aria-hidden="true"
      />
      {/* Inner dot */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full bg-[var(--color-primary)]"
        style={{
          left: position.x,
          top: position.y,
          width: 6,
          height: 6,
          transform: 'translate(-50%, -50%)',
        }}
        aria-hidden="true"
      />
    </>
  );
}

export default CustomCursor;
