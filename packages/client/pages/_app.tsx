import { AppProps } from 'next/app';
import Head from 'next/head';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';

import { GoogleMapsProvider } from '../utils/GoogleMapsProvider';

import '../sass/base/base.scss';

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const googleMapsLibraries: Libraries = ['places'];
const stripe = loadStripe(process.env.stripe!);

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <GoogleMapsProvider
      googleMapsApiKey={googleMapsApiKey!}
      libraries={googleMapsLibraries}
    >
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
    </GoogleMapsProvider>
  );
};

export default MyApp;
