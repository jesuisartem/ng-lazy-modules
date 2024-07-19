import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './components/inventory/inventory.component';
import {InventoryRoutingModule} from "./inventory-routing.module";



@NgModule({
  declarations: [
    InventoryComponent
  ],
  imports: [
    InventoryRoutingModule,
    CommonModule
  ]
})
export class InventoryModule { }
