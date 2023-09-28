import { createContext } from 'react';

export type GeoPositionContextType = GeolocationPosition & { pos: { latitude: number; longitude: number } };

export const GeoPositionContext = createContext<GeoPositionContextType | null>(null);
