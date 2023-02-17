import { useEffect, useState } from 'react';

import 'src/styles/fonts.css';
import 'src/styles/base.css';

import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import JoinedCTXProvider from 'src/store/CTX';

import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Head from 'next/head';

const App = ({ Component, pageProps }) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <JoinedCTXProvider>
      <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
        <ColorSchemeProvider colorScheme={'dark'} toggleColorScheme={() => {}}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: 'dark',
              primaryColor: 'blue',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <NotificationsProvider>
              <Head>
                <title>Fossly Auth</title>
                <meta name="description" content="Fossly Tech authentication" />
                <link rel="icon" href="/favicon.ico" />

                <link rel="manifest" href="/manifest.json" />
              </Head>
              {getLayout(<Component {...pageProps} />)}
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </SessionContextProvider>
    </JoinedCTXProvider>
  );
};

export default App;
