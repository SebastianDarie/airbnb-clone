import { AppProps } from 'next/app';
import Head from 'next/head';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import 'leaflet/dist/leaflet.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import '../sass/base/base.scss';

const stripe = loadStripe(process.env.stripe!);

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

      <Elements stripe={stripe}>
        <Component {...pageProps} />
      </Elements>
    </DndProvider>
  );
};

export default MyApp;
