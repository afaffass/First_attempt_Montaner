// ============================================
// sw.js — Service Worker for AdDU Alumni Portal
// Place this file in: public/sw.js
// ============================================

// Bump this version string whenever you deploy new changes.
// This ensures old caches are cleared automatically.
const CACHE_NAME = 'addu-alumni-portal-v1';

// Core assets to pre-cache on install (your app shell)
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

// ─── INSTALL ─────────────────────────────────────────────────────────────────
// Fires once when the service worker is first registered.
// Pre-caches the core app shell so the app works offline immediately.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching app shell');
      return cache.addAll(PRECACHE_URLS);
    })
  );
  // Activate immediately without waiting for old SW to be released
  self.skipWaiting();
});

// ─── ACTIVATE ────────────────────────────────────────────────────────────────
// Fires after install, once the old SW is no longer controlling any pages.
// Cleans up outdated caches from previous versions to free up storage.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME) // only delete old caches
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  // Take control of all open pages immediately
  self.clients.claim();
});

// ─── FETCH ───────────────────────────────────────────────────────────────────
// Intercepts every network request.
// Strategy: Cache-First with Network Fallback
//   1. Check cache first → return instantly if found (works offline)
//   2. If not cached → fetch from network, cache it, then return it
//   3. If network also fails → serve /index.html as offline fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests (Google Fonts, external APIs, etc.)
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // ✅ Found in cache — return immediately (offline-safe)
      if (cachedResponse) {
        return cachedResponse;
      }

      // Not in cache — try the network
      return fetch(event.request)
        .then((networkResponse) => {
          // Don't cache invalid or non-basic responses
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== 'basic'
          ) {
            return networkResponse;
          }

          // Clone response before caching (response body can only be read once)
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse; // ✅ Served from network + cached for next time
        })
        .catch(() => {
          // Both cache and network failed — serve the app shell as fallback
          return caches.match('/index.html');
        });
    })
  );
});
