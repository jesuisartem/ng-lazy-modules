import {Component, DestroyRef, inject} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AppService} from "../../../../app.service";
import {CustomMenuItem} from "../../../../const/interfaces/custom-menu-item.interface";
import {PageURLS} from "../../../../const/enums/page-urls-enum";
import {filter, map, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  private router = inject(Router);
  public appService = inject(AppService);

  public menuItems: CustomMenuItem[] = [];

  public ngOnInit(): void {
    this.fillMenuBar();

    this.setSelectedMenuItemFromRoute();
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

  public routeToPage(item: CustomMenuItem): void {
    this.appService.setSelectedItem(item);
    this.router.navigate([item.url]);
  }

  private setSelectedMenuItemFromRoute(): void {
    if (Object.values<string>(PageURLS).includes(this.router.url.substring(1)) && this.appService.getSelectedMenuItem() === null) {
      this.appService.setSelectedItem(this.menuItems.find(menuItem => menuItem.url === this.router.url.substring(1)) ?? null);
    }
  }
}
