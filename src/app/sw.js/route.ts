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
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
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

