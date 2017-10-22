import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { House } from '../house';
import { MatCard} from '@angular/material';
import { MatDialog } from '@angular/material';
import { HouseInfoComponent } from '../house-info/house-info.component';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.css']
})
export class HouseCardComponent implements OnInit {
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
