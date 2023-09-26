import { createContext } from 'react';

export const GeoPositionContext = createContext<GeolocationPosition | null>(null);
