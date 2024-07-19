import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {CustomMenuItem} from "./const/interfaces/custom-menu-item.interface";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private _selectedMenuItem$ = new BehaviorSubject<CustomMenuItem | null>(null);

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
}
