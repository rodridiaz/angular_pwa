
// Let's have it locally. Run "workbox copyLibraries dist"
importScripts('workbox-v3.3.0/workbox-sw.js')

// SETTINGS

// Verbose logging even for the production
workbox.setConfig({ debug: true })
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug)

// Modify SW update cycle
workbox.skipWaiting()
workbox.clientsClaim()

// PRECACHING

// We inject manifest here using "workbox-build" in workbox-build-inject.js
workbox.precaching.precacheAndRoute([])

// RUNTIME CACHING

// Google fonts
workbox.routing.registerRoute(
 new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
 workbox.strategies.staleWhileRevalidate({
   cacheName: 'googleapis',
   plugins: [
     new workbox.expiration.Plugin({
       maxEntries: 30
     })
   ]
 })
)

// API with network-first strategy
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)(api\/)users/,
  workbox.strategies.networkFirst()
)

// API with network-first strategy
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)(images\/)([^\/\s]+)/,
  workbox.strategies.networkFirst()
)

// API with network-first strategy
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)(users\/)([^\/\s]+)/,
  workbox.strategies.networkFirst()
)

// API with network-first strategy
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)create/,
  workbox.strategies.networkFirst()
)

// API with network-first strategy
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)(edit\/)([^\/\s]+)/,
  workbox.strategies.networkFirst()
)

// PUSH NOTIFICATIONS

// BACKGROUND SYNC

const bgSyncPlugin = new workbox.backgroundSync.Plugin('usersQueue', {
  callbacks: {
    queueDidReplay: (data) => {
      if (data && data.length > 0 && !data[0].error) {
        self.registration.showNotification('WTC Exercise', {
          body: getMessageToShow(data),
          icon: '/assets/favicon/android-chrome-192x192.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'background-sync',
          requireInteraction: true
        })
      }
    }
  },
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours
})

// Registering a route for retries
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)(api\/)users/,
  workbox.strategies.networkOnly({
    plugins: [bgSyncPlugin]
  }),
  'POST'
)

// Registering a route for retries
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)(api\/)users/,
  workbox.strategies.networkOnly({
    plugins: [bgSyncPlugin]
  }),
  'PUT'
)

// Registering a route for retries
workbox.routing.registerRoute(
  /(http[s]?:\/\/)?([^\/\s]+\/)(api\/)users/,
  workbox.strategies.networkOnly({
    plugins: [bgSyncPlugin]
  }),
  'DELETE'
)

// Build message to show into notification
function getMessageToShow(data) {
  const msgArray = data.map(ele => {
      return ele.request.method.toLowerCase();
  });
  const usedMethods = getWordCnt(msgArray);
  const msg = getMessageFromMethodList(usedMethods);
  return msg;
}

function getWordCnt(wordsArray) {
  let result = [];
  if (wordsArray instanceof Array) {
    result = wordsArray.reduce((prev, next) => {
        prev[next] = (prev[next] + 1) || 1;
        return prev;
    },{});
  }
  return result;
}

function getMessageFromMethodList(msgs) {
  let message = 'Synchronized requests on the server: \n';
  if (msgs.put > 0) {
    message += msgs.put > 1 ? `${msgs.put} updated users\n` : `1 updated user\n`
  }
  if (msgs.post > 0) {
    message += msgs.post > 1 ? `${msgs.post} inserted users\n` : `1 inserted user\n`
  }
  if (msgs.delete > 0) {
    message += msgs.delete > 1 ? `${msgs.delete} deleted users` : `1 deleted user`
  }
  message += `\nPlease, reload the page`
  return message;
}


// GOOGLE ANALYTICS
