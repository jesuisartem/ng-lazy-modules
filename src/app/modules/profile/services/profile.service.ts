import { Injectable } from '@angular/core';
import {map, mapTo, Observable, timer} from "rxjs";
import {MOCK_USER_1, MOCK_USER_2, MOCK_USER_3} from "../const/MOCK_PROFILES";
import {Profile} from "../const/profile.interface";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor() { }

  public saveProfileData(): Observable<boolean> {
    return timer(3000)
      .pipe(
        mapTo(true),
      )
  }

  public getProfileData(): Observable<Profile> {
    return timer(3000)
      .pipe(
        map(_ => [MOCK_USER_1, MOCK_USER_2, MOCK_USER_3][Math.floor(Math.random() * [MOCK_USER_1, MOCK_USER_2, MOCK_USER_3].length)]),
      )
  }
}
