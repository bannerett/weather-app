import { ReactNode, useEffect, useState } from 'react';

import { GeoPositionContext, GeoPositionContextType } from '~/providers/GeopositionContext';

function GeoPositionProvider({ children }: { children: ReactNode }) {
  const [position, setPosition] = useState<GeoPositionContextType | null>(null);

  useEffect(() => {
    const watchId = window.navigator.geolocation.watchPosition((data) => {
      setPosition({ ...data, pos: { latitude: data.coords.latitude, longitude: data.coords.longitude } });
    });

    return () => {
      window.navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return <GeoPositionContext.Provider value={position}>{children}</GeoPositionContext.Provider>;
}

export default GeoPositionProvider;
