var lastCache = 'restaurant-cache-1';

let urlCache = [
    '/',
    '/.resturant.html',
    './data/restaurants.json', 
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
    './js/main.js',
    './js/dbhelper.js',
    './js/restaurant.html:id1'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(lastCache)
        .then((cache) => {
            console.log(cache);
            return cache.addAll(urlCache)
        }).catch(error => {
            console.log(error);
        })
    )
})

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter(name =>{
                    return name.startsWith('restaurant-') && name != lastCache;
                }) 
            )
        })
    )
})

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request)
        .then((response) => {
            return response || fetch(e.request);
        })
    )
})