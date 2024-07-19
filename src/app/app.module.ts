import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Button} from "primeng/button";
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {StyleClassModule} from "primeng/styleclass";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ToolbarModule} from "primeng/toolbar";
import {MainModule} from "./modules/main/main.module";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
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
  exports: [
    DashboardComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
