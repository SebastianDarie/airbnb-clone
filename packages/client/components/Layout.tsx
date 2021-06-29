import React, { ReactNode } from 'react';
import Navbar from './Navbar/Navbar';

type LayoutProps = {
  filter?: boolean;
  search?: boolean;
  children?: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ filter, search, children }) => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Navbar filter={filter} search={search} />

      <main>{children}</main>
    </div>
  );
};

export default Layout;
