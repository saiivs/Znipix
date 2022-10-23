import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { userInfo } from 'src/models/models';

@Component({
  selector: 'app-dilog-content',
  templateUrl: './dilog-content.component.html',
  styleUrls: ['./dilog-content.component.scss']
})
export class DilogContentComponent implements OnInit {

userDetails!: userInfo;
reactiveForms!:FormGroup;
router:any
proImg!:File

  constructor(private backEnd : BackendService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.backEnd.getUserPost().subscribe((datas)=>{
      this.userDetails=datas.details
      console.log(this.userDetails);

      })
    this.reactiveForms = new FormGroup({
      email : new FormControl('',  Validators.email),
      name : new FormControl(''),
      phone : new FormControl('', Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$'))
    })
    this.reactiveForms.patchValue({
      email: this.userDetails.email,

    })
  }

  phoneValidation(control:FormControl){
    console.log(control);

    if(!control.value.match('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')){
      return {invalidPhone:true};
    }
    return null
  }

  image(event:any){
    this.proImg=<File>event.target.files[0]

  }

  onSave(){
    console.log(this.reactiveForms);

    let edited ={
      email:this.reactiveForms.get('email')?.value!="" ? this.reactiveForms.get('email')?.value : this.userDetails.email,
      name:this.reactiveForms.get('name')?.value!="" ? this.reactiveForms.get('name')?.value : this.userDetails.userName,
      phone:this.reactiveForms.get('phone')?.value ? this.reactiveForms.get('phone')?.value : this.userDetails.phone
    }
    console.log(edited);

    const formData = new FormData();
    formData.append('image',this.proImg)
    formData.append('email',edited.email)
    formData.append('name',edited.name)
    formData.append('phone',edited.phone)
    console.log(formData.get('image'));

    this.backEnd.editProfile(formData).subscribe((res)=>{
      if(res.status){
      window.location.reload()
      }
    })
  }



}


