import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import Map from 'ol/Map';
import {MapService} from "../../services/map.service";
import {fromEventPattern} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Feature, MapBrowserEvent, MapEvent} from "ol";
import {Geometry} from "ol/geom";
import {SELECTED_FEATURE_STYLE} from "../../const/feature-style";
import {Select} from "ol/interaction";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public map!: Map

  private mapService = inject(MapService);
  private destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.initMap();
    this.getMapClick();
  }

  private initMap(): void {
    this.map = this.mapService.createMap();
  }

  private getMapClick(): any {
    const clickEvent$ = fromEventPattern<MapBrowserEvent<MouseEvent>>((handler) => this.map.on('singleclick', handler));
    clickEvent$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event: MapBrowserEvent<MouseEvent>) => {
        const featuresLike = this.map.getFeaturesAtPixel(event.pixel);
        if (!featuresLike.length) return;
        const targetFeature = new Feature({
          geometry: featuresLike[0].getGeometry() as Geometry,
          ...featuresLike[0]
        });
        this.highlightFeature(targetFeature);
      });
  }

  private highlightFeature(feature: Feature): void {
    //console.log(feature.get('values_'));
    const selectSingleClick = new Select({style: SELECTED_FEATURE_STYLE});
    this.map.addInteraction(selectSingleClick);
    this.mapService.setSelectedFeature(feature);
  }
}
