import { Component, OnInit, Input, Inject } from '@angular/core';
import { House } from '../house';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-house-info',
  templateUrl: './house-info.component.html',
  styleUrls: ['./house-info.component.css']
})
export class HouseInfoComponent implements OnInit {
  @Input() house: House;

  constructor(public dialogRef: MatDialogRef<HouseInfoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.house = data.house;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
