import { combineReducers, configureStore } from '@reduxjs/toolkit';

import weatherSlice from '~/store/reducers/weatherSlice';
import { WeatherResponse } from '~/types/weather';

export interface Store {
  weather: { data: WeatherResponse | null; pending: boolean };
}

export const store = configureStore({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  reducer: combineReducers<Store>({ weather: weatherSlice }),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherApi.middleware),
});

// setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
