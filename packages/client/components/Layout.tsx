import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Button } from 'antd';
import { withLogout, WithLogoutProps } from '@airbnb-clone/controller';
import { useApolloClient } from '@apollo/client';

type Props = {
  children?: ReactNode;
  title?: string;
} & WithLogoutProps;

const Layout = ({
  children,
  title = 'This is the default title',
  logout,
}: Props) => {
  const apolloClient = useApolloClient();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <header>
        <nav>
          <Link href='/'>
            <a>Home</a>
          </Link>{' '}
          |{' '}
          <Link href='/about'>
            <a>About</a>
          </Link>{' '}
          |{' '}
          <Link href='/register'>
            <a>Register</a>
          </Link>{' '}
          |{' '}
          <Link href='/login'>
            <a>Login</a>
          </Link>{' '}
          |{' '}
          <Link href='/users'>
            <a>Users List</a>
          </Link>{' '}
          | <a href='/api/users'>Users API</a>|{' '}
          <Button
            type='link'
            onClick={async () => {
              await logout();
              await apolloClient.resetStore();
            }}
          >
            Logout
          </Button>{' '}
        </nav>
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  );
};

export default withLogout(Layout);
