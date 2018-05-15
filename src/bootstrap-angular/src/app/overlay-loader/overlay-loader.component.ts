import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './overlay-loader.component.html',
  styleUrls: ['./overlay-loader.component.css']
})
export class OverlayLoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  isShowing: boolean = false;

  show() {
    this.isShowing = true;
  }
  hide() {
    this.isShowing = false;
  }
}
