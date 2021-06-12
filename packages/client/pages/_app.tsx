import { AppProps } from 'next/app';
import Head from 'next/head';
import { YMaps } from 'react-yandex-maps';

import '../sass/base/base.scss';
//import 'antd/dist/antd.css';
import '../styles/Geosuggest.scss';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <YMaps
    // query={{
    //   apikey: process.env.NEXT_PUBLIC_YANDEX_API_KEY,
    //   lang: 'en_US',
    // }}
    >
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
    </YMaps>
  );
};

export default MyApp;
