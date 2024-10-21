import React, { ErrorInfo, ReactNode } from 'react';
import log from 'loglevel';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackComponent?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    log.error('getDerivedStateFromError called', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    log.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallbackComponent) {
        return this.props.fallbackComponent;
      }

      return (
        <div className="error-message">
          <h2>Oops! Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
          <details style={{ whiteSpace: 'pre-wrap' }}>{this.state.error?.stack}</details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
