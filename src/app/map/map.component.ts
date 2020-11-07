import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { IResults, IMarker, IPosition, IGlobalWeather } from '../models/models';
import { GeoService } from '../services/geo.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, OnDestroy {

  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @Output() isInputDisabled = new EventEmitter<boolean>();

  private subscriptions: Subscription[] = [];
  markers: IMarker[] = [];
  center: IPosition;
  results: IResults;
  zoom: number;
  infoContent: string;
  openPopup = false;
  globalWeather: IGlobalWeather;

  constructor(private geoService: GeoService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.geoService.getSearchValue().pipe(
        tap(serachValue => !!serachValue ? this.updateMap(serachValue) : null)
      ).subscribe()
    )
  }

  updateMap(value: string): void {
    this.subscriptions.push(
      this.geoService.getDataByCityName(value).pipe(
        switchMap(results => {
          this.results = results as IResults;
          if ((results as IResults).totalResultsCount > 0) {
            const { lat, lng } = (results as IResults).geonames[0];
            this.center = {
              lat: parseFloat(lat),
              lng: parseFloat(lng)
            }
            return this.geoService.getDataByPlaceName(parseFloat(lat), parseFloat(lng))
          }
          return [];
        }),
        tap(results => {
          console.log(results)
          const citiesList = (results as IResults).geonames;
          this.addMarkers(citiesList);
        })
      ).subscribe()
    );
  }

  addMarkers(citiesList): void {
    citiesList.forEach((city, index) => {
      const { lat, lng, name } = city;
      this.markers.push({
        position: {
          lat: parseFloat(lat),
          lng: parseFloat(lng)
        },
        label: {
          color: index === 0 ? 'red' : '#b587ff',
          text: name
        },
        title: 'Marker title ' + name,
        options: index === 0 ? { animation: google.maps.Animation.BOUNCE } : null,
      })
    });
  }

  getWeatherInfo(postion) {
    const { lat, lng } = postion;
    this.subscriptions.push(
      this.geoService.getWeatherData(lat, lng).pipe(
        tap(result => {
          const { main, weather, wind } = result as IGlobalWeather;
          this.openWeatherPopup({ main, weather, wind });
        })
      )
        .subscribe()
    );
  }


  private openWeatherPopup(globalWeather: IGlobalWeather) {
    this.globalWeather = globalWeather;
    this.openPopup = true;
    this.isInputDisabled.emit(true);
  }

  closePopup() {
    this.openPopup = false;
    this.globalWeather = null;
    this.isInputDisabled.emit(false);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe;
    })
  }
}
