const CACHE_NAME = "desapegai-v2";

const FILES = [
"./",
"./index.html",
"./manifest.json"
];

self.addEventListener("install", event => {
event.waitUntil(
caches.open(CACHE_NAME).then(async cache => {
for (const file of FILES) {
try {
await cache.add(file);
} catch (erro) {
console.log("Não foi possível colocar no cache:", file);
}
}
})
);

self.skipWaiting();
});

self.addEventListener("activate", event => {
event.waitUntil(
caches.keys().then(keys =>
Promise.all(
keys
.filter(key => key !== CACHE_NAME)
.map(key => caches.delete(key))
)
)
);

self.clients.claim();
});

self.addEventListener("fetch", event => {
event.respondWith(
caches.match(event.request).then(response => {
return response || fetch(event.request);
})
);
});
