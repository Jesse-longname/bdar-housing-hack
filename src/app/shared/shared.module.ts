import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { MapComponent } from './map/map.component';
import { HouseCardComponent } from './house-card/house-card.component';
import { MaterialModule } from '../core/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HouseInfoComponent } from './house-info/house-info.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    AgmCoreModule,
  ],
  exports: [HouseCardComponent],
  entryComponents: [HouseInfoComponent],
  declarations: [LogoComponent, MapComponent, HouseCardComponent, HouseInfoComponent]
})
export class SharedModule { }
