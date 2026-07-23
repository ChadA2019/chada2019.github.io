const CACHE="balanceiq-v9-9-0-20260723-009";
const ASSETS=[
  "./","index.html","styles.css","app.js","manifest.webmanifest","cloud-sync.js",
  "icon.svg","icon-192.png","icon-512.png","icon-maskable-512.png"
];

self.addEventListener("install",event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));
});

self.addEventListener("activate",event=>{
  event.waitUntil((async()=>{
    const keys=await caches.keys();
    await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  const url=new URL(event.request.url);
  if(url.origin!==self.location.origin)return;

  if(event.request.mode==="navigate"){
    event.respondWith((async()=>{
      try{
        const response=await fetch(event.request);
        const cache=await caches.open(CACHE);
        cache.put("index.html",response.clone());
        return response;
      }catch{
        return (await caches.match("index.html"))||(await caches.match("./"));
      }
    })());
    return;
  }

  event.respondWith((async()=>{
    const cached=await caches.match(event.request);
    const network=fetch(event.request).then(async response=>{
      if(response&&response.ok){
        const cache=await caches.open(CACHE);
        cache.put(event.request,response.clone());
      }
      return response;
    });
    return cached||network;
  })());
});
