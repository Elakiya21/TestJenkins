/* eslint-disable */

importScripts('https://ssl.widgets.webengage.com/js/service-worker.js')
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js')

self.addEventListener("install", () => {
    // console.log("service worker installed")
})

//code to delete all existing caches
/*self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches
      .keys()
      .then(keys => keys.map(key => caches.delete(key)))
  )
})*/


self.addEventListener("fetch", () => {
    // console.log("service worker fetched")
})

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-stylesheets',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  }),
)

workbox.routing.registerRoute(
  /[a-z0-9]\.[a-z0-9]{8}\.(?:(chunk\.)?js|css|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'workbox-runtime-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  }),
)

