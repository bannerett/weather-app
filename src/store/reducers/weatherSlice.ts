import { createDraftSafeSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '~/store/store';
import { weatherThunk } from '~/store/thunks/weatherThunk';
import { Condition, WeatherResponse } from '~/types/weather';
import { WEATHER_CODE } from '~/types/weatherCode';

interface WeatherState {
  data: WeatherResponse | null;
  error?: string;
  pending: boolean;
}

interface WeatherReducers {
  [key: string]: (state: WeatherState, action: PayloadAction) => void;
}

export const weatherSlice = createSlice<WeatherState, WeatherReducers>({
  name: 'weather',
  initialState: { data: {} as WeatherResponse, error: undefined, pending: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(weatherThunk.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.pending = false;
    });
    builder.addCase(weatherThunk.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(weatherThunk.rejected, (state) => {
      state.error = 'Something went wrong';
      state.pending = false;
    });
  },
});

export default weatherSlice.reducer;

const resolveConditionCode = (condition?: Condition) => {
  if (!condition) return WEATHER_CODE.FAIR_DAY;

  const { code, text } = condition;

  if (code) return code;
  const lowerCaseText = String(text?.toLowerCase() || '');

  console.log(lowerCaseText);

  switch (true) {
    //   HURRICANE,
    //   SEVERE_THUNDERSTORMS,
    //   THUNDERSTORMS,
    //   MIXED_RAIN_AND_SNOW,
    //   MIXED_RAIN_AND_SLEET,
    //   MIXED_SNOW_AND_SLEET,
    //   FREEZING_DRIZZLE,
    //   DRIZZLE,
    //   FREEZING_RAIN,
    //   SHOWERS,
    //   HEAVY_SHOWERS,
    //   SNOW_FLURRIES,
    //   LIGHT_SNOW_SHOWERS,
    //   BLOWING_SNOW,
    //   SNOW,
    //   HAIL,
    //   SLEET,
    //   DUST,
    //   FOGGY,
    //   HAZE,
    //   SMOKY,
    //   BLUSTERY,
    //   WINDY,
    //   COLD,
    //   CLOUDY,
    //   MOSTLY_CLOUDY_NIGHT,
    //   MOSTLY_CLOUDY_DAY,
    //   PARTLY_CLOUDY_NIGHT,
    //   PARTLY_CLOUDY_DAY,
    //   CLEAR_NIGHT,
    //   SUNNY,
    //   FAIR_NIGHT,
    //   FAIR_DAY,
    //   MIXED_RAIN_AND_HAIL,
    //   HOT,
    //   ISOLATED_THUNDERSTORMS,
    //   SCATTERED_THUNDERSTORMS_38,
    //   SCATTERED_THUNDERSTORMS_39,
    //   SCATTERED_SHOWERS,
    //   HEAVY_SNOW_41,
    //   SCATTERED_SNOW_SHOWERS,
    //   HEAVY_SNOW_43,
    //   PARTLY_CLOUDY,
    //   THUNDERSHOWERS,
    //   SNOW_SHOWERS,
    //   ISOLATED_THUNDERSHOWERS,
    //   NOT_AVAILABLE = 3200,
    case lowerCaseText.includes('tornado'): {
      return WEATHER_CODE.TORNADO;
    }
    case lowerCaseText.includes('tropical storm'): {
      return WEATHER_CODE.TROPICAL_STORM;
    }
    // 11
    case lowerCaseText.includes('showers'): {
      return WEATHER_CODE.SHOWERS;
    }
    case lowerCaseText.includes('fair'): {
      return WEATHER_CODE.FAIR_DAY;
    }
    // 30
    case lowerCaseText.includes('partly cloudy'): {
      return WEATHER_CODE.PARTLY_CLOUDY_DAY;
    }
    default: {
      return WEATHER_CODE.FAIR_DAY;
    }
  }
};

export const selectWeatherState = (state: RootState) => state.weather;

export const selectWeather = createDraftSafeSelector(selectWeatherState, ({ data }) => data);

export const selectCurrentObservation = createDraftSafeSelector(
  selectWeather,
  (weather) => weather?.current_observation,
);

export const selectCurrentCondition = createDraftSafeSelector(
  selectCurrentObservation,
  (observation) => observation?.condition,
);

export const selectCurrentConditionCode = createDraftSafeSelector(selectCurrentCondition, (condition) =>
  resolveConditionCode(condition),
);

export const selectForecasts = createDraftSafeSelector(selectWeather, (weather) => weather?.forecasts);

export const selectLocation = createDraftSafeSelector(selectWeather, (weather) => weather?.location);

export const selectAstronomy = createDraftSafeSelector(
  selectCurrentObservation,
  (observation) => observation?.astronomy,
);

export const selectAtmosphere = createDraftSafeSelector(
  selectCurrentObservation,
  (observation) => observation?.atmosphere,
);

export const selectVisibility = createDraftSafeSelector(selectAtmosphere, (atm) => atm?.visibility);

export const selectWind = createDraftSafeSelector(selectCurrentObservation, (observation) => observation?.wind);

export const selectChill = createDraftSafeSelector(selectWind, (wind) => wind?.chill);

export const selectWeatherPending = createDraftSafeSelector(selectWeatherState, ({ pending }) => pending);
