import { NextResponse } from 'next/server';

export async function GET() {
  const swContent = `// Service Worker for PWA
const CACHE_NAME = 'visa-jo-v1';
const urlsToCache = [
  '/',
  '/ar',
  '/manifest.json',
  '/img/logo/visajo.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  // Skip navigation preload for non-navigation requests
  if (event.request.mode !== 'navigate') {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
    );
    return;
  }

  // Handle navigation requests with preload
  event.respondWith(
    (async () => {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }

      // Use preloadResponse if available
      if (event.preloadResponse) {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }
        } catch (error) {
          // Preload failed, continue to fetch
        }
      }

      // Fetch from network
      return fetch(event.request);
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
`;
  
  return new NextResponse(swContent, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}

