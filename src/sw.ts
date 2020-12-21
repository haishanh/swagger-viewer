/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import {
  imageCache,
  offlineFallback,
  pageCache,
  staticResourceCache,
} from 'workbox-recipes';
// import { ExpirationPlugin } from 'workbox-expiration';
// import { registerRoute } from 'workbox-routing';
// import { StaleWhileRevalidate } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

// https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle

// self.skipWaiting();

clientsClaim();

// the manifest is like:
// [
//   { "revision": null, "url": "305.d11e08472824944cada9.js" },
//   { "revision": "783534abdf3cc43c4d81de72d85c4881", "url": "assets/sw144.png" },
// ]
precacheAndRoute(self.__WB_MANIFEST);

pageCache();

staticResourceCache();

imageCache();

offlineFallback();

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
