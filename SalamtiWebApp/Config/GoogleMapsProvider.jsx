import React, { createContext, useContext } from "react";
import { useLoadScript } from "@react-google-maps/api";

const GoogleMapsContext = createContext();

const libraries = ["places"]; // Add required libraries

export const GoogleMapsProvider = ({ children }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBKs_fbiolpGriQHbb0-x8z68Y0p-b2OrY",
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
