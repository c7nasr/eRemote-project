import "tailwindcss/tailwind.css";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css"; //styles of nprogress
import Head from "next/head";
import "regenerator-runtime/runtime.js";
import "./../styles/tailwind.css";
//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <>
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <CookiesProvider>
        <Provider store={store}>
          <Component {...pageProps} />
          <ToastContainer />

          <style>{`::-webkit-scrollbar {display:none;}
`}</style>
        </Provider>
      </CookiesProvider>
    </>
  );
}

export default MyApp;
