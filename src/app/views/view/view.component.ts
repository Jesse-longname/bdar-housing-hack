import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { House } from '../../shared/house';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  lat = 0;
  lng = 0;
  houses: Observable<House[]>;
  constructor(db: AngularFirestore) { 
    this.houses = <Observable<House[]>>db.collection('houses').valueChanges();
    this.houses.subscribe((houses) => {
      let length = houses.length;
      houses.forEach((house) => {
        this.lat += house.lat/length;
        this.lng += house.long/length;
      })
    })
  }

  ngOnInit() {
  }

  log(event: any) {
    console.log(event);
  }

}
