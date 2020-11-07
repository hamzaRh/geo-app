import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './map.component';
import { WeatherPopupModule } from './weather-popup/weather-popup.module';


@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    GoogleMapsModule,
    WeatherPopupModule
  ],
  exports: [MapComponent]
})
export class MapModule { }
