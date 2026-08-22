import { useState, useEffect, useRef } from 'react';

interface TypewriterEffectProps {
  texts: string[];
  typingSpeed?: number;    // ms per character while typing (default: 80)
  deletingSpeed?: number;  // ms per character while deleting (default: 50)
  pauseDuration?: number;  // ms pause after full text (default: 2000)
  className?: string;
}

type Phase = 'typing' | 'pausing' | 'deleting';

/**
 * Displays a list of texts one at a time with a typewriter effect.
 * Cycles through all texts indefinitely.
 * Edge case: empty texts array → displays empty string without crashing.
 */
export function TypewriterEffect({
  texts,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 2000,
  className,
}: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<Phase>('typing');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Edge case: empty array
    if (texts.length === 0) {
      setDisplayText('');
      return;
    }

    const currentText = texts[textIndex];

    const clear = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };

    if (phase === 'typing') {
      if (charIndex < currentText.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndex + 1));
          setCharIndex(c => c + 1);
        }, typingSpeed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setPhase('pausing');
        }, pauseDuration);
      }
    } else if (phase === 'pausing') {
      timeoutRef.current = setTimeout(() => {
        setPhase('deleting');
      }, 0);
    } else if (phase === 'deleting') {
      if (charIndex > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndex - 1));
          setCharIndex(c => c - 1);
        }, deletingSpeed);
      } else {
        // Move to next text
        setTextIndex(i => (i + 1) % texts.length);
        setPhase('typing');
      }
    }

    return clear;
  }, [phase, charIndex, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className} aria-live="polite" aria-atomic="true">
      {displayText}
      <span className="animate-pulse" aria-hidden="true">|</span>
    </span>
  );
}

export default TypewriterEffect;
