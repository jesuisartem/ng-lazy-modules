import {Component, inject} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {MainService} from "../modules/main/services/main.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public authService = inject(AuthService);
  public mainService = inject(MainService);
  private router = inject(Router);

  public logout(): void {
    this.authService.removeAuthData();
    this.mainService.removeProfileData();
    this.router.navigate(['login'])
  }
}
