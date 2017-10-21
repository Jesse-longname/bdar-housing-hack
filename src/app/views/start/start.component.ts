import { Component, OnInit, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  @Input() income: number;
  @Input() ownsCar: boolean;
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
  
  constructor() { 
    
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

}
