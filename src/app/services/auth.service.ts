import { Injectable } from '@angular/core';
import {AuthData} from "../const/interfaces/auth-data.interface";
import {CORRECT_USERS} from "../const/CORRECT_AUTH_DATA";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<AuthData | null>(null);
  constructor() { }

  public setAuthData(data: AuthData | undefined): void {
    if (!data) return;
    this.currentUser$.next(data);
    sessionStorage.setItem('auth', JSON.stringify(data));
  }

  public getAuthDataFromStorage(): AuthData | null {
    const authData = sessionStorage.getItem('auth');
    if (!authData) return null;
    return JSON.parse(authData);
  }


  public isLoggedIn(): boolean {
    return !!sessionStorage.getItem('auth');
  }

  public isCorrectAuthData(authData: AuthData): boolean {
    const correctUser = CORRECT_USERS.find(user => user.login === authData.login);
    return !!correctUser && correctUser.password === authData.password;
  }

  public getUserDataByLogin(authLogin: AuthData['login']): AuthData | undefined {
    return CORRECT_USERS.find(user => user.login === authLogin);
  }
}
