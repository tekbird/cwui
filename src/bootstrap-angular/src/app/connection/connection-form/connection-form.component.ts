import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'connection-form',
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.css']
})
export class ConnectionFormComponent implements OnInit {

  showKeystoreSelector: boolean = false;
  showTurstStoreSelector: boolean = false;
  connectionForm: FormGroup;
  @ViewChild("focus") focus: ElementRef;

  constructor() { }

  ngOnInit() {
    this.connectionForm = new FormGroup({
      keystorePath: new FormControl(),
      truststorePath: new FormControl(),
      host: new FormControl("", [Validators.required]),
      port: new FormControl(9042, [Validators.required]),
      username: new FormControl(),
      password: new FormControl(),
      keystorePassword: new FormControl(),
      truststorePassword: new FormControl()
    });
    this.focus.nativeElement.focus();
  }

  selectKeystore() {
    this.showKeystoreSelector = true;
  }

  selectTruststore() {
    this.showTurstStoreSelector = true;
  }

  handleKeyFileSelectorEvent(message) {
    if (message.action == "close")
      this.showKeystoreSelector = false;
    else if (message.action == "selected") {
      this.connectionForm.controls["keystorePath"].setValue(message.path);
      this.showKeystoreSelector = false;
    }
  }

  handleTrustFileSelectorEvent(message) {
    if (message.action == "close")
      this.showTurstStoreSelector = false;
    else if (message.action == "selected") {
      this.connectionForm.controls["truststorePath"].setValue(message.path);
      this.showTurstStoreSelector = false;
    }
  }

  handleConnectionTestEvents(message) {
    if (message.action == "init") message.component.setData(this.connectionForm.getRawValue());
    else if (message.action == "close") this.isTestingConnection = false;
  }

  showErrors: boolean = false;

  onConnect() {
    if (!this.connectionForm.valid) {
      this.showErrors = true;
      return;
    }
    this.connectionForm.disable();
  }

  isTestingConnection: boolean = false;

  onTestConnection() {
    if (this.connectionForm.valid) {
      this.isTestingConnection = true;
    }
  }
}
