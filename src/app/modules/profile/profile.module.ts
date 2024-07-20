import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import {ProfileRoutingModule} from "./profile-routing.module";
import {FloatLabelModule} from "primeng/floatlabel";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {Button} from "primeng/button";

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    ProfileRoutingModule,
    CommonModule,
    FloatLabelModule,
    ReactiveFormsModule,
    InputTextModule,
    Button,
  ]
})
export class ProfileModule { }
