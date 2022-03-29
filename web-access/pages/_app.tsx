import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import innerVh from '@Utils/innerVh';

import '@Styles/base.scss';
import 'antd/dist/antd.css';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => innerVh(), []);
  return (
    <>
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
