const CACHE = 'voicestudio-web-v1';
const ROOT = new URL('./', self.location.href).pathname;
const SHELL = new Set([ROOT, ROOT + 'index.html', ROOT + 'manifest.webmanifest', ROOT + 'icon.svg']);
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(Array.from(SHELL))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const req = event.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin || !SHELL.has(url.pathname)) return;
  event.respondWith(fetch(req).then(resp => {
    if (resp.ok) caches.open(CACHE).then(cache => cache.put(req, resp.clone()));
    return resp;
  }).catch(async () => (await caches.match(req)) || (await caches.match(new URL('./index.html', self.location.href).href))));
});