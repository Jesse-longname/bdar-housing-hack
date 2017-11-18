import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brief-house-card',
  templateUrl: './brief-house-card.component.html',
  styleUrls: ['./brief-house-card.component.css']
})
export class BriefHouseCardComponent implements OnInit {
  defulatImageUrl: 'http://images.all-free-download.com/images/graphiclarge/green_house_icon_312519.jpg';

  constructor() { }

  ngOnInit() {
  }

}
