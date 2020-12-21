/// <reference types="react/experimental" />
/// <reference types="react-dom/experimental" />

declare const __DEV__: string;
declare const process = {
  env: {
    NODE_ENV: string,
    PUBLIC_URL: string,
    GH_APP_CLIENT_ID: string,
    GH_APP_CLIENT_SECRET: string,
  },
};
