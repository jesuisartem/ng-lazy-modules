import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {CustomMenuItem} from "../../../const/interfaces/custom-menu-item.interface";
import {Profile} from "../../profile/const/profile.interface";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private _selectedMenuItem$ = new BehaviorSubject<CustomMenuItem | null>(null);
  private _selectedProfile$ = new BehaviorSubject<Profile | null>(null);

  constructor() { }

  public getSelectedMenuItem(): CustomMenuItem | null {
    return this._selectedMenuItem$.getValue();
  }

  public get selectedMenuItem$(): Observable<CustomMenuItem | null> {
    return this._selectedMenuItem$.asObservable();
  }

  public setSelectedItem(item: CustomMenuItem | null): void {
    this._selectedMenuItem$.next(item);
  }

  public get selectedProfile$(): Observable<Profile | null> {
    return this._selectedProfile$.asObservable();
  }

  public setSelectedProfile(profile: Profile | null): void {
    sessionStorage.setItem('profile', JSON.stringify(profile));
    this._selectedProfile$.next(profile);
  }

  public removeProfileData(): void {
    sessionStorage.removeItem('profile');
    this.setSelectedProfile(null);
  }

  public getSelectedProfile(): Profile | null {
    return this._selectedProfile$.getValue();
  }
}
