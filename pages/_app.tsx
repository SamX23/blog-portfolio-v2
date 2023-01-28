import { NextSeo } from "next-seo";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title="Sami Kalammallah Personal Blog"
        description="A blog about a frontend beyond master wannabe."
        canonical="https://blog-portfolio-v2.vercel.app"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "favicon.ico",
          },
        ]}
      />

      <Component {...pageProps} />
    </>
  );
}

export function reportWebVitals(metric) {
  console.log(metric);
}

export default MyApp;
