const cacheName = 'mexicana-cardapio-v11';
const assets = [
  './', './index.html', './app.js', './pedido.js', './carrinho.js', './menu.js', './style.css', './manifest.webmanifest',
  './grafismo-verde.webp', './titulo-cardapio.png', './logo-lanchonete-mexicana.png', './icone-mexicana-192.png', './icone-mexicana-512.png',
  './fotos/burrito.webp',
  './fotos/caldos.webp',
  './fotos/cervejas.webp',
  './fotos/churritos.webp',
  './fotos/combinados.webp',
  './fotos/drinks.webp',
  './fotos/escondidinho.webp',
  './fotos/gran-burrito.webp',
  './fotos/gran-gateau.webp',
  './fotos/pastel-doce.webp',
  './fotos/pastel-salgado.webp',
  './fotos/pratos-especiais.webp',
  './fotos/quesadillas-doces.webp',
  './fotos/refrigerantes-agua.webp',
  './fotos/salada.webp',
  './fotos/sucos.webp',
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
