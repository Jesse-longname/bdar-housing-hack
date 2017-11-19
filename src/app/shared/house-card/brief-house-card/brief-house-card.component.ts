import { Component, OnInit, Input } from '@angular/core';
import { House } from '../../house';
import { MatDialog } from '@angular/material';
import { HouseInfoComponent } from '../../house-info/house-info.component';

@Component({
  selector: 'app-brief-house-card',
  templateUrl: './brief-house-card.component.html',
  styleUrls: ['./brief-house-card.component.css']
})
export class BriefHouseCardComponent implements OnInit {
  defaultImageUrl: 'http://images.all-free-download.com/images/graphiclarge/green_house_icon_312519.jpg';
  @Input() house: House;
  @Input() budget: number;
  @Input() label: number;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    
  }

  view() {
    let dialogRef = this.dialog.open(HouseInfoComponent, {
      width: 'auto',
      maxHeight: '75%',
      panelClass: 'Overflow-container',
      data: {
        house: this.house,
      }
    });
  }
}
