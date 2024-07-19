import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";

const enum PageURLS {
  Home = 'home',
  Inventory = 'inventory',
  Reports = 'reports',
  Billing = 'billing',
  Profile = 'profile',
}

interface CustomMenuItem {
  label: string;
  url: PageURLS;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private router = inject(Router);

  public menuItems: CustomMenuItem[] = [];

  public ngOnInit(): void {
    console.log(123)
    this.fillMenuBar();
  }

  private fillMenuBar(): void {
    this.menuItems = [
      {
        label: 'Home',
        url: PageURLS.Home,
      },
      {
        label: 'Inventory',
        url: PageURLS.Inventory,
      },
      {
        label: 'Reports',
        url: PageURLS.Reports,
      },
      {
        label: 'Billing',
        url: PageURLS.Billing,
      },
      {
        label: 'Profile',
        url: PageURLS.Profile,
      },

    ];
  };

  public routeToPage(page: PageURLS): void {
    this.router.navigate([page]);
  }

}
