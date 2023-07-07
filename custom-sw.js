self.addEventListener('fetch', (event) => {
  event.respondWith(fetchAndUpdateCache(event.request));
});

async function fetchAndUpdateCache(request) {
  const cache = await caches.open('user-api');
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    fetch(request)
      .then((response) => {
        if (response.ok) {
          response.clone().json().then((data) => {
            cachedResponse.json().then((cachedData) => {
              if (!isSameData(data, cachedData)) {
                showNotification();
              }
            });
          });
        }
      })
      .catch((error) => console.error(error));

    return cachedResponse;
  } else {
    return fetch(request);
  }
}

function isSameData(data1, data2) {
  // Compare the received data with the cached data to check for changes
  // Implement your own comparison logic here based on your data structure
  return JSON.stringify(data1) === JSON.stringify(data2);
}

function showNotification() {
  self.registration.showNotification('New User Detected', {
    body: 'A new user has been added.',
    icon: 'path/to/notification-icon.png' // Add the path to your notification icon
  });
}
