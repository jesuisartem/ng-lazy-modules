import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MenubarModule} from "primeng/menubar";
import {Button} from "primeng/button";
import {FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToolbarModule} from "primeng/toolbar";
import {StyleClassModule} from "primeng/styleclass";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    Button,
    FormsModule,
    BrowserAnimationsModule,
    ToolbarModule,
    StyleClassModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
