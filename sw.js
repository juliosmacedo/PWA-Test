importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

workbox.routing.registerRoute(
    new RegExp('https://www.themealdb.com/api/json/v1/1/list.php?i=list'),
    workbox.strategies.cacheFirst()
);



workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({
      cacheName: 'google-fonts',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30,
        }),
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
      ],
    }),
  );
workbox.precaching.precacheAndRoute([{"revision":"c057eac63d75159667b9b592b15c58db","url":"css/style.css"},{"revision":"f66cffb8388f602e9c15d1d2e2ede941","url":"index.html"},{"revision":"ef08c8671941daae421a5dbaf3d78382","url":"js/scripts.js"},{"revision":"f9336438854ffc12099e91e49bd9975b","url":"workbox-926a8ce9.js"}]);