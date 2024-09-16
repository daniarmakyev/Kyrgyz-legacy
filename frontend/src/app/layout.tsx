'use client'; 
import type { Metadata } from "next";
import Head from "next/head";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../../store/Store";

// const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <title>Kyrgyz Legacy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Learn the Kyrgyz language and explore its rich cultural heritage."
        />
        <meta
          name="keywords"
          content="Kyrgyz language, learn Kyrgyz, Kyrgyzstan, language learning, culture"
        />
        <meta name="author" content="Dan inc" />
        <meta property="og:title" content="Kyrgyz Legacy" />
        <meta
          property="og:description"
          content="Learn the Kyrgyz language and explore its rich cultural heritage."
        />
        <meta property="og:image" content="/public/oranmentOneRed.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/public/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/public/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/public/favicon-16x16.png"
        />
        {/* Android Chrome Icons */}
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/public/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/public/android-chrome-512x512.png"
        />
        <link rel="manifest" href="/public/site.webmanifest" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <body>
        <main>
          {" "}
          <Provider store={store}>{children}</Provider>
        </main>
      </body>
    </html>
  );
}
