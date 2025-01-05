import React, { createContext, useContext } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { googleApiKey } from "./GoogleAPIkey";

const GoogleMapsContext = createContext();

const libraries = ["places"]; // Add required libraries

export const GoogleMapsProvider = ({ children }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleApiKey,
    libraries,
  });

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => {
  return useContext(GoogleMapsContext);
};
