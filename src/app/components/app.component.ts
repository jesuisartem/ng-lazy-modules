import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);

  public ngOnInit() {
    this.authService.currentUser$.next(this.authService.getAuthDataFromStorage());
  }
}
