import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefHouseCardComponent } from './brief-house-card.component';

describe('BriefHouseCardComponent', () => {
  let component: BriefHouseCardComponent;
  let fixture: ComponentFixture<BriefHouseCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriefHouseCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefHouseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
