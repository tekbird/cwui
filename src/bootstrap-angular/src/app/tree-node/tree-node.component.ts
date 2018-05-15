import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.css']
})
export class TreeNodeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  @Input() node;

  isOpen: boolean = false;

  ngOnInit() {
  }

  loadChildren(evt, node) {
    event.stopPropagation();
    if(!node.node.isDirectory){
      return;
    }
    if (this.isOpen) {
      this.isOpen = false;
      node.node.children = [];
      return;
    }
    this.isOpen = true;
    let parentPath = node.node.fullPath;
    this.http.get("http://localhost:8080/files?parent=" + encodeURI(parentPath)).subscribe((data: Object[]) => {
      data.forEach(element => {
        node.node.children.push({
          name: element["name"],
          hasChildren: element["fileType"] != "File" ? true : false,
          fullPath: element["fullPath"],
          isDirectory: element["fileType"] != "File",
          children: []
        });
      });
    });
  }
}
