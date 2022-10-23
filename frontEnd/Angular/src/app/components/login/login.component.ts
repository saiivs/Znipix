import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { token } from 'src/models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private BackEndService:BackendService,private router:Router, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      let userInfo = {
        userName:this.socialUser.name,
        email:this.socialUser.email
      }
      this.BackEndService.googleLogin(userInfo).subscribe((data)=>{
          if(data){
            console.log(data);

            this.accessToken=data;
            localStorage.setItem('userToken',this.accessToken.token);
            localStorage.setItem('userName',this.accessToken.user);
            localStorage.setItem('userId',this.accessToken.userId);
          }
          if(this.accessToken.token){
            console.log("logged in with google");
            this.router.navigate(['home'])
          }
      })
    });
  }

  emaill:string=''
  userExistError:string|undefined;
  accessToken:token|any;
  socialUser!:SocialUser;
  isLoggedin?: boolean;

  onSubmit(form : NgForm){
    this.BackEndService.loginUser(form?.value).subscribe((accToken)=>{
      if(!accToken.exist) this.userExistError='Invalid credentials'
      else if(!accToken.pass) this.userExistError='Invalid Password'
      else{
        this.accessToken=accToken;
        localStorage.setItem('userToken',this.accessToken.token)
        localStorage.setItem('userName',this.accessToken.user)
        localStorage.setItem('userId',this.accessToken.userId)
      if(this.accessToken){
        console.log("approved");
        this.router.navigate(['home'])
      }
      }
    })
  }

  // loginWithGoogle(): void {
  //   console.log("google");
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

}
