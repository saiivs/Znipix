import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { mainRoutingModule } from './main-page-routing.module';
import { CommonModule } from "@angular/common";
import {MatMenuModule} from '@angular/material/menu'
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { NewFeedsComponent } from './new-feeds/new-feeds.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { MainPageComponent } from './main-page.component';
import { DilogEditComponent } from './dilog-edit/dilog-edit.component';
import { DilogContentComponent } from './dilog-content/dilog-content.component';
import { ContestNewFeedsComponent } from './contest-new-feeds/contest-new-feeds.component';
import { ContestDetailsComponent } from './contest-details/contest-details.component';




@NgModule({
  declarations:[
    NewFeedsComponent,
    NavBarComponent,
    ProfileComponent,
    MainPageComponent,
    DilogEditComponent,
    DilogContentComponent,
    ContestNewFeedsComponent,
    ContestDetailsComponent
  ],
  imports:[
    mainRoutingModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
