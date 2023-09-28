import { createAsyncThunk } from '@reduxjs/toolkit';

import { weatherApiHeaders } from '~/api/headers';
import { GeoPositionContextType } from '~/providers/GeopositionContext';
import { WeatherResponse } from '~/types/weather';

export const fetchWeather = createAsyncThunk<WeatherResponse, GeoPositionContextType['pos'] | string>(
  'weather/fetchWeather',
  async (arg, thunkAPI) => {
    try {
      // let url = `https://${import.meta.env.VITE_YAHOO_API_HOST}/weather?u=c&format=json`;
      const url = new URL(`https://${import.meta.env.VITE_YAHOO_API_HOST}/weather`);
      url.searchParams.set('u', 'c');
      url.searchParams.set('format', 'json');

      if (typeof arg === 'string') url.searchParams.set('location', arg);
      else {
        url.searchParams.set('lat', String(arg.latitude));
        url.searchParams.set('long', String(arg.longitude));
      }

      const result = await fetch(url, { headers: weatherApiHeaders });
      return result.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(null);
    }
  },
);
