import { FunctionComponent } from 'react';

/**
 * Loads poppins and inter font variant by providing multiple
 * links to the self hosted fonts.
 */
const FontLoader: FunctionComponent = () => {
  const fonts = [
    '/fonts/Poppins-RegularItalic.woff2',
    '/fonts/Poppins-MediumItalic.woff2',
    '/fonts/Poppins-SemiboldItalic.woff2',
    '/fonts/Poppins-BoldItalic.woff2',
    '/fonts/Poppins-Regular.woff2',
    '/fonts/Poppins-Medium.woff2',
    '/fonts/Poppins-Semibold.woff2',
    '/fonts/Poppins-Bold.woff2',
    '/fonts/Inter-Regular.woff2',
    '/fonts/Inter-Medium.woff2',
    '/fonts/Inter-Semibold.woff2',
    '/fonts/Inter-Bold.woff2',
  ];

  return (
    <>
      {fonts.map((font) => {
        return (
          <link
            key={font}
            rel="preload"
            href={font}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        );
      })}
    </>
  );
};

export default FontLoader;
