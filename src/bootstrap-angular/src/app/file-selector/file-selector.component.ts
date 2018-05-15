import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { OverlayLoaderComponent } from '../overlay-loader/overlay-loader.component';
import { HttpClient } from '@angular/common/http';
import { debug } from 'util';

@Component({
  selector: 'file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.css']
})
export class FileSelectorComponent implements OnInit {

  @Output() fileSelectorEvent = new EventEmitter<string>();

  @ViewChild('loaderComponent')
  private loaderRef: OverlayLoaderComponent;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    setTimeout(() => {
      this.http.get("http://localhost:8080/files?parent=").subscribe((data: Object[]) => {
        data.forEach(element => {
          this.nodes.children.push({
            name: element["name"],
            hasChildren: element["fileType"] != "File" ? true : false,
            fullPath: element["fullPath"],
            isDirectory: element["fileType"] != "File",
            children: []
          });          
        });
        this.loaderRef.hide();
      });
    }, 0);
  }

  closeFileSelector() {
    this.fileSelectorEvent.emit('close');
  }

  onTreeEvent(data){
    debugger;
  }

  nodes = {
    name: "root",
    children: []
  };  
}
