import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {authGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
  },
  {
    path: '', component: DashboardComponent, canActivate: [authGuard],
  },
  {
    path: '**', redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
