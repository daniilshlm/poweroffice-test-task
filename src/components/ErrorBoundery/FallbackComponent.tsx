import React, { ReactNode } from 'react';
import './ErrorFallback.scss';

class ErrorPage extends React.Component {
  render(): ReactNode {
    return (
      <div className="error-fallback-ui">
        <h1>Error Page</h1>
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
}

export default ErrorPage;
