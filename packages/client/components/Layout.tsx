import React, { ReactNode } from 'react';
import Navbar from './Navbar/Navbar';

type LayoutProps = {
  search?: boolean;
  children?: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ search, children }) => {
  return (
    <div>
      <Navbar search={search} />

      <main>{children}</main>
    </div>
  );
};

export default Layout;
