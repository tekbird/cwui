import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  @Input() node;
  @Output() treeEvent = new EventEmitter<Object>();

  isOpen: boolean = false;

  ngOnInit() {
    //this.node.status = this.node.isDirectory ? "folder" : "";
  }

  clearSelection(evt, node) {
    node.node.selected = false;
  }

  loadChildren(evt, node) {
    event.stopPropagation();
    if (!node.node.isDirectory && !node.node.isDrive) {
      this.treeEvent.emit({ action: "selected", component: node });
      return;
    }
    if (this.isOpen) {
      this.isOpen = false;
      node.node.status = node.node.isDrive ? "drive" : "folder";
      node.node.children = [];
      return;
    }
    this.isOpen = true;
    node.node.status = "loading";
    let parentPath = node.node.fullPath;
    this.http.get("http://localhost:8080/files?parent=" + encodeURI(parentPath)).subscribe((data: Object[]) => {
      node.node.status = node.node.isDrive ? "drive" : "folderopen";
      data.forEach(element => {
        node.node.children.push({
          name: element["name"],
          hasChildren: element["fileType"] != "File" ? true : false,
          fullPath: element["fullPath"],
          isDirectory: element["fileType"] != "File",
          isDrive: element["fileType"] == "Drive",
          children: [],
          status: element["fileType"] == 'Directory' ? 'folder' : (element["fileType"] == "Drive" ? "drive" : "file")
        });
      });
    }, err => {
      node.node.status = "folder";
      this.isOpen = false;
    });
  }

  handleTreeEvent(message) {
    this.treeEvent.emit(message);
  }

  confirmSelection(event, component) {
    event.stopPropagation();
    this.treeEvent.emit({ action: "confirmed", component: component });
  }
}
