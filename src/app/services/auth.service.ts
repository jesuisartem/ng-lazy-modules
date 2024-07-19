import { Injectable } from '@angular/core';
import {AuthData} from "../const/interfaces/auth-data.interface";
import {CORRECT_AUTH_DATA} from "../const/CORRECT_AUTH_DATA";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  public setAuthData(data: AuthData): void {
    sessionStorage.setItem('auth', JSON.stringify(data));
  }

  public getAuthData(): AuthData | null {
    const authData = sessionStorage.getItem('auth');
    if (!authData) return null;
    return JSON.parse(authData);
  }


  public isLoggedIn(): boolean {
    return !!sessionStorage.getItem('auth');
  }

  public isCorrectAuthData(authData: AuthData): boolean {
    return authData.login === CORRECT_AUTH_DATA.login && authData.password == CORRECT_AUTH_DATA.password;
  }
}
