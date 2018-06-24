
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

// GOOGLE ANALYTICS
