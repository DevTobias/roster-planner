import type { AppProps } from 'next/app';
import { useEffect } from 'react';

import innerVh from '@Utils/innerVh';

import '@Styles/base.scss';

function App({ Component, pageProps }: AppProps) {
  useEffect(() => innerVh(), []);
  return <Component {...pageProps} />;
}

export default App;
