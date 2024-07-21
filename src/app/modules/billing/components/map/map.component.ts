import {AfterViewInit, Component, DestroyRef, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import Map from 'ol/Map';
import {MapService} from "../../services/map.service";
import {fromEventPattern} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Feature, MapBrowserEvent, Overlay} from "ol";
import {Geometry} from "ol/geom";
import {SELECTED_FEATURE_STYLE} from "../../const/feature-style";
import {Select} from "ol/interaction";
import {LoadingService} from "../../../loading/loading.service";
import {toStringHDMS} from "ol/coordinate";
import {toLonLat} from "ol/proj";
import {MainService} from "../../../main/services/main.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('popup') popupOverlay?: ElementRef<HTMLDivElement>;
  public map!: Map

  private mapService = inject(MapService);
  private destroyRef = inject(DestroyRef);
  private loadingService = inject(LoadingService);
  private mainService = inject(MainService);

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

  public setLocation(): void {
    const profile = this.mainService.getSelectedProfile();
    const selectedFeature = this.mapService.getSelectedFeature() as Feature;
    if (!profile) return;
    this.mainService.setSelectedProfile({
      ...profile,
      location: selectedFeature.get('values_').name,
    });
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
        this.addOverlay(targetFeature, event);
      });
  }

  private highlightFeature(feature: Feature): void {
    const selectSingleClick = new Select({style: SELECTED_FEATURE_STYLE});
    this.map.addInteraction(selectSingleClick);
    this.mapService.setSelectedFeature(feature);
  }

  private addOverlay(feature: Feature, event: MapBrowserEvent<MouseEvent>): void {
    const coordinate = event.coordinate;
    this.fillPopupWithData(feature, event);
    const popup = new Overlay({
      element: this.popupOverlay?.nativeElement,
      position: coordinate,
      offset: [25, 0],
      positioning: "top-left",
    });
    this.map.addOverlay(popup);
  }

  private fillPopupWithData(feature: Feature, event: MapBrowserEvent<MouseEvent>): void {
    if (!this.popupOverlay) return;
    const coordinate = event.coordinate;
    const hdms = toStringHDMS(toLonLat(coordinate));
    this.popupOverlay.nativeElement.innerHTML = `Координаты: ${hdms}<br>\ Регион: ${feature.get('values_').name}`;
  }
}
