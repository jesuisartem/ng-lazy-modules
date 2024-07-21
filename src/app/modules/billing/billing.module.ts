import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingComponent } from './components/billing/billing.component';
import {BillingRoutingModule} from "./billing-routing.module";
import { MapComponent } from './components/map/map.component';
import {Button} from "primeng/button";



@NgModule({
  declarations: [
    BillingComponent,
    MapComponent,
  ],
    imports: [
        BillingRoutingModule,
        CommonModule,
        Button
    ]
})
export class BillingModule { }
