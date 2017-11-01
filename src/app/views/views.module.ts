import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material.module';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { GetStartedComponent, SolarInfoDialog, RentInfoDialog } from './get-started/get-started.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StartComponent, CalculatedInfoDialog } from './start/start.component';
import { ViewComponent } from './view/view.component';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AgmCoreModule,
    AgmSnazzyInfoWindowModule
  ],
  declarations: [
    HomeComponent, 
    AboutComponent, 
    ContactComponent, 
    GetStartedComponent, 
    StartComponent,
    RentInfoDialog,
    SolarInfoDialog,
    CalculatedInfoDialog,
    ViewComponent
  ],
  entryComponents: [ SolarInfoDialog, RentInfoDialog, CalculatedInfoDialog ]
})
export class ViewsModule { }
