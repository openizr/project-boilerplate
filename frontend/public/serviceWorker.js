/* eslint-disable no-restricted-globals */

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('/')));
  }
});

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open('...').then((cache) => { cache.addAll(['/']); }));
});
