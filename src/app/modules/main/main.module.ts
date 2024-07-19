import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './components/main/main.component';
import {ToolbarModule} from "primeng/toolbar";
import {Button} from "primeng/button";
import {RouterOutlet} from "@angular/router";

@NgModule({
  declarations: [
    MainComponent,
  ],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    Button,
    RouterOutlet,
  ]
})
export class MainModule { }
