import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  private searchValue: BehaviorSubject<string>;
  public searchValueObservabe: Observable<string>;

  constructor(private http: HttpClient) {
    this.searchValue = new BehaviorSubject<string>('');
    this.searchValueObservabe = this.searchValue.asObservable();
  }

  emitSearchValue(value: string): void {
    this.searchValue.next(value);

  }

  getSearchValue(): Observable<string> {
    return this.searchValueObservabe;
  }

  getDataByCityName(value: string): Observable<Object> {
    return this.http.get(`http://api.geonames.org/searchJSON?q=${value}&maxRows=1&username=hamzarh`);
  }

  getDataByPlaceName(lat: number, lng: number): Observable<Object> {
    return this.http.get(`http://api.geonames.org/findNearbyPlaceNameJSON?lat=${lat}&lng=${lng}&radius=20&maxRows=4&featureClass=P&username=hamzarh`)
  }

  getWeatherData(lat: number, lon: number): Observable<Object> {
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=de79fe364fc78fda7637a9c728b67939`);
  }
}
