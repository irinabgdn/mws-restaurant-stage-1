var currentCache = 'static-rr-1';

const urlCache = [
    './skeleton',
    '/restaurant.html',
    '/data/restaurants.json', 
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './css/styles.css',
    './js/main.js',
    './js/restaurant_info.js',
    './js/dbhelper.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(currentCache)
        .then((cache) => {
            console.log('Opened cache:' + cache);
            return cache.addAll(urlCache);
        }).catch(error => {
            console.log(error);
        })
    )
})

// Return request
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
        .then((response) => {
            return response || fetch(e.request);
        }).catch(error => {
            console.log('Data not fetched:', error);
        })
    )
})