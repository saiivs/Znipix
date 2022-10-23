import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  constructor(private inject:Injector){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService=this.inject.get(BackendService)
    let jwtToken=req.clone({
      setHeaders:{
        Authorise:authService.getToken()
      }
    })
    return next.handle(jwtToken);
  }
}
