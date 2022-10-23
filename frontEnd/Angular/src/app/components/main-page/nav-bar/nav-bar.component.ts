import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.logedName=localStorage.getItem('userName')||""
  }

  logedName:string|undefined

  navigateToProfile(){
    this.router.navigate(['newfeeds/profile'])
  }

  navigateToNewfeeds(){
    this.router.navigate(['/newfeeds'])
  }

  logOut(){
    localStorage.removeItem('userToken')
    this.router.navigate([''])
  }

  home(){
    this.router.navigate(['home'])
  }

}
