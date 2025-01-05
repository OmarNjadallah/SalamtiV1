const googleGeocodeAPI = "AIzaSyBKs_fbiolpGriQHbb0-x8z68Y0p-b2OrY";
export async function getAreasList(casesList) {
  if (!casesList || casesList.length === 0) return [];

  const areas = [];
  const cache = new Map(); // Cache to store results for unique latitude and longitude

  for (let caseItem of casesList) {
    const { latitude, longitude } = caseItem["CivilianLocation"];
    const cacheKey = `${latitude},${longitude}`;

    if (cache.has(cacheKey)) {
      // Use cached data if available
      const cachedArea = cache.get(cacheKey);
      const areaIndex = areas.findIndex((loc) => loc.area === cachedArea);
      if (areaIndex >= 0) {
        areas[areaIndex].count++;
      } else {
        areas.push({ area: cachedArea, count: 1 });
      }
      continue;
    }

    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleGeocodeAPI}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        // Extract neighbourhood, road, locality, sublocality, or administrative area from the address components
        const addressComponents = data.results[0]["address_components"];
        const neighbourhoodComponent = addressComponents.find((component) =>
          component.types.includes("neighborhood")
        );
        const roadComponent = addressComponents.find((component) =>
          component.types.includes("route")
        );
        const sublocalityComponent = addressComponents.find((component) =>
          component.types.includes("sublocality")
        );
        const localityComponent = addressComponents.find((component) =>
          component.types.includes("locality")
        );
        const adminAreaComponent = addressComponents.find((component) =>
          component.types.includes("administrative_area_level_1")
        );

        const areaComponent =
          sublocalityComponent?.long_name ||
          localityComponent?.long_name ||
          neighbourhoodComponent?.long_name ||
          roadComponent?.long_name ||
          adminAreaComponent?.long_name ||
          "Unknown Location";

        // Cache the result
        cache.set(cacheKey, areaComponent);

        const areaIndex = areas.findIndex((loc) => loc.area === areaComponent);
        if (areaIndex >= 0) {
          areas[areaIndex].count++;
        } else {
          areas.push({ area: areaComponent, count: 1 });
        }
      }
    } catch (error) {
      console.error("Failed to fetch geocode data:", error);
    }
  }

  return areas;
}
