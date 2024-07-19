import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _isLoading$ = new BehaviorSubject(false);

  constructor() { }

  public isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }

  public setLoadingStatus(status: boolean): void {
    this._isLoading$.next(status);
  }
}
