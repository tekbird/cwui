import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.css']
})
export class FileSelectorComponent implements OnInit {

  @Output() fileSelectorEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  closeFileSelector(){
    this.fileSelectorEvent.emit('close');
  }

}
