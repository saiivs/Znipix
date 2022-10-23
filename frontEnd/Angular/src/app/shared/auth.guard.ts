import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendService } from '../services/backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  token:string|any=localStorage.getItem('userToken')
  constructor(private backEnd:BackendService,private route:Router){}
  canActivate():any{
    if(localStorage.getItem('userToken')){
      this.backEnd.userCheck().subscribe((data)=>{
        console.log("return");
    if(data.prevent){
      return true;
    }
    else{
      console.log("checkinggg");
      this.route.navigate([''])
      return false;
    }
      })
    }else{
      this.route.navigate([''])
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthGurad2 implements CanActivate{
  constructor(private backEnd:BackendService,private route:Router){}

canActivate(): any {
  if(localStorage.getItem('userToken')){
  this.backEnd.userCheck().subscribe((data)=>{
      console.log(data);

  if(data.prevent){
    this.route.navigate(['home'])
    return false;

  }
  else{
    return true;
  }
    })
  }else{
    return true;
  }
}

}
