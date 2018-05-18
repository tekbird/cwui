import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'connection-save',
  templateUrl: './connection-save.component.html',
  styleUrls: ['./connection-save.component.css']
})
export class ConnectionSaveComponent implements OnInit {

  constructor() { }

  @Output() connectionEvents = new EventEmitter<any>();

  ngOnInit() {
  }

  closeView(){
    this.connectionEvents.emit({action: "close"});
  }
}
