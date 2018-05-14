import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { debug } from 'util';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'select-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  closeResult: string;
  @ViewChild('content') content: ViewChild;
  @ViewChild('keystoreSelector') keystoreSelector: ViewChild;
  hasAuthentication: boolean = true;
  hasSSL: boolean = true;
  hasSSClientAuth: boolean = true;
  modalRef: NgbModalRef;
  showKeystoreSelector: boolean = false;
  showTurstStoreSelector: boolean = false;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open() {
    this.modalRef = this.modalService.open(this.content, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      size: 'lg'
    });
  }

  selectKeystore() {
    this.showKeystoreSelector = true;
  }

  selectTruststore() {
    this.showTurstStoreSelector = true;
  }

  handleKeyFileSelectorEvent(message) {
    if (message == "close")
      this.showKeystoreSelector = false;
  }

  handleTrustFileSelectorEvent(message) {
    if (message == "close")
      this.showTurstStoreSelector = false;
  }
}
