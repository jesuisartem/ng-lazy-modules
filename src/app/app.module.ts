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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
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
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
