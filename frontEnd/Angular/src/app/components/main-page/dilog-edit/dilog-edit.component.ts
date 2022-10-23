import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {DilogContentComponent } from '../dilog-content/dilog-content.component'

@Component({
  selector: 'app-dilog-edit',
  templateUrl: './dilog-edit.component.html',
  styleUrls: ['./dilog-edit.component.scss']
})
export class DilogEditComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DilogContentComponent);
  }

  ngOnInit(): void {
  }

}
