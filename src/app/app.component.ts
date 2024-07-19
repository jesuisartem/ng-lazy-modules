import { Component } from '@angular/core';
import { MenuItem } from "primeng/api";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public menuItems: MenuItem[] = [];

  public isSidebarVisible$ = new BehaviorSubject<boolean>(false);
}
