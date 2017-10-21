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
import { StartComponent, CalculatedInfoDialog } from './start/start.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    HomeComponent, 
    AboutComponent, 
    ContactComponent, 
    GetStartedComponent, 
    StartComponent,
    RentInfoDialog,
    SolarInfoDialog,
    CalculatedInfoDialog
  ],
  entryComponents: [ SolarInfoDialog, RentInfoDialog, CalculatedInfoDialog ]
})
export class ViewsModule { }
