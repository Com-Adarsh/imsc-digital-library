// Offline support: pages are network-first, static files are stale-while-revalidate.
// Bump V when you change files to clear old caches.
const V = 'imsc-lib-v2';
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(V).then(c => c.addAll(['./', 'manifest.webmanifest'])).catch(() => {}));
});
self.addEventListener('activate', e => e.waitUntil(
  caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== V && k.startsWith('imsc-')).map(k => caches.delete(k))))
    .then(() => self.clients.claim())
));
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return; // Sheet/Drive never cached here
  if (r.mode === 'navigate') {
    e.respondWith(
      fetch(r).then(x => { const c = x.clone(); caches.open(V).then(k => k.put('./', c)); return x; })
        .catch(() => caches.match('./').then(x => x || caches.match('offline.html')))
    );
    return;
  }
  e.respondWith(caches.open(V).then(async c => {
    const hit = await c.match(r);
    const net = fetch(r).then(x => { if (x.ok) c.put(r, x.clone()); return x; }).catch(() => hit);
    return hit || net;
  }));
});
