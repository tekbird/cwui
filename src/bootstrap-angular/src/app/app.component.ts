import { Component, ViewChild } from '@angular/core';
import { ConnectionComponent } from './connection/connection.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  initializing: Boolean = true;
  @ViewChild('selectConnection')
  selectConnection: ConnectionComponent
  constructor() {
    setTimeout(() => {
      this.initializing = false;
      this.selectConnection.open();
    }, 2000);
  }
}
