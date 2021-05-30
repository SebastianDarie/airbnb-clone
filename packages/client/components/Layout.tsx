import React, { ReactNode } from 'react';
import { withLogout, WithLogoutProps } from '@airbnb-clone/controller';
import { useApolloClient } from '@apollo/client';
import { Navbar } from './Navbar/Navbar';

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
      <Navbar />

      <main>
        <div style={{ minHeight: 400 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'stretch',
              position: 'relative',
              height: '554px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 0,
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: '100%',
                }}
              >
                <picture>
                  <source
                    srcSet='https://a0.muscache.com/im/pictures/415fe2dc-98a1-4565-a702-70b03ae757d7.jpg?im_w=2560 1x, https://a0.muscache.com/im/pictures/415fe2dc-98a1-4565-a702-70b03ae757d7.jpg?im_w=2560 2x'
                    media='(min-width: 1440px)'
                  />
                  <source
                    srcSet='https://a0.muscache.com/im/pictures/415fe2dc-98a1-4565-a702-70b03ae757d7.jpg?im_w=960 1x, https://a0.muscache.com/im/pictures/415fe2dc-98a1-4565-a702-70b03ae757d7.jpg?im_w=1920 2x'
                    media='(min-width: 950px)'
                  />
                  <source
                    srcSet='https://a0.muscache.com/im/pictures/090a6d00-576a-465e-b946-8d26ebedbe10.jpg?im_w=720 1x, https://a0.muscache.com/im/pictures/090a6d00-576a-465e-b946-8d26ebedbe10.jpg?im_w=1440 2x'
                    media='(min-width: 744px)'
                  />
                  <source srcSet='https://a0.muscache.com/im/pictures/8096fa47-0535-49d2-9aca-8db39b3faacd.jpg?im_w=320 1x, https://a0.muscache.com/im/pictures/8096fa47-0535-49d2-9aca-8db39b3faacd.jpg?im_w=720 2x' />
                  <img
                    style={{
                      position: 'absolute',
                      objectFit: 'cover',
                      verticalAlign: 'bottom',
                      height: '100%',
                      width: '100%',
                    }}
                    src='https://a0.muscache.com/im/pictures/8096fa47-0535-49d2-9aca-8db39b3faacd.jpg?im_q=highq&im_w=720'
                  />
                </picture>
                <div
                  style={{
                    display: 'none',
                    backgroundPosition: '50% 50%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    height: '100%',
                    width: '100%',
                    backgroundImage:
                      'url(https://a0.muscache.com/im/pictures/8096fa47-0535-49d2-9aca-8db39b3faacd.jpg?im_w=720)',
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    // <div>
    //   <Head>
    //     <title>{title}</title>
    //     <meta charSet='utf-8' />
    //     <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    //   </Head>
    //   <header>
    //     <nav>
    //       <Link href='/'>
    //         <a>Home</a>
    //       </Link>{' '}
    //       |{' '}
    //       <Link href='/about'>
    //         <a>About</a>
    //       </Link>{' '}
    //       |{' '}
    //       <Link href='/register'>
    //         <a>Register</a>
    //       </Link>{' '}
    //       |{' '}
    //       <Link href='/login'>
    //         <a>Login</a>
    //       </Link>{' '}
    //       |{' '}
    //       <Link href='/users'>
    //         <a>Users List</a>
    //       </Link>{' '}
    //       | <a href='/api/users'>Users API</a>|{' '}
    //       <Button
    //         type='link'
    //         onClick={async () => {
    //           await logout();
    //           await apolloClient.resetStore();
    //         }}
    //       >
    //         Logout
    //       </Button>{' '}
    //     </nav>
    //   </header>
    //   {children}
    //   <footer>
    //     <hr />
    //     <span>I'm here to stay (Footer)</span>
    //   </footer>
    // </div>
  );
};

export default withLogout(Layout);
