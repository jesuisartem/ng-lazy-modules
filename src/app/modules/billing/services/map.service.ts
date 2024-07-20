import { Injectable } from '@angular/core';
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import {View} from "ol";

@Injectable({
  providedIn: 'root'
})
export class MapService {

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
}
