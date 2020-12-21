/// <reference types="react/experimental" />
/// <reference types="react-dom/experimental" />

// for css modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare const __DEV__: string;
declare const process = {
  env: {
    NODE_ENV: string,
    PUBLIC_URL: string,
    GH_APP_CLIENT_ID: string,
    GH_APP_CLIENT_SECRET: string,
  },
};
