import React from 'react';
import { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/redux/store';
import { ThemeProvider } from '@/context/ThemeContext';
import ErrorBoundary from '@/components/ErrorBoundery/ErrorBoundery';
import '@/styles/global.scss';

function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
