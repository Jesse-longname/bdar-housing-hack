import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {

  willSmartGrid: boolean;
  willRent: boolean;
  householdIncome: number;
  submitted = false;
  

  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
  }

  submit() {
    // this.router.navigate(['/start', { income: this.householdIncome, car: this.ownsCar, rent: this.willRent, host: this.willHost}]);
    console.log(this.householdIncome);
    this.submitted = true;
  }

  openRentInfo() {
    let dialogRef = this.dialog.open(RentInfoDialog, {
      width: 'auto',
      maxHeight: '75%',
      panelClass: "overflow-container",
      data: { }
    });
  }

  openSolarInfo() {
    let dialogRef = this.dialog.open(SolarInfoDialog, {
      width: 'auto',
      maxHeight: '75%',
      panelClass: "overflow-container",
      data: { }
    });
  }

  back() {
    this.submitted = false;
    this.householdIncome = undefined;
    this.willRent = undefined;
    this.willSmartGrid = undefined;
  }
}

@Component({
  selector: 'solar-info-dialog',
  template: `
  <p>The Government of Ontario offers many incentives to support Renewable Energy Infrastructure.</p>
  <p>With the help of The City of Barrie and BDAR, your house can be outfitted with a Solar Panel roof that will generate electricity to 
  power you home and to sell back to the Ontario electricity grid.</p>
  <p>With this, you can increase your buying power and afford a more expensive house, or pay off your new house in a lower time frame.</p>
  <p>Find out more <a href="https://www.canada.ca/en/revenue-agency/services/tax/businesses/other-topics-businesses/ontario-s-fit-microfit-programs.html">here</a>.</p>
  <button mat-raised-button color="accent" (click)="dialogRef.close()">Close</button>
  `
})
export class SolarInfoDialog {
  constructor(public dialogRef: MatDialogRef<SolarInfoDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'rent-info-dialog',
  template: `
  <p>Renting out a room and hosting on Airbnb are great ways to earn extra money to pay off your mortgage.</p>
  <p>Airbnb is a service where you offer housing accomodations to people for a short period of time. 
  To find out more about Airbnb, visit <a href="https://www.airbnb.ca/host/homes">airbnb.ca</a>. </p>
  <p>Renting allows you to create a lease and rent out a room to tenants for a longer duration, usually monthly or annually.</p>
  <p>For people that aren't familiar with being a landlord, these options can seem intimidating. However,
  The City of Barrie and BDAR will help you every step of the way. Whether it is creating a post on Airbnb or
  setting up a lease, we will make it easy for you to have your house pay off it's own mortgage.</p>
  <button mat-raised-button color="accent" (click)="dialogRef.close()">Close</button>
   `
})
export class RentInfoDialog {
  constructor(public dialogRef: MatDialogRef<RentInfoDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


