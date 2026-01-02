const CACHE_NAME = 'inventario-pro-v3';
const ASSETS = [];

self.addEventListener('install', event => {
  console.log('Service Worker v3 installing - NO CACHE');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          console.log('Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      console.log('All caches deleted, claiming clients');
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', event => {
  // NO CACHE - always fetch from network
  event.respondWith(fetch(event.request));
});
