import '$styles/globals.scss';
import Provider from '$lib/components/Provider';

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
