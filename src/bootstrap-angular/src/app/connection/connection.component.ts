import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { debug } from 'util';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'select-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit, AfterViewInit {

  closeResult: string;
  @ViewChild('content') content: ViewChild;
  @ViewChild('focus') focus: ElementRef;
  modalRef: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
  }

  open() {
    this.modalRef = this.modalService.open(this.content, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
  }  
}
