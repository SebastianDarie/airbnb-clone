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

          {/* <script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}&libraries=drawing,geometry,places`}
          ></script> */}

          <link
            href='https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css'
            rel='stylesheet'
          />

          <script
            src='https://widget.cloudinary.com/v2.0/global/all.js'
            type='text/javascript'
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
        </body>
      </Html>
    );
  }
}
