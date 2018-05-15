import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ConnectionComponent } from './connection/connection.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FileSelectorComponent } from './file-selector/file-selector.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { OverlayLoaderComponent } from './overlay-loader/overlay-loader.component';
import { HttpClientModule } from '@angular/common/http';
import { TreeNodeComponent } from './tree-node/tree-node.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    FileSelectorComponent,
    OverlayLoaderComponent,
    TreeNodeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    AngularFontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
