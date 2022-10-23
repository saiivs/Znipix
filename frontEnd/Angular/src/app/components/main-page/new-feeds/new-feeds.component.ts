
import { Type } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ObjectId } from 'mongoose';
import { BackendService } from 'src/app/services/backend.service';
import { userPost } from 'src/models/models';

@Component({
  selector: 'app-new-feeds',
  templateUrl: './new-feeds.component.html',
  styleUrls: ['./new-feeds.component.scss']
})
export class NewFeedsComponent implements OnInit {

  constructor(private backEnd:BackendService) { }

  posts:userPost[]=[];
  comments:any[]=[]
  comment:string=''
  viewComment:string=''
  favCount:number=0
  favRed:boolean=false;

  ngOnInit(): void {
    this.backEnd.posts().subscribe((data)=>{
      this.posts=[...data]
      for(let item of this.posts){
        let Array = item.count?.filter((x)=>{
          return x.status==true;
        })
        item.count=Array?.slice()
        let index = item.count?.findIndex(x=>x.userID==localStorage.getItem('userId'))
        if(index!=-1){
        item.liked=true
        }
      }
      console.log(this.posts);


    })
  }

  toggleText(i:number){
   for(let index in this.posts){
    let ind=i.toString()
    if(index==ind){
        this.posts[index].item=!this.posts[index].item;
      }
   }
  }

  postComment(i:number,id:any){
    for(let index in this.posts){
      let ind=i.toString();
      if(index==ind){
        let name=localStorage.getItem('userName')
        this.posts[index].comments?.push({userName:name,comment:this.comment})
      }
    }
    this.backEnd.postCommentServer(id,this.comment).subscribe()
    this.comment=""
  }

  favorite(id:any,i:number){
    this.favRed=!this.favRed;
      for(let index in this.posts){
          let ind=i.toString();
          if(index==ind&&!this.posts[index].liked){
            this.posts[index].count?.push(localStorage.getItem('userName'))
            this.posts[index].liked=true;
            this.backEnd.likedCount(id,true).subscribe()
          }
          else if(index==ind&&this.posts[index].liked){
              this.posts[index].count?.pop()
              this.posts[index].liked=false;
              this.backEnd.likedCount(id,false).subscribe()

          }
         }

   }






  }

