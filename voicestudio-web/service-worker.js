const CACHE = 'voicestudio-web-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg'];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  const req = event.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin || /\/v1\/|\/api\//.test(url.pathname)) return;
  event.respondWith(fetch(req).then(resp => { if (resp.ok && (req.mode === 'navigate' || SHELL.some(p => url.pathname.endsWith(p.replace('./',''))))) caches.open(CACHE).then(cache => cache.put(req, resp.clone())); return resp; }).catch(async () => (await caches.match(req)) || (await caches.match('./index.html'))));
});