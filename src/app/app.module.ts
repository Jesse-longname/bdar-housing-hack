import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './core/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { NotificationService } from './shared/notification/notification.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AppRoutingModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyALe8f9n25Cpo9IXFpAzumRjQic4Ttp3CI'
    }),
    FlexLayoutModule,
    BrowserAnimationsModule,
    ViewsModule
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
