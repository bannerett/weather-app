import { useContext } from 'react';

import { GeoPositionContext, GeoPositionContextType } from '~/providers/GeopositionContext';

export const useGeoPositionContext = () => {
  const ctx = useContext(GeoPositionContext);

  if (!ctx) return {} as Partial<GeoPositionContextType>;

  return ctx;
};
