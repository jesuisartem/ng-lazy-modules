import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import {Button} from "primeng/button";
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {StyleClassModule} from "primeng/styleclass";
import {ToolbarModule} from "primeng/toolbar";
import {MainModule} from "./modules/main/main.module";
import { HeaderComponent } from './header/header.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoadingOverlayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Button,
    FormsModule,
    BrowserAnimationsModule,
    StyleClassModule,
    ToolbarModule,
    MainModule,
    ProgressSpinnerModule,
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
