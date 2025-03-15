import { useEffect } from 'react';
import '../src/app/globals.css';
import { AuthProvider } from './AuthContext';

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return (<AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>);
}

export default MyApp;