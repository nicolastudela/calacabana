import Head from "next/head";

import type { AppProps } from "next/app";

import { useRouter } from "next/router";
import { useEffect } from "react";
import Script from "next/script";
import "@fontsource/montecarlo/latin-400.css"
import "@fontsource/montserrat/500.css"

import { trackPageview, GA_TRACKING_ID } from "@/lib/gtag";

import "../styles/globals.css";
import  { GlobalContextProvider } from "@/shared/hooks/useGlobalContext";
import Layout from "@/components/Layout";

import theme from "../theme";
import { ChakraProvider } from "@chakra-ui/react";

const handleRouteChange = (url: string, { shallow }: { shallow: boolean }) => {
  if (!shallow) {
    trackPageview(url);
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
    useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);



  return (
    <>
      <Head>
        <meta name="robots" content="index,follow"/>
        <meta name="googlebot" content="index,follow"/>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              send_page_view: true,
              page_title: window.location.pathname,
              page_location: window.location.href, // Include the full URL
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <ChakraProvider theme={theme}>
        <GlobalContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </GlobalContextProvider>
      </ChakraProvider>
  
    </>
  );
}

export default MyApp;
