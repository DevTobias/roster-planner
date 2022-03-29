import Head from 'next/head';
import { FunctionComponent } from 'react';

import type { TitleProps } from './Title.types';

/**
 * Sets the title of the page to the given title prop.
 *
 * @param title The title of the html page.
 *
 * @example <Title title="Infotition" />
 */
const Title: FunctionComponent<TitleProps> = ({ title }) => (
  <Head>
    <title>{title}</title>
  </Head>
);

export default Title;
