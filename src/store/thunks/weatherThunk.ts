import { createAsyncThunk } from '@reduxjs/toolkit';

import { WeatherResponse } from '~/types/weather';

export const weatherThunk = createAsyncThunk<WeatherResponse, { latitude: number; longitude: number }>(
  'weather/fetchWeather',
  async ({ latitude, longitude }, thunkAPI) => {
    try {
      const result = await fetch(
        `https://${import.meta.env.VITE_YAHOO_API_HOST}/weather?u=c&lat=${latitude}&long=${longitude}&format=json`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': import.meta.env.VITE_YAHOO_API_KEY,
            'X-RapidAPI-Host': import.meta.env.VITE_YAHOO_API_HOST,
          },
        },
      );
      return result.json();
    } catch (e) {
      return thunkAPI.rejectWithValue(null);
    }
  },
);
