import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo/logo.component';
import { MapComponent } from './map/map.component';
import { HouseCardComponent } from './house-card/house-card.component';
import { MaterialModule } from '../core/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [HouseCardComponent],
  declarations: [LogoComponent, MapComponent, HouseCardComponent]
})
export class SharedModule { }
