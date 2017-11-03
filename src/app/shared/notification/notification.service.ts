import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';

@Injectable()
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  serviceWorkerRefresh() {
    let snackBarRef = this.snackBar.open("New Content Available! Please Refresh.", "Refresh");
    snackBarRef.onAction().subscribe(() => {
      console.log("Refresh pressed");
      location.reload();
    });
  }
}
