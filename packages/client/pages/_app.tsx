import { AppProps } from 'next/app';
import Head from 'next/head';

import 'antd/dist/antd.css';
import '../styles/Geosuggest.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, user-scalable=no, user-scalable=0'
        />
        <title>
          Vacations Rentals, Homes, Hotels, Experiences & More - Airbnb
        </title>
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
