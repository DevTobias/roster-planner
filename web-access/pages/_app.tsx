import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import innerVh from '@Utils/innerVh';

import '@Styles/base.scss';
import 'antd/dist/antd.css';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => innerVh(), []);
  return (
    <>
      <Head>
        {' '}
        <meta name="viewport" content="width=1024"></meta>
      </Head>
      <Component {...pageProps} />{' '}
      <Toaster
        toastOptions={{
          className: 'dark:bg-neutral-900 text-neutral-800 dark:text-neutral-0',
        }}
      />
    </>
  );
}

export default App;
