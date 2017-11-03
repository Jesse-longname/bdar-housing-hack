import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

let something = "hello";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
  navigator.serviceWorker.register('/service-worker.js')
      .then(function (reg) {
          reg.onupdatefound = function () {
              var installingWorker = reg.installing;
              installingWorker.onstatechange = function () {
                  switch (installingWorker.state) {
                      case 'installed':
                          if (navigator.serviceWorker.controller) {
                              // At this point, the old content will have been purged and the fresh content will
                              // have been added to the cache.
                              console.log('New or updated content is available.');
                          } else {
                              console.log('Content is now available offline!');
                          }
                          break;
                      case 'redundant':
                          console.error('The installing service worker became redundant.');
                          break;
                  }
              };
          };
          console.log('SW Registered');
      })
      .catch(function (err) {
          console.log('SW Registration Error', err);
      })
} else {
  console.log('No service worker or working locally');
}
