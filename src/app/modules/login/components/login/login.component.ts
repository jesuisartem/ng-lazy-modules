import {Component, DestroyRef, inject} from '@angular/core';
import {AuthData} from "../../../../const/interfaces/auth-data.interface";
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {finalize, timer} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {LoadingService} from "../../../loading/loading.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ERROR_LOGIN_MESSAGE} from "../../../profile/const/MESSAGES";

interface AuthFormGroupModel {
  login: FormControl<AuthData['login']>;
  password: FormControl<AuthData['password']>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public loadingService = inject(LoadingService);
  public authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private messageService = inject(MessageService);
  private router = inject(Router);

  public authFormGroup = new FormGroup<AuthFormGroupModel>(<AuthFormGroupModel>{
    login: new FormControl<AuthData['login']>(''),
    password: new FormControl<AuthData["password"]>(''),
  });

  public login(): void {
    this.loadingService.setLoadingStatus(true);
    timer(3000)
      .pipe(
        finalize(() => this.loadingService.setLoadingStatus(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.setAuthData());
  }

  private setAuthData(): void {
    const authData: AuthData = {
      login: this.authFormGroup.controls.login.value,
      password: this.authFormGroup.controls.password.value,
    };
    if (this.authService.isCorrectAuthData(authData)) {
      this.authService.setAuthData(this.authService.getUserDataByLogin(authData.login));
      this.router.navigate(['/home']);
    } else {
      this.authFormGroup.setErrors({'authError': true});
      this.messageService.add(ERROR_LOGIN_MESSAGE);
    }
  }
}
