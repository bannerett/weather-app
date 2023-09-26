import { ReactNode, useEffect, useState } from 'react';

import { GeoPositionContext } from '~/providers/GeopositionContext';

function GeoPositionProvider({ children }: { children: ReactNode }) {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    const watchId = window.navigator.geolocation.watchPosition((data) => {
      setPosition(data);
    });

    return () => {
      window.navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return <GeoPositionContext.Provider value={position}>{children}</GeoPositionContext.Provider>;
}

export default GeoPositionProvider;
