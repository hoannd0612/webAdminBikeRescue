/* eslint-disable jsx-a11y/anchor-has-content */
import NextLink from 'next/link';
import React, { forwardRef } from 'react';

const RLink = forwardRef(({ children, href, ...rest }, ref) => (
  <NextLink href={href}>
    <a ref={ref} {...rest}>
      {children}
    </a>
  </NextLink>
));

export default RLink;
