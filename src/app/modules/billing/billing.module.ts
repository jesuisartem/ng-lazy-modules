import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingComponent } from './components/billing/billing.component';
import {BillingRoutingModule} from "./billing-routing.module";



@NgModule({
  declarations: [
    BillingComponent,
  ],
  imports: [
    BillingRoutingModule,
    CommonModule
  ]
})
export class BillingModule { }
