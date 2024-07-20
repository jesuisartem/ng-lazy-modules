import {Component, inject} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public authService = inject(AuthService);
  private router = inject(Router);

  public logout(): void {
    this.authService.removeAuthData();
    this.router.navigate(['login'])
  }
}
