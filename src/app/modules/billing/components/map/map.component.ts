import {AfterViewInit, Component, DestroyRef, inject, OnInit} from '@angular/core';
import Map from 'ol/Map';
import {MapService} from "../../services/map.service";
import {fromEventPattern, Subject} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Feature, MapBrowserEvent, MapEvent} from "ol";
import {Geometry} from "ol/geom";
import {SELECTED_FEATURE_STYLE} from "../../const/feature-style";
import {Select} from "ol/interaction";
import {LoadingService} from "../../../loading/loading.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  public map!: Map

  private mapService = inject(MapService);
  private destroyRef = inject(DestroyRef);
  private loadingService = inject(LoadingService);

  public ngOnInit(): void {
    this.initMap();
    this.getMapClick();
  }

  public ngAfterViewInit() {
    const renderEvent$ = fromEventPattern<MapBrowserEvent<MouseEvent>>((handler) => this.map.once('postrender', handler));
    renderEvent$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.loadingService.setLoadingStatus(false);
      })
  }

  private initMap(): void {
    this.loadingService.setLoadingStatus(true);
    this.map = this.mapService.createMap();
  }

  // singleclick работает медленнее из-за проверки ивента на 'click' || 'singleclick'
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
