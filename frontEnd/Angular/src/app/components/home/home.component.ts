import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private backEnd:BackendService) { }

  image:string[]=[]

  ngOnInit(): void {
    this.backEnd.posts().subscribe((post)=>{
    
    })
  }

}
