import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {


  constructor(private router:Router,private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.logedName=localStorage.getItem('userName')||""
  }

  logedName:string|undefined

  logOut(){

    this.socialAuthService.signOut();
    localStorage.removeItem('userToken')
    this.router.navigate([''])
  }

}
