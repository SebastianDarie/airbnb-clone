import React, { ReactNode } from 'react';
import Navbar from './Navbar/Navbar';

type LayoutProps = {
  search?: boolean;
  children?: ReactNode;
  title?: string;
};

const Layout: React.FC<LayoutProps> = ({
  search,
  children,
  title = 'This is the default title',
}) => {
  return (
    <div>
      <Navbar search={search} />

      <main>{children}</main>
    </div>
  );
};

export default Layout;
