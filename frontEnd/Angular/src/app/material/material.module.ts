import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu'
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const MaterialComponents = [
  MatButtonModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatDialogModule,
  MatInputModule,
  MatDatepickerModule,
  MatSnackBarModule

]



@NgModule({

  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
