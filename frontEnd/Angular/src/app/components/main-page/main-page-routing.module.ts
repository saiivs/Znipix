import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContestDetailsComponent } from './contest-details/contest-details.component';
import { ContestNewFeedsComponent } from './contest-new-feeds/contest-new-feeds.component';
import { MainPageComponent } from './main-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NewFeedsComponent } from './new-feeds/new-feeds.component';
import { ProfileComponent } from './profile/profile.component';

const routes:Routes=[
  {path:'',component:MainPageComponent,

  children:[
    {path:'',component:NewFeedsComponent},
    {path:'profile',component:ProfileComponent},
    {path:'contest',component:ContestNewFeedsComponent},
    {path:'contest-details/:id',component:ContestDetailsComponent}
  ]
}
]


@NgModule({
  imports: [[RouterModule.forChild(routes)]],
  exports: [RouterModule]
})

export class mainRoutingModule{}
