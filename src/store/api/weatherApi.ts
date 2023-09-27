import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { WeatherResponse } from '~/types/weather';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://${import.meta.env.VITE_YAHOO_API_HOST}/`,
    headers: {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': import.meta.env.VITE_YAHOO_API_KEY,
      'X-RapidAPI-Host': import.meta.env.VITE_YAHOO_API_HOST,
    },
  }),
  //   endpoints: (builder) => ({
  //     getPokemonByName: builder.query<Pokemon, string>({
  //       query: (name) => `pokemon/${name}`,
  //     }),
  //   })
  endpoints: (build) => ({
    getWeatherByCoords: build.query<
      WeatherResponse,
      { lat: GeolocationCoordinates['latitude']; lon: GeolocationCoordinates['longitude'] }
    >({ query: ({ lat, lon }) => `weather?u=c&lat=${lat}&long=${lon}&format=json` }),
  }),
});

export const { useGetWeatherByCoordsQuery, useLazyGetWeatherByCoordsQuery } = weatherApi;

type Coords = { lat?: number; lon?: number };

export const selectWeatherApiRequestStatus = (coords: Coords) =>
  createDraftSafeSelector(weatherApi.endpoints?.getWeatherByCoords.select(coords), (d) => d.status);
export const selectWeatherByCoords = (coords: Coords) =>
  createDraftSafeSelector(weatherApi.endpoints?.getWeatherByCoords.select(coords), (d) => d.data);

export const selectWeatherApiCurrentObservation = (coords: Coords) =>
  createDraftSafeSelector(selectWeatherByCoords(coords), (w) => w?.current_observation);

export const selectWeatherApiCondition = (coords: Coords) =>
  createDraftSafeSelector(selectWeatherByCoords(coords), (w) => w?.current_observation.condition);

export const selectWeatherApiAtmosphere = (coords: Coords) =>
  createDraftSafeSelector(selectWeatherByCoords(coords), (w) => w?.current_observation.atmosphere);

export const selectWeatherApiAstronomy = (coords: Coords) =>
  createDraftSafeSelector(selectWeatherByCoords(coords), (w) => w?.current_observation.astronomy);

export const selectWeatherApiWind = (coords: Coords) =>
  createDraftSafeSelector(selectWeatherByCoords(coords), (w) => w?.current_observation.wind);

export const selectWeatherApiWindChill = (coords: Coords) =>
  createDraftSafeSelector(selectWeatherApiWind(coords), (w) => w?.chill);

export const selectWeatherApiWindDirection = (coords: Coords) =>
  createDraftSafeSelector(selectWeatherApiWind(coords), (w) => w?.direction);

export const selectWeatherApiWindSpeed = (coords: Coords) =>
  createDraftSafeSelector(selectWeatherApiWind(coords), (w) => w?.speed);

export const selectWeatherApiLocation = (coords: Coords) =>
  createDraftSafeSelector(selectWeatherByCoords(coords), (w) => w?.location);

export const selectWeatherApiForecasts = (coords: Coords) =>
  createDraftSafeSelector(selectWeatherByCoords(coords), (w) => w?.forecasts);

/* ========== CARD SELECTORS =========== */
export const selectApiCurrentWeatherCardParams = (coords: Coords) =>
  createDraftSafeSelector(
    [selectWeatherApiCondition(coords), selectWeatherApiLocation(coords)],
    (condition, location) => ({ condition, location }),
  );

export const selectApiForecastCardParams = (coords: Coords) =>
  createDraftSafeSelector(
    [selectWeatherApiCondition(coords), selectWeatherApiForecasts(coords), selectWeatherApiRequestStatus(coords)],
    (condition, forecasts, status) => ({ condition, forecasts, status }),
  );
