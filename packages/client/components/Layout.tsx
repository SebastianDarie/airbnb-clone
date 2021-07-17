import React, { ReactNode } from 'react';
import Navbar from './Navbar/Navbar';

type LayoutProps = {
  isLoaded?: boolean;
  filter?: boolean;
  room?: boolean;
  search?: boolean;
  children?: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({
  isLoaded,
  filter,
  room,
  search,
  children,
}) => {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Navbar isLoaded={isLoaded} filter={filter} room={room} search={search} />

      <main>{children}</main>
    </div>
  );
};

export default Layout;
