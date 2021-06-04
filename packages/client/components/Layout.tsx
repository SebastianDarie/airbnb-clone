import React, { ReactNode } from 'react';
import { useApolloClient } from '@apollo/client';
import Navbar from './Navbar/Navbar';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => {
  const apolloClient = useApolloClient();

  return (
    <div>
      <Navbar />

      <main>{children}</main>
    </div>
  );
};

export default Layout;
