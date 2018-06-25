# Background
Angular simple PWA to store user contacts built on top of MongoDB, Express, Angular, and Node.js. A quick, mobile-first app for manage contacts information, with native-like ease of use & offline availability. App attributes:
* Installable to the user’s home screen
* Able to start in offline mode
* In offline mode, show dynamic content from cache
* In online mode, try to get dynamic content from the network (backend). In case of fail - fallback to the cached content
* Service worker notifications
* Able to handle and store user’s submitted data (message) in offline mode, for sending it automatically to the backend (after getting the stable internet connectivity)

# Prerequisites
Latest stable versions of `node` and `npm` installed.
- Mongo DB server locally installed and running. See the Mongo DB [install instructions](http://docs.mongodb.org/manual/installation/) for your platform to install a local Mongo DB server.
- Having `yarn` installed is strongly recommended.
- Any simple web server or browser extension. Recommended:
  - [http-server](https://www.npmjs.com/package/http-server). This is preferred option.
  - [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb/). Use this as a fallback option.
- Browsers:
  - Chrome 53 or above
  - Firefox 51 or above


# Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Running Locally
To get started, install Angular CLI from [npm](https://www.npmjs.com/) and install dependencies. This project was generated with Angular CLI version 6.0.8.
```shell
npm install -g @angular/cli
npm install
```

### Run Node server application
```shell
npm run start-server
```
Livereloading dev server now available at `http://localhost:3000/`

The API provides GET, POST and DELETE to manage all user related needs. http://localhost:3000/api/users to list and http://localhost:3000/api/users/{id} to manage single users

### Run client side Angular app
```shell
npm run start
```

Livereloading dev server now available at `http://localhost:4200/`

### Run client side Angular app with Service Worker
```shell
npm install -g http-server
npm run build-full-workbox
http-server dist -c0
```
We use `-c0` parameter to set `cache-control: max-age=0` header, which is important for the service worker

Server now available at `http://localhost:8080/`, without livereload

# Testing offline mode
## App shell files
The Service Workers pane in the Application panel is the main place in DevTools to inspect and debug service workers. The Offline checkbox puts DevTools into offline mode. This is equivalent to the offline mode available from the Network panel, or the Go offline option in the [Command Menu](https://developers.google.com/web/tools/chrome-devtools/ui#command-menu). Check the offline checkbox in DevTools and refresh the page. Our app is available for offline usage!


## Runtime caching
When a route cannot be found in cache, it is fetched. If the fetch returns a valid response, it is added to the Application Cache. Data calls to the api will be cached with runtime caching

After responding, another fetch is fired off to check if the response has changed. If the response changed, it will cache the new response for next time.


## Adding to the home screen
1. Set the following flags in your chrome profile via `chrome://flags`:
    - `chrome://flags/#bypass-app-banner-engagement-checks`
    - `chrome://flags/#enable-app-banners`
2. These will ensure that the A2HS banner appears immediately instead of waiting for 5 minutes, and enables the feature on desktop for testing.
3. Checking you've configured Chrome correctly. Visit airhorner.com and click ‘install’, checking that the A2HS prompt appears
4. If there is still no prompt, just click “Add to homescreen” link in DevTools -> Application -> Manifest section


## Workbox Background Sync
The best approach to test that is to do the following: 
1. Load up a page and register your service worker.
2. Puts DevTools into offline mode from the `Application panel`. This is equivalent to the offline mode available from the `Network panel`
3. Make network requests that should be queued with Workbox Background Sync.
4. You can check the requests have been queued by looking in `Chrome DevTools > Application > IndexedDB > workbox-background-sync > requests`
5. Now turn on your network or web server.
6. Force an early sync event by going to Chrome DevTools > Application > Service Workers, enter the tag name of `workbox-background-sync:usersQueue` and then clicking the `Sync` button.
