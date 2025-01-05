import React, { useState, useEffect, useRef } from "react";
import { useUsers } from "../Functions/fetchusersformap";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useGoogleMaps } from "../../../Config/GoogleMapsProvider";

const ESPMap = ({ selectedUser }) => {
  const { users, fetchUsersForMap } = useUsers();
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 }); // Initial center
  const [zoomLevel, setZoomLevel] = useState(17); // Track the map's zoom level
  const [localSelectedUser, setLocalSelectedUser] = useState(null); // Track the marker clicked on the map
  const mapRef = useRef(null); // Ref for the map instance
  const { isLoaded } = useGoogleMaps(); // Use centralized provider to check if the map is loaded

  useEffect(() => {
    fetchUsersForMap();
  }, [fetchUsersForMap]);

  useEffect(() => {
    if (users.length > 0 && !selectedUser) {
      // Center map on the first user if no user is selected
      const firstUser = users[0];
      const lat = firstUser?.Location?._lat || firstUser?.Location?.latitude;
      const lng = firstUser?.Location?._long || firstUser?.Location?.longitude;

      if (typeof lat === "number" && typeof lng === "number") {
        setMapCenter({ lat, lng });
      }
    }
  }, [users, selectedUser]);

  useEffect(() => {
    // Center map when a user is selected from the table
    if (selectedUser) {
      const { Location } = selectedUser;
      const lat = Location?._lat || Location?.latitude;
      const lng = Location?._long || Location?.longitude;

      if (lat && lng) {
        setMapCenter({ lat, lng });
        if (mapRef.current) {
          mapRef.current.panTo({ lat, lng });
        }
      }
    }
  }, [selectedUser]);

  const handleZoomChanged = () => {
    if (mapRef.current) {
      const newZoom = mapRef.current.getZoom();
      setZoomLevel(newZoom); // Update zoom level state
    }
  };

  if (!isLoaded) return <div>Loading map...</div>;

  const getMarkerIcon = (type, availability, size) => {
    const baseSize = size || 30; // Default size
    let iconUrl;
    switch (type) {
      case "police":
        iconUrl =
          "https://res.cloudinary.com/dqpohshle/image/upload/v1735406283/police_top_lgmot9.png";
        break;

      case "ambulance":
        iconUrl =
          "https://res.cloudinary.com/dqpohshle/image/upload/v1735406283/Ambulance_Top_2_fahbnh.png";
        break;
      case "firetruck":
        iconUrl =
          "https://res.cloudinary.com/dqpohshle/image/upload/v1735406283/Fire_truck_top_oi6p1x.png";
        break;
      default:
        iconUrl =
          availability === "occupied"
            ? "https://cdn-icons-png.flaticon.com/512/1828/1828843.png"
            : "https://cdn-icons-png.flaticon.com/512/1828/1828884.png";
    }
    return {
      url: iconUrl,
      scaledSize: new window.google.maps.Size(baseSize, baseSize),
    };
  };

  return (
    <div style={{ height: "60vh", width: "100%" }}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={zoomLevel}
        center={mapCenter}
        onLoad={(map) => {
          mapRef.current = map; // Save the map instance to the ref
          map.addListener("zoom_changed", handleZoomChanged);
        }}
        onUnmount={() => (mapRef.current = null)} // Cleanup on unmount
      >
        {users.map((user) => {
          const location = user.Location;
          const lat = location?._lat || location?.latitude;
          const lng = location?._long || location?.longitude;

          if (typeof lat !== "number" || typeof lng !== "number") {
            console.error("Invalid location for user:", user);
            return null;
          }

          const iconSize = Math.max(20, zoomLevel * 3); // Dynamically scale icon size

          return (
            <Marker
              key={user.id}
              position={{ lat, lng }}
              title={`ESP: ${user.ESPType}\nAvailability: ${user.Availability}`}
              icon={getMarkerIcon(user.ESPType, user.Availability, iconSize)}
              onClick={() => setLocalSelectedUser(user)} // Set the selected user on marker click
            />
          );
        })}

        {localSelectedUser && (
          <InfoWindow
            position={{
              lat:
                localSelectedUser.Location._lat ||
                localSelectedUser.Location.latitude,
              lng:
                localSelectedUser.Location._long ||
                localSelectedUser.Location.longitude,
            }}
            onCloseClick={() => setLocalSelectedUser(null)} // Close InfoWindow
          >
            <div>
              <p>
                <strong>ESP Type:</strong> {localSelectedUser.ESPType}
              </p>
              <p>
                <strong>Availability:</strong> {localSelectedUser.Availability}
              </p>
              <p>
                <strong>License Plate:</strong> {localSelectedUser.Username}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default ESPMap;
