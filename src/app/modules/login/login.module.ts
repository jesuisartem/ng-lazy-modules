import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {FloatLabelModule} from "primeng/floatlabel";
import {Button} from "primeng/button";
import {ProgressSpinnerModule} from "primeng/progressspinner";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    Button,
    ProgressSpinnerModule
  ]
})
export class LoginModule { }
