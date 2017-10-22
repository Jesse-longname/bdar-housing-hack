import { Component, OnInit, ViewChildren, ViewChild, QueryList } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { House } from '../../shared/house';
import { ActivatedRoute } from '@angular/router';
import { HouseCardComponent } from '../../shared/house-card/house-card.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  lat = 0;
  lng = 0;
  budget: number;
  houses: Observable<House[]>;
  housesNoop: House[];
  constructor(db: AngularFirestore, private route: ActivatedRoute) { 
    this.houses = <Observable<House[]>>db.collection('houses').valueChanges();
    this.houses.subscribe((houses) => {
      this.housesNoop = houses;
      if (this.budget) {
        this.housesNoop.sort((a,b) => {
          return a.price - b.price;
        });
      }
      let length = houses.length;
      houses.forEach((house) => {
        this.lat += house.lat/length;
        this.lng += house.long/length;
      })
    });
  }

  ngOnInit() {
    this.budget = +this.route.snapshot.paramMap.get('budget');
    if (this.budget == 0) {
      this.budget = undefined;
    } 
  }

  log(event: any) {
    console.log(event);
  }

  goTo(index: number) {
    document.getElementById('house-card'+index).scrollIntoView(); 
  }

}
