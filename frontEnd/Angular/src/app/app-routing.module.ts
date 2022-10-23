import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard, AuthGurad2 } from './shared/auth.guard';




const routes: Routes = [
 {path:'',component:LoginComponent,canActivate:[AuthGurad2]},
 {path:'sign_up',component:SignUpComponent},
 {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
 {path:'newfeeds',loadChildren:()=>import('./components/main-page/main-page.module').then((parent)=>parent.MainModule)},
 {path:'profile',loadChildren:()=>import('./components/main-page/main-page.module').then((parent)=>parent.MainModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
