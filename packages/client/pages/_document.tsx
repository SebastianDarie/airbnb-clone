import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='utf-8' />
          {/* <link rel="icon" href="/favicon.io" /> */}

          <meta
            name='description'
            content='Find vacation rentals, cabins, beach houses, unique homes and experiences around the world - all made possible by hosts on Airbnb.'
          />

          <link rel='preconnect' href='https://fonts.gstatic.com' />

          <link
            href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap'
            rel='stylesheet'
          ></link>

          {/* <link
            rel='stylesheet'
            href='https://unpkg.com/leaflet@1.7.1/dist/leaflet.css'
            integrity='sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=='
            crossOrigin=''
          /> */}
          {/* <script
            src='https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
            integrity='sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=='
            crossOrigin=''
          ></script> */}

          <script
            type='text/javascript'
            dangerouslySetInnerHTML={{ __html: process.env.loadMapScenario! }}
          ></script>

          {/* <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="canonical" href="https://reddit-clone.tech/" /> */}

          {/* <meta property="og:image" content="/" />
          <meta
            property="og:title"
            content="reddit: the front page of the internet"
          />
          <meta
            property="og:description"
            content="Reddit is a network of communities based on people&#x27;s interests."
          />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@DarieSebastian6" />
          <meta name="twitter:title" content="RedditClone" />
          <meta property="twitter:url" content="https://reddit-clone.tech/" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />

          <script
            type='text/javascript'
            src={`https://www.bing.com/api/maps/mapcontrol?key=${process.env.NEXT_PUBLIC_BING_MAPS_API_KEY}&callback=loadMapScenario`}
            async
            defer
          ></script>
        </body>
      </Html>
    );
  }
}
