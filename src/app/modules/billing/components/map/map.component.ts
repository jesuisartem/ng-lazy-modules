import {Component, inject, OnInit} from '@angular/core';
import Map from 'ol/Map';
import {MapService} from "../../services/map.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public map!: Map

  private mapService = inject(MapService);

  public ngOnInit(): void {
    this.initMap();
    this.getMapClick();
  }

  private initMap(): void {
    this.map = this.mapService.createMap();
  }

  private getMapClick(): any {
    this.map.on('singleclick', (click) => {
      const pixel = this.map.getEventPixel(click.originalEvent);
      const features = this.map.getFeaturesAtPixel(pixel);
      console.log(features)
    })
  }
}
