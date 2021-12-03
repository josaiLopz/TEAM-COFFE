/*const staticDevCoffee = "dev-coffee-site-v1";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/images/coffee1.jpg",
  "/images/coffee2.jpg",
  "/images/coffee3.jpg",
  "/images/coffee4.jpg",
  "/images/coffee5.jpg",
  "/images/coffee6.jpg",
  "/images/coffee7.jpg",
  "/images/coffee8.jpg",
  "/images/coffee9.jpg"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets);
    })   
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});*/

  //imports
importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
  "/",
  "/index.html",
  "/datos.html",
  "/pedidos.html",
  "/css/style.css",
  "/css/estilos.css",
  "/js/app.js",
  "js/sw-utils",
  "/datos/crearbd.js",
  "/datos/datos.js",
  "/style/bg.png",
  "/images/coffee1.jpg",
  "/images/coffee2.jpg",
  "/images/coffee3.jpg",
  "/images/coffee4.jpg",
  "/images/coffee5.jpg",
  "/images/coffee6.jpg",
  "/images/coffee7.jpg",
  "/images/coffee8.jpg",
  "/images/coffee9.jpg"
];

const APP_SHELL_INMUTABLE=[
    "https://cdn.jsdelivr.net/npm/pouchdb@7.2.1/dist/pouchdb.min.js",
];   

self.addEventListener('install', e =>{
    const cacheStatic = caches.open(STATIC_CACHE).then(cache=>
        cache.addAll(APP_SHELL));
    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache =>
        cache.addAll(APP_SHELL_INMUTABLE));
    e.waitUntil(Promise.all([cacheStatic,cacheInmutable]));
});

self.addEventListener('activate', e=>{
    const respuesta = caches.keys().then(keys=>{
        keys.forEach(key =>{
            if(key!= STATIC_CACHE && key.includes('static')){
                return caches.delete(key);
            }
            if(key!= DYNAMIC_CACHE && key.includes('dynamic')){
                return caches.delete(key);
            }
        });
        
    });
    e.waitUntil(respuesta);
});

self.addEventListener('fetch', e=>{
    const respuesta = caches.match(e.request).then(resp=>{
        if(resp){
            return resp;
        }else{ 
           return fetch(e.request).then(function (newResp) {
               return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newResp);
             });
        }
    });
    e.respondWith(respuesta);
});