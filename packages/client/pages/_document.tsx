import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Find vacation rentals, cabins, beach houses, unique homes and experiences around the world - all made possible by hosts on Airbnb."
          />
          <meta name="theme-color" content="#ffffff" />

          <link
            as="style"
            crossorigin="anonymous"
            rel="stylesheet preload"
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap"
            type="text/css"
            // @ts-ignore
            onLoad="this.onload=null;this.rel='stylesheet'"
          ></link>

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="https://a0.muscache.com/airbnb/static/icons/apple-touch-icon-180x180-bcbe0e3960cd084eb8eaf1353cf3c730.png"
          />

          <link rel="manifest" href="/manifest.json" />
          <link rel="canonical" href="https://mernlabs.team/" />

          <meta property="og:image" content="/" />
          <meta
            property="og:title"
            content="Airbnb: Vacation Rentals, Cabins, Beach Houses, Unique Homes &amp; Experiences"
          />
          <meta
            property="og:description"
            content="Find vacation rentals, cabins, beach houses, unique homes and experiences around the world - all made possible by hosts on Airbnb."
          />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@DarieSebastian6" />
          <meta name="twitter:app:name:iphone" content="Airbnb" />
          <meta name="twitter:app:name:ipad" content="Airbnb" />
          <meta name="twitter:app:name:googleplay" content="Airbnb" />
          <meta
            name="twitter:title"
            content="Airbnb: Vacation Rentals, Cabins, Beach Houses, Unique Homes &amp; Experiences"
          />
          <meta property="twitter:url" content="https://mernlabs.team/" />
          <meta
            name="twitter:description"
            content="Find vacation rentals, cabins, beach houses, unique homes and experiences around the world - all made possible by hosts on Airbnb."
          />
          <meta name="twitter:image" content="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
