import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'connection-test',
  templateUrl: './connection-test.component.html',
  styleUrls: ['./connection-test.component.scss']
})
export class ConnectionTestComponent implements OnInit {

  constructor(private http: HttpClient) { 

  }

  isChecking: boolean = true;
  isSuccess: boolean = false;
  isFailure: boolean = false;

  @Output() connectionEvents = new EventEmitter<any>();

  ngOnInit() {
    this.connectionEvents.emit({
      action: "init",
      component: this
    })
    setTimeout(() => {
      this.isChecking=false;
      this.isFailure=true;
    }, 2000);
  }

  closeView(){
    this.connectionEvents.emit({
      action: "close"
    })
  }

  setData(formData: any){
    console.log(formData);
  }
}
