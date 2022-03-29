const withPlugins = require('next-compose-plugins');
const withPreact = require('next-plugin-preact');

const isDev = process.env.NODE_ENV !== 'production';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const getFontCache = () => {
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

  return fonts.map((font) => {
    return {
      source: font,
      headers: [
        {
          key: 'Cache-control',
          value: 'public, immutable, max-age=31536000',
        },
      ],
    };
  });
};

const nextConfig = {
  reactStrictMode: isDev,
  async headers() {
    return [
      ...getFontCache(),
    ];
  },
};

module.exports = withPlugins([[withBundleAnalyzer, withPreact]], nextConfig);
