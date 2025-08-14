// Thrift Tracker — Service Worker (GitHub Pages–safe, relative paths)
const VERSION = 'tt-v2-2025-08-13';

// Precache these files relative to where the SW is served (project root)
const APP_SHELL = [
  './',                      // project root (same folder as index.html)
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-256.png',          // optional, since you have it
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Cache-first for same-origin GET requests
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Only handle same-origin to avoid caching your Apps Script exec, etc.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req).then((res) => {
        // Put a copy in cache for next time
        const copy = res.clone();
        caches.open(VERSION).then((cache) => cache.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => cached); // if network fails, fall back to whatever we had
    })
  );
});

// Optional: allow pages to trigger immediate takeover
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});
