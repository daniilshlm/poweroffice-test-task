import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React, { ReactNode } from 'react';
import ErrorBoundary from '@/components/ErrorBoundery/ErrorBoundery';

const ProblemChild: React.FC = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders children when no error is thrown', () => {
    const ChildComponent = (): ReactNode => <div>Child component</div>;

    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Child component')).toBeInTheDocument();
  });

  it('renders fallback component when an error is thrown', () => {
    const FallbackComponent = (): ReactNode => <div>Custom Fallback</div>;

    render(
      <ErrorBoundary fallbackComponent={<FallbackComponent />}>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom Fallback')).toBeInTheDocument();
  });

  it('renders default error message when an error is thrown and no fallback is provided', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops! Something went wrong.')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('calls getDerivedStateFromError when an error is thrown', () => {
    const spy = jest.spyOn(ErrorBoundary, 'getDerivedStateFromError');

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(spy).toHaveBeenCalledTimes(2);
    spy.mockRestore();
  });

  it('calls componentDidCatch when an error is thrown', () => {
    const spy = jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });
});
