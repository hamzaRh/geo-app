import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherPopupComponent } from './weather-popup.component';



@NgModule({
  declarations: [WeatherPopupComponent],
  imports: [
    CommonModule
  ],
  exports: [WeatherPopupComponent]
})
export class WeatherPopupModule { }
