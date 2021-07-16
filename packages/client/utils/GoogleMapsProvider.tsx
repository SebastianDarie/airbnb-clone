import React, { createContext, FC, useContext, useMemo } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { UseLoadScriptOptions } from '@react-google-maps/api/dist/useJsApiLoader';

export type GoogleMapsState = {
  isLoaded: boolean;
  loadError?: Error;
};

const GoogleMapsContext = createContext<GoogleMapsState>({ isLoaded: false });

export const GoogleMapsProvider: FC<UseLoadScriptOptions> = ({
  children,
  ...loadScriptOptions
}) => {
  const { isLoaded, loadError } = useJsApiLoader(loadScriptOptions);

  const value = useMemo(() => ({ isLoaded, loadError }), [isLoaded, loadError]);

  return (
    <GoogleMapsContext.Provider value={value}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => useContext(GoogleMapsContext);
