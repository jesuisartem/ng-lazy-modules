import {Component, OnInit} from '@angular/core';
import Map from 'ol/Map';
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import {View} from "ol";
import VectorLayer from "ol/layer/Vector";
import {GeoJSON} from "ol/format";
import VectorSource from "ol/source/Vector";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public map!: Map

  public ngOnInit(): void {
    this.map = new Map({
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
