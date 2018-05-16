import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { OverlayLoaderComponent } from '../overlay-loader/overlay-loader.component';
import { HttpClient } from '@angular/common/http';
import { debug } from 'util';
import { TreeNodeComponent } from '../tree-node/tree-node.component';

@Component({
  selector: 'file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.css']
})
export class FileSelectorComponent implements OnInit {

  @Output() fileSelectorEvent = new EventEmitter<any>();

  @ViewChild('loaderComponent')
  private loaderRef: OverlayLoaderComponent;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("http://localhost:8080/files?parent=").subscribe((data: Object[]) => {
      data.forEach(element => {
        this.nodes.children.push({
          name: element["name"],
          hasChildren: element["fileType"] != "File" ? true : false,
          fullPath: element["fullPath"],
          isDirectory: element["fileType"] != "File",
          children: [],
          status: element["fileType"] == 'Directory' ? 'folder' : (element["fileType"] == "Drive" ? "drive" : "file"),
          isDrive: element["fileType"] == "Drive",
        });
      });
      this.loaderRef.hide();
    }, error => {
      this.fileSelectorEvent.emit({ action: 'close' });
    });
  }

  closeFileSelector() {
    this.fileSelectorEvent.emit({ action: 'close' });
  }

  nodes = {
    name: "root",
    children: []
  };

  selectedNode: TreeNodeComponent;

  handleTreeEvent(nodeComponent: any) {
    if (nodeComponent.action == "confirmed") {
      this.fileSelectorEvent.emit({ action: 'selected', path: nodeComponent.component.node.fullPath });
      return;
    }
    if (nodeComponent.action == "selected") {
      if (this.selectedNode) this.selectedNode.node.selected = false;
      nodeComponent.component.node.selected = true;
      this.selectedNode = nodeComponent.component;
      return;
    }
  }
}
