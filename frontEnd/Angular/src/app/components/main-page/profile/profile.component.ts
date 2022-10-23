import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import { userInfo, userProfileImage } from 'src/models/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('caption') caption:ElementRef|undefined;
  show:boolean=true;
  files:File|any;
  filePath:string|null=''
  afterUpload:userProfileImage[]|any
  userDetails:userInfo|undefined
  cap:string=''
  save:boolean=true;
  reactiveForm!:FormGroup
  profileImg!:string;

  constructor(private backEnd:BackendService) {

   }

  ngOnInit(): void {
     this.reactiveForm = new FormGroup({
      name: new FormControl('',Validators.required),
      email: new FormControl('',Validators.email),
      phone: new FormControl(9633596087,[Validators.required,Validators.pattern('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')])
    })

    fetch(`http://localhost:3000/images/userProfile/${localStorage.getItem('userId')}.jpg`).then((response)=>{
        if(response.ok){
          console.log(response);
          this.profileImg=`http://localhost:3000/images/userProfile/${localStorage.getItem('userId')}.jpg`;
        }
        else{
          this.profileImg='http://localhost:3000/images/assets/user (1).png';
        }
      })

     this.backEnd.getUserPost().subscribe((datas)=>{
     this.afterUpload=datas.data;
     this.userDetails=datas.details
     })
  }

  awakeSave(form:FormGroup){
    if(form?.touched){
      this.save=!this.save;
    }
  }

  upload(){
    this.show=false;
  }

  close(){
    this.show=!this.show
    this.filePath=null
  }

  imageFile(event:any){
    if(event.target.files){
      this.files=<File>event.target.files[0]
      let reader = new FileReader()
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>{
        this.filePath=event.target.result
      }
  }
}

image(){
  this.show=!this.show
  this.filePath=""
  const formData = new FormData()
  this.cap=this.caption?.nativeElement.value
  formData.append('image',this.files)
  formData.append('cap',this.cap)
  console.log(formData.get('image'));

  this.backEnd.userPost(formData).subscribe((image)=>{
    this.afterUpload=[...image]
  })
}

onSubmit(){
  console.log(this.reactiveForm);
}

}
