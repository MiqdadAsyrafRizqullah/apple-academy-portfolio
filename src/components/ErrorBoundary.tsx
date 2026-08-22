import { Component, type ReactNode, type ErrorInfo } from 'react';
import { AlertTriangle } from 'lucide-react';

interface SectionErrorFallbackProps {
  sectionName: string;
}

/**
 * Fallback UI shown when a section crashes.
 */
export function SectionErrorFallback({ sectionName }: SectionErrorFallbackProps) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 px-4 text-center"
      role="alert"
      aria-live="assertive"
    >
      <AlertTriangle
        size={40}
        className="text-yellow-500 mb-4"
        aria-hidden="true"
      />
      <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
        Terjadi kesalahan pada bagian {sectionName}
      </h2>
      <p className="text-sm text-[var(--color-text-secondary)] max-w-sm">
        Bagian ini tidak dapat ditampilkan saat ini. Bagian lain tetap berfungsi normal.
      </p>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * React class component ErrorBoundary.
 * Wraps each major section to prevent full-page crashes.
 * Renders SectionErrorFallback on error.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Log error for debugging (in production, send to error tracking service)
    console.error(`[ErrorBoundary] Section "${this.props.sectionName ?? 'Unknown'}" crashed:`, error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <SectionErrorFallback
          sectionName={this.props.sectionName ?? 'ini'}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
