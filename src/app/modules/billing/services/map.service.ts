import { Injectable } from '@angular/core';
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import {Feature, View} from "ol";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _selectedFeature$ = new BehaviorSubject<Feature | null>(null);

  constructor() { }

  public createMap(): Map {
    return new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            url: 'assets/ru.json',
            format: new GeoJSON(),
          })
        })
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,maxZoom: 18,
      }),
    });
  }

  public get selectedFeature$(): Observable<Feature | null> {
    return this._selectedFeature$.asObservable();
  }

  public setSelectedFeature(feature: Feature): void {
    this._selectedFeature$.next(feature);
  }
}
