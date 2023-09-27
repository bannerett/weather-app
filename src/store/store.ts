import { configureStore } from '@reduxjs/toolkit';

import { weatherApi } from '~/store/api/weatherApi';
import weatherSlice from '~/store/reducers/weatherSlice';
import { WeatherResponse } from '~/types/weather';

export interface Store {
  weather: { data: WeatherResponse | null; pending: boolean };
}

export const store = configureStore({
  reducer: { [weatherApi.reducerPath]: weatherApi.reducer, weather: weatherSlice },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherApi.middleware),
});

// setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
