import { Component, OnInit, Input, Inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  @Input() income: number;
  @Input() willRent: boolean;
  @Input() solarPanels: boolean;

  rentBenefit: number = 6600 / 12;
  solarPanelBenefit: number = 5700 / 12;
  airbnbBenefit: number = 6600 / 12;

  customAffordableHouse: number;
  affordableHouse: number;
  withRent: number;
  withPanels: number;
  withBoth: number;
  
  constructor(private dialog: MatDialog) { 
    
  }

  ngOnInit() {
    this.affordableHouse = (this.income/12)*.3*206.78;
    this.withRent = this.affordableHouse + (this.rentBenefit*206.78);
    this.withPanels = this.affordableHouse + (this.solarPanelBenefit*206.78);
    this.withBoth = this.affordableHouse + (this.rentBenefit*206.78) + (this.solarPanelBenefit*206.78);

    this.customAffordableHouse = (this.income/12)*.3 + (this.willRent ? 1 * this.rentBenefit : 0) + (this.solarPanels ? 1 * this.solarPanelBenefit : 0);
    this.customAffordableHouse *= 206.78;
  }

  more() {

  }

  openCustom() {
    let dialogRef = this.dialog.open(CalculatedInfoDialog, {
      width: 'auto',
      height: '75%',
      data: { 
        income: this.income,
        showRent: this.willRent,
        showSolar: this.solarPanels
      }
    });
  }

  openRoom() {
    let dialogRef = this.dialog.open(CalculatedInfoDialog, {
      width: 'auto',
      height: '75%',
      data: { 
        income: this.income,
        showRent: true,
        showSolar: false
      }
    });
  }

  openSolar() {
    let dialogRef = this.dialog.open(CalculatedInfoDialog, {
      width: 'auto',
      height: '75%',
      data: { 
        income: this.income,
        showRent: false,
        showSolar: true
      }
    });
  }

  openBoth() {
    let dialogRef = this.dialog.open(CalculatedInfoDialog, {
      width: 'auto',
      height: '75%',
      data: { 
        income: this.income,
        showRent: true,
        showSolar: true
      }
    });
  }

}

@Component({
  selector: 'app-calculated-info',
  template: `
  <div>
    <p>Based on your annual household income, and the <a href="alink">definition of affordable income</a>, here is what we used to calculate the base house you can afford:</p>
    <ul>
      <li>Mortgage Amortization: {{amortization}} Months ({{amortization/12}} Years)</li>
      <li>Interest Rate: {{annualInterest}}%</li>
      <li>Payment Frequency: {{paymentFreq}}</li>
      <li>Monthly payments of 30% Monthly Income: {{(income/12)*.3 | currency:'CAD':true}}</li>
    </ul>
    <p>This means you can afford: <strong>{{(income/12)*.3*206.78 | currency:'CAD':true}}</strong></p>
  </div>
  <div *ngIf="showRent">
    <p>The average rent for a room in Barrie is {{avgRent | currency:'CAD':true }} per month. If you rent out a single room for this price, you could afford an extra {{avgRent*206.78 | currency:'CAD':true}} towards your house.</p>
  </div>
  <div *ngIf="showSolar">
    <p>Installing solar panels can save you {{solarBenefit | currency:'CAD':true }} annually. Assuming you put all of the savings into your house, you could afford an extra {{(solarBenefit/12)*206.78 | currency:'CAD':true}} towards your hosue.</p>
  </div>
  <div *ngIf="showSolar || showRent">
    <p>Adding this up, for a house you can afford: <strong>{{(income/12)*.3*206.78 + (showSolar ? (solarBenefit/12)*206.78 :  0) + (showRent ? avgRent*206.78 : 0) | currency:'CAD':true}}</strong>
  </div>
  <button mat-raised-button color="accent" (click)="dialogRef.close()">Close</button>
  `
})
export class CalculatedInfoDialog {
  avgRent = 550;
  solarBenefit = 5700;
  amortization = 300;
  annualInterest = 3.33;
  paymentFreq = "Monthly";
  income: number;
  showRent: boolean;
  showSolar: boolean;

  constructor(public dialogRef: MatDialogRef<CalculatedInfoDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.income = data.income;
    this.showRent = data.showRent;
    this.showSolar = data.showSolar;
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}