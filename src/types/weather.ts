import { WEATHER_CODE } from '~/types/weatherCode';

export interface WeatherResponse {
  location: Location;
  current_observation: CurrentObservation;
  forecasts: Forecast[];
}

export interface Forecast {
  day: string;
  date: number;
  high: number;
  low: number;
  text: string;
  code: WEATHER_CODE;
}

export interface CurrentObservation {
  pubDate: number;
  wind: Wind;
  atmosphere: Atmosphere;
  astronomy: Astronomy;
  condition: Condition;
}

export interface Condition {
  temperature: number;
  text?: string;
  code?: number;
}

export interface Astronomy {
  sunrise: string;
  sunset: string;
}

export interface Atmosphere {
  humidity: number;
  visibility: number;
  pressure: number;
}

export interface Wind {
  chill: number;
  direction: string;
  speed: number;
}

export interface Location {
  city: string;
  woeid: number;
  country: string;
  lat: number;
  long: number;
  timezone_id: string;
}
