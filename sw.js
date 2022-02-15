/* self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('jokeret').then(function(cache) {
        return cache.addAll([
            '/index.html',
        ]);
      })
    );
   });
   
   self.addEventListener('fetch', function(e) {
     console.log(e.request.url);
     e.respondWith(
       caches.match(e.request).then(function(response) {
         return response || fetch(e.request);
       })
     );
   }); */

   self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open('video-store').then(function(cache) {
        return cache.addAll([
          '/index.html',
          '/css/style.css',
          '/css/materialize.min.css',
          '/js/browser.js',
          '/js/bone/preloader.js',
   
        ]);
      })
    );
   });
   
   self.addEventListener('fetch', function(e) {
     console.log(e.request.url);
     e.respondWith(
       caches.match(e.request).then(function(response) {
         return response || fetch(e.request);
       })
     );
   })
   