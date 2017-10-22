import { Component, OnInit, Input } from '@angular/core';
import { House } from '../house';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.css']
})
export class HouseCardComponent implements OnInit {
  @Input() house: House;
  @Input() label: number;

  constructor() { }

  ngOnInit() {
  }

}
