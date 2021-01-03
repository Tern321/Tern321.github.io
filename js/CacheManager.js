class CacheManager {
    static init() {
        console.log("CacheManager init");
        window.addEventListener('fetch', CacheManager.onFetched);
        //addEventListener('install', function (event) {
        //    console.log("install event");
        //event.waitUntil(
        //    caches.open('v1').then(function (cache) {
        //        return cache.addAll([
        //            '/sw-test/',
        //            '/sw-test/index.html',
        //            '/sw-test/style.css',
        //            '/sw-test/app.js',
        //            '/sw-test/image-list.js',
        //            '/sw-test/star-wars-logo.jpg',
        //            '/sw-test/gallery/bountyHunters.jpg',
        //            '/sw-test/gallery/myLittleVader.jpg',
        //            '/sw-test/gallery/snowTroopers.jpg'
        //        ]);
        //    })
        //);
        //});
        //addEventListener('fetch', function (event: any) {
        //    console.log("fetch event " + event.request);
        //event.respondWith(caches.match(event.request).then(function (response) {
        //    // caches.match() always resolves
        //    // but in case of success response will have value
        //    if (response !== undefined) {
        //        return response;
        //    } else {
        //        return fetch(event.request).then(function (response) {
        //            // response may be used only once
        //            // we need to save clone to put one copy in cache
        //            // and serve second one
        //            let responseClone = response.clone();
        //            caches.open('v1').then(function (cache) {
        //                cache.put(event.request, responseClone);
        //            });
        //            return response;
        //        }).catch(function () {
        //            return caches.match('/sw-test/gallery/myLittleVader.jpg');
        //        });
        //    }
        //}));
        //});
    }
}
CacheManager.onFetched = (event) => {
    console.log("fetch event " + event.request);
};
//# sourceMappingURL=CacheManager.js.map