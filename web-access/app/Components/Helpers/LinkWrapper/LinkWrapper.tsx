import Link from 'next/link';
import { FunctionComponent } from 'react';

import type { LinkWrapperProps } from './LinkWrapper.types';

/**
 * Wraps the children with an next link, if the url is not empty.
 * Otherwise it will just return the plain children.
 *
 * @param className   ('')    The styling which should be applied to the component.
 * @param href        ('')    The href of the link.
 *
 * @example <LinkWrapper href="/">Home</LinkWrapper>
 */
const LinkWrapper: FunctionComponent<LinkWrapperProps> = ({
  children,
  href = '',
  className = '',
}) => {
  if (href) {
    return (
      <Link href={href}>
        <a className={className}>{children}</a>
      </Link>
    );
  }

  return <div className={className}>{children}</div>;
};

export default LinkWrapper;
