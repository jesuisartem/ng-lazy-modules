import {Component, DestroyRef, inject} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MainService} from "../../services/main.service";
import {CustomMenuItem} from "../../../../const/interfaces/custom-menu-item.interface";
import {PageURLS} from "../../../../const/enums/page-urls-enum";
import {filter, map, tap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {getRandomProfile} from "../../../profile/const/get-random-profile";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  private router = inject(Router);
  public mainService = inject(MainService);

  public menuItems: CustomMenuItem[] = [];

  public ngOnInit(): void {
    this.fillMenuBar();
    this.setUserProfile();

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
        label: 'Map',
        url: PageURLS.Map,
      },
      {
        label: 'Profile',
        url: PageURLS.Profile,
      },

    ];
  };

  public routeToPage(item: CustomMenuItem): void {
    this.mainService.setSelectedItem(item);
    this.router.navigate([item.url]);
  }

  private setSelectedMenuItemFromRoute(): void {
    if (Object.values<string>(PageURLS).includes(this.router.url.substring(1)) && this.mainService.getSelectedMenuItem() === null) {
      this.mainService.setSelectedItem(this.menuItems.find(menuItem => menuItem.url === this.router.url.substring(1)) ?? null);
    }
  }

  private setUserProfile(): void {
    const profile = getRandomProfile();
    this.mainService.setSelectedProfile(profile);
  }
}
