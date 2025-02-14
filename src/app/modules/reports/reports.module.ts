import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './components/reports/reports.component';
import {ReportsRoutingModule} from "./reports-routing.module";



@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    ReportsRoutingModule,
    CommonModule
  ]
})
export class ReportsModule { }
