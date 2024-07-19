import {Component, DestroyRef, inject} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AppService} from "../../../../app.service";
import {CustomMenuItem} from "../../../../const/interfaces/custom-menu-item.interface";
import {PageURLS} from "../../../../const/enums/page-urls-enum";
import {filter, map} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  private router = inject(Router);
  public appService = inject(AppService);
  private destroyRef = inject(DestroyRef);

  public menuItems: CustomMenuItem[] = [];

  public ngOnInit(): void {
    this.fillMenuBar();
    this.setMenuItemFromRoute();
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

  public setMenuItemFromRoute(): void {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map(event => event.url.substring(1)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(path => {
        if (Object.values<string>(PageURLS).includes(path) && this.appService.getSelectedMenuItem() === null) {
          this.appService.setSelectedItem(this.menuItems.find(menuItem => menuItem.url === path) ?? null);
        }
      });
  }
}
