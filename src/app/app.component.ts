import { Component } from '@angular/core';
import { versionInfo } from '../environments/version';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  buildNo: string;
  constructor() {
    this.buildNo = versionInfo.buildNo;
  }
}
