import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'select-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  closeResult: string;
  @ViewChild('content') content: ViewChild;
  hasAuthentication: boolean = true;
  hasSSL: boolean = true;
  hasSSClientAuth: boolean= true;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open() {
    this.modalService.open(this.content, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
  }
}
