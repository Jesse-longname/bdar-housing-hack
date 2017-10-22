import { Component, OnInit, Input, Inject, EventEmitter, OnDestroy, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export function calcMortgage(paymentFreq: string, annualInterestRate: number, amortizationYears: number, downPaymentPercent: number, monthlyPaymentAmount: number) {
  let numPayments = 0; // Per year
  switch(paymentFreq) {
    case "bi-monthly":
      numPayments = 6;
      break;
    case "monthly":
      numPayments = 12;
      break;
    case "semi-monthly":
      numPayments = 24;
      break;
    case "bi-weekly":
      numPayments = 26;
      break;
    case "weekly":
      numPayments = 52;
      break;
  }
  let interestForPeriod = (annualInterestRate/100)/numPayments; // r
  let totalPayments = amortizationYears * numPayments // n
  let paymentAmount = (monthlyPaymentAmount*12)/numPayments;
  let top = paymentAmount * (Math.pow(1+interestForPeriod, totalPayments)-1);
  let bot = interestForPeriod*Math.pow(1+interestForPeriod, 300);
  let maxMortgage = top/bot;
  let maxHousePrice = maxMortgage/(1 - (downPaymentPercent/100));
  return maxHousePrice;
}

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

  customAffordableHouse: number;
  affordableHouse: number;
  withRent: number;
  withPanels: number;
  withBoth: number;

  downPayment = 5;
  amortization = 25;
  annualInterest = 3.33;
  paymentFreq = "monthly";

  @Output() goBack = new EventEmitter<null>();

  constructor(private dialog: MatDialog) { 
    
  }

  ngOnInit() {
    this.updateVals();
  }

  more() {

  }

  updateVals() {
    let monthlyPayment = (this.income/12)*.3;
    this.affordableHouse = calcMortgage(this.paymentFreq, this.annualInterest, this.amortization, this.downPayment, monthlyPayment);
    this.withRent = calcMortgage(this.paymentFreq, this.annualInterest, this.amortization, this.downPayment, monthlyPayment+this.rentBenefit);
    this.withPanels = calcMortgage(this.paymentFreq, this.annualInterest, this.amortization, this.downPayment, monthlyPayment+this.solarPanelBenefit);
    this.withBoth = calcMortgage(this.paymentFreq, this.annualInterest, this.amortization, this.downPayment, monthlyPayment+this.solarPanelBenefit+this.rentBenefit);
    this.customAffordableHouse = calcMortgage(this.paymentFreq, this.annualInterest, this.amortization, this.downPayment, monthlyPayment+ (this.willRent ? this.rentBenefit : 0) + (this.solarPanels ? this.solarPanelBenefit : 0));
  }

  back() {
    this.goBack.emit();
  }

  openDialog(showRent: boolean, showSolar: boolean) {
    let dialogRef = this.dialog.open(CalculatedInfoDialog, {
      width: 'auto',
      maxHeight: '75%',
      panelClass: "overflow-container",
      data: { 
        income: this.income,
        showRent: showRent,
        showSolar: showSolar
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      let comp = dialogRef.componentInstance;
      this.paymentFreq = comp.paymentFreq;
      this.amortization = comp.amortization;
      this.annualInterest = comp.annualInterest;
      this.downPayment = comp.downPayment;
      this.updateVals();
    });
  }

  openCustom() {
    this.openDialog(this.willRent, this.solarPanels);
  }

  openRoom() {
    this.openDialog(true, false);
  }

  openSolar() {
    this.openDialog(false, true);
  }

  openBoth() {
    this.openDialog(true, true);
  }

}

@Component({
  selector: 'app-calculated-info',
  templateUrl: './calculated-info.dialog.html' 
})
export class CalculatedInfoDialog {
  avgRent = 550;
  solarBenefit = 5700;
  income: number;
  showRent: boolean;
  showSolar: boolean;
  change = false;

  downPayment = 5;
  amortization = 25;
  annualInterest = 3.33;
  paymentFreq = "monthly";

  tempDownPayment = 5;
  tempAmortization = 25;
  tempAnnualInterest = 3.33;
  tempPaymentFreq = "monthly";

  amount = 0;

  constructor(public dialogRef: MatDialogRef<CalculatedInfoDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.income = data.income;
    this.showRent = data.showRent;
    this.showSolar = data.showSolar;
    console.log(data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.downPayment = this.tempDownPayment;
    this.amortization = this.tempAmortization;
    this.annualInterest = this.tempAnnualInterest;
    this.paymentFreq = this.tempPaymentFreq;
    this.change = false;
  }

  findAmount(): number {
    let monthlyPayment = this.income/12*.3;
    this.amount = calcMortgage(this.tempPaymentFreq, this.tempAnnualInterest, this.tempAmortization, this.tempDownPayment, monthlyPayment);
    if (this.showRent) {
      monthlyPayment += this.avgRent;
    }
    if (this.showSolar) {
      monthlyPayment += (this.solarBenefit/12);
    }
    return calcMortgage(this.tempPaymentFreq, this.tempAnnualInterest, this.tempAmortization, this.tempDownPayment, monthlyPayment);
  }
}