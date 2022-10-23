import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { contests } from 'src/models/models';

@Component({
  selector: 'app-contest-details',
  templateUrl: './contest-details.component.html',
  styleUrls: ['./contest-details.component.scss']
})
export class ContestDetailsComponent implements OnInit {

  contestId:string|null='';
  contest!:contests|undefined;
  closeDate:string|any="";
  day:undefined|number;
  month:number|undefined;
  year:number|undefined;
  constructor(private backEnd:BackendService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.contestId = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(this.contestId);

    this.backEnd.getContests().subscribe((data)=>{
      this.contest=data.find(x=>x._id==this.contestId)
      this.closeDate = this.contest?.date
      console.log(this.closeDate);

      let date = new Date(this.closeDate)
      let curDate = new Date(date)
      console.log(curDate);

      this.day = curDate.getDate();
      console.log(this.day);

      this.month = curDate.getMonth()+1;
      this.year = curDate.getFullYear();
      console.log(this.day,this.month,this.year);

    })
  }

}
