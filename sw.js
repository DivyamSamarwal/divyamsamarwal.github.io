const CACHE_NAME = 'divyam-portfolio-v1';
const ASSETS = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/images/logo.png',
    '/images/bg1.webp',
    '/images/work.webp',
    '/images/work2.webp',
    '/images/work3.webp'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request))
    );
});
