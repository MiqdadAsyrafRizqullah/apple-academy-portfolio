interface MechanicalFallbackProps {
  className?: string;
}

/**
 * Static gradient fallback when WebGL or motion is unavailable.
 */
export function MechanicalFallback({ className = '' }: MechanicalFallbackProps) {
  return (
    <div
      className={`absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/90 to-purple-950/80 ${className}`}
      aria-hidden="true"
    >
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
    </div>
  );
}

export default MechanicalFallback;
