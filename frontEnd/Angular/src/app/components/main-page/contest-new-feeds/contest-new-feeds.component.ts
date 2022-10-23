import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { contests } from 'src/models/models';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-contest-new-feeds',
  templateUrl: './contest-new-feeds.component.html',
  styleUrls: ['./contest-new-feeds.component.scss']
})
export class ContestNewFeedsComponent implements OnInit {

  reactiveForm!:FormGroup;
  contests:contests[]=[]
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  constructor(private backEnd:BackendService,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.backEnd.getContests().subscribe((data)=>{
        this.contests=data

    })
    this.reactiveForm = new FormGroup({
      contestName : new FormControl('',Validators.required),
      sponserName : new FormControl('',Validators.required),
      rulesInstrutions: new FormControl('',Validators.required),
      firstPrice : new FormControl('',Validators.required),
      secondPrice : new FormControl('',Validators.required),
      thirdPrice : new FormControl('',Validators.required),
      date : new FormControl('',[Validators.required,this.validateDate]),
    })

    this.reactiveForm.patchValue({
      sponserName:localStorage.getItem('userName')
    })
  }

  validateDate(control:FormControl){
    let date = new Date
    let userDate = control.value
    let d1= new Date(userDate)
    if(d1<=date){
      return {invalidDate:true}
    }
    return null
  }



  onSubmit(){
    this.snackBar.open('Contest is created','',{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000
    })
    this.contests.push(this.reactiveForm.value)
    this.backEnd.Contest(this.reactiveForm.value).subscribe()
  }

}
