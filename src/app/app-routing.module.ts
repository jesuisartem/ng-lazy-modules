import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "./guards/auth.guard";
import {MainComponent} from "./modules/main/components/main/main.component";

const routes: Routes = [
  {
    path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
  },
  {
    path: '', component: MainComponent, canActivate: [authGuard], children: [
      { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
      { path: 'inventory', loadChildren: () => import('./modules/inventory/inventory.module').then(m => m.InventoryModule) },
      { path: 'reports', loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule) },
      { path: 'billing', loadChildren: () => import('./modules/billing/billing.module').then(m => m.BillingModule) },
      { path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
