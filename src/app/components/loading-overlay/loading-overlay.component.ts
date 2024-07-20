import {Component, inject} from '@angular/core';
import {LoadingService} from "../../modules/loading/loading.service";
import {RouteConfigLoadEnd, RouteConfigLoadStart, Router } from "@angular/router";

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent {
  public loadingService = inject(LoadingService);
  public router = inject(Router);
  constructor() {
    this.router.events.subscribe(event => {
        if (event instanceof RouteConfigLoadStart) {
          this.loadingService.setLoadingStatus(true)
        } else if (event instanceof RouteConfigLoadEnd) {
          this.loadingService.setLoadingStatus(false)
        }
      }
    );
  }
}
