export interface IResults {
    geonames: IGeoNames[];
    totalResultsCount?: number;
}

export interface IGeoNames {
    lat: string;
    lng: string;
    name: string;
}

export interface IMarker {
    position: IPosition;
    label: ILabel;
    title: string;
    options?: {};
} 

export interface IPosition {
    lat: number;
    lng: number;    
} 

export interface ILabel {
    color: string;
    text: string;
} 

export interface IGlobalWeather {
   main: IMainWeather;
   weather: IWeatherDescription[];
   wind: IWind;
} 

export interface IMainWeather {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

export interface IWind {
    deg: number;
    speed: number;
}

export interface IWeatherDescription {
    main: string;
}
