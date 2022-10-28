import { ThemeProvider } from "styled-components";
import useResize from "utils/hooks/useResize";

import Head from "next/head";

//pre-import css
import "react-toastify/dist/ReactToastify.min.css";
import { GlobalStyle } from "../styles/common";

function MyApp({ Component, pageProps }) {
  const [windowWidth, windowHeight] = useResize();
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <GlobalStyle />
      <ThemeProvider theme={{ windowWidth, windowHeight }}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
