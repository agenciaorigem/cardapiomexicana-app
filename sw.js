const cacheName = 'mexicana-cardapio-v8';
const assets = [
  './', './index.html', './app.js', './menu.js', './style.css', './manifest.webmanifest',
  './grafismo-verde.webp', './titulo-cardapio.png', './logo-lanchonete-mexicana.png',
  './icon-192.png', './icon-512.png', './splash-512.png', './apple-touch-icon.png',
  './fotos/burrito.webp',
  './fotos/caldos.webp',
  './fotos/combinados.webp',
  './fotos/escondidinho.webp',
  './fotos/pastel-doce.webp',
  './fotos/pastel-salgado.webp',
  './fotos/salada.webp',
  './fotos/sobremesas.webp',
  './fotos/tacos.webp',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(assets)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key.startsWith('mexicana-cardapio-') && key !== cacheName)
        .map((key) => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  const key = request.mode === 'navigate' ? './index.html' : request;
  event.respondWith(fetch(request).catch(async () =>
    (await caches.open(cacheName)).match(key).then((response) => response ?? Response.error())
  ));
});
