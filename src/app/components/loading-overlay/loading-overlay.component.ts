import {Component, inject} from '@angular/core';
import {LoadingService} from "../../modules/loading/loading.service";

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent {
  public loadingService = inject(LoadingService);
}
