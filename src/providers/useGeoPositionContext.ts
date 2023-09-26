import { useContext } from 'react';

import { GeoPositionContext } from '~/providers/GeopositionContext';

export const useGeoPositionContext = () => {
  const ctx = useContext(GeoPositionContext);

  if (!ctx) return {} as Partial<GeolocationPosition>;

  return ctx;
};
