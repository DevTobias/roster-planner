import Document, { Html, Main, NextScript, Head } from 'next/document';

import FontLoader from '@Helpers/FontLoader';

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="de">
        <Head>
          <FontLoader />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
