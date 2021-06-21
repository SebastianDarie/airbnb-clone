import { AppProps } from 'next/app';
import Head from 'next/head';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import '../sass/base/base.scss';
//import 'antd/dist/antd.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
  );
};

export default MyApp;
