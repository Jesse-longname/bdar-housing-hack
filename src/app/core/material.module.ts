import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatToolbarModule, 
  MatButtonModule, 
  MatSidenavModule, 
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatDialogModule,
  MatCardModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatCardModule,
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatCardModule,
  ],
  declarations: []
})
export class MaterialModule { }
