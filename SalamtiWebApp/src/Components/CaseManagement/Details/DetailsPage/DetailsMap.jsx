import React from "react";

import { GoogleMap, Marker } from "@react-google-maps/api";
import { useGoogleMaps } from "../../../../../Config/GoogleMapsProvider";

const DetailsMap = ({ caseDetails }) => {
  const { isLoaded } = useGoogleMaps();
  const mapContainerStyle = {
    width: "100%",
    minWidth: "300px",
    minHeight: "350px",
    height: "100%",
    borderRadius: "8px",
  };

  const center = {
    lat: caseDetails?.CivilianLocation?.[0] || 0,
    lng: caseDetails?.CivilianLocation?.[1] || 0,
  };
  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <div>
      {caseDetails.CivilianLocation ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={16}
          options={{
            disableDefaultUI: true, // Disable all default controls
          }}
        >
          <Marker position={center} />
        </GoogleMap>
      ) : (
        <p className="text-gray-300">Location data not available</p>
      )}
    </div>
  );
};

export default DetailsMap;
