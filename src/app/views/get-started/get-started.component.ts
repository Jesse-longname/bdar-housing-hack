import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {

  ownsCar: boolean;
  willRent: boolean;
  householdIncome: number;
  submitted = false;
  

  constructor(private router: Router) { }

  ngOnInit() {
  }

  submit() {
    // this.router.navigate(['/start', { income: this.householdIncome, car: this.ownsCar, rent: this.willRent, host: this.willHost}]);
    console.log(this.householdIncome);
    this.submitted = true;
  }
}


