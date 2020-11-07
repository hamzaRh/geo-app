import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IGlobalWeather } from 'src/app/models/models';

@Component({
  selector: 'app-weather-popup',
  templateUrl: './weather-popup.component.html',
  styleUrls: ['./weather-popup.component.scss']
})
export class WeatherPopupComponent {

  @Input() globalWeather: IGlobalWeather;
  @Output() closePopup = new EventEmitter<boolean>();

  close() {
    this.closePopup.emit(true);
  }

}
