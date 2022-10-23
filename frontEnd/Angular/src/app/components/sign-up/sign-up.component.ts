import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  reactiveForm:FormGroup|undefined|any;
  userExistError:string|undefined
  
  constructor(private signup:BackendService,private router:Router) { }

  ngOnInit(): void {
    this.reactiveForm=new FormGroup({
      userName : new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email]),
      phone:new FormControl(null,[Validators.required,Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')]),
      password:new FormControl(null,[Validators.required,Validators.minLength(4),this.nospaceAllowed]),
    })
  }



  onSubmit(){
    this.signup.signup(this.reactiveForm?.value).subscribe((data)=>{
      if(data.exist){
        this.userExistError='This user already exist'
      }
      else{
        this.router.navigate([''])
      }
    })
  }

  nospaceAllowed(control:FormControl){
    if(control.value !=null && control.value.indexOf(' ') != -1){
      return {spaceAllowed:true}
    }
    return null;
  }


}
