import '../styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { StoreProvider } from '../utils/Store';
import { useRouter } from 'next/router';
import React from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { MDBSpinner } from 'mdb-react-ui-kit';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <PayPalScriptProvider deferLoading={true}>
          {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
        </PayPalScriptProvider>
      </StoreProvider>
    </SessionProvider>
  );
}

function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });
  if (status === 'loading') {
    return <MDBSpinner className='me-2' style={{ width: '3rem', height: '3rem' }} role='status'>
    <span className='visually-hidden'>Cargando.</span>
  </MDBSpinner>;
  }

  return children;
}

export default MyApp;
