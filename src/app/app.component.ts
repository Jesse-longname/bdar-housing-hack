import { last } from '@angular/router/src/utils/collection';
import { Component } from '@angular/core';
import { versionInfo } from '../environments/version';
import { NotificationService } from './shared/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  buildNo: string;
  constructor(private notificationService: NotificationService) {
    this.buildNo = versionInfo.buildNo;
    this.registerServiceWorker();
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
      navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => {
          reg.onupdatefound = () => {
            let installingWorker = reg.installing;
            installingWorker.onstatechange = () => {
              switch (installingWorker.state) {
                case 'installed':
                  if (navigator.serviceWorker.controller) {
                    this.notificationService.serviceWorkerRefresh();
                    console.log('New or updated content is available.');
                  } else {
                    console.log('Content is now available offline!');
                  }
                  break;
                case 'redundant':
                  console.error('The installing service worker became redundant.');
                  break;
              };
            };
          };
          console.log('SW Registered');
        }).catch((err) => {
          console.log('SW Registration Error', err);
        });
    } else {
      console.log('No service worker or working locally');
    }
  }
}
