import "../styles/globals.css";
import { Auth0Provider } from "@auth0/auth0-react";

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain="dev-4ignb5dq.eu.auth0.com"
      clientId="d8MKJY4FBDB42m20gepZqBcSuYxMOWEX"
      redirectUri={typeof window !== "undefined" ? window.location.origin : ''}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default MyApp;
