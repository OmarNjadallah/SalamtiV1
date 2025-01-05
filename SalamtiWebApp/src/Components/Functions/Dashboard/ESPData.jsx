export function ESPsData(espsList) {
  const groupedData = {};

  for (let i = 0; i < espsList.length; i++) {
    const esp = espsList[i];
    const { Availability, ESPType } = esp;

    // Ensure ESPType is initialized in groupedData
    if (!groupedData[ESPType]) {
      groupedData[ESPType] = {
        available: 0,
        unavailable: 0,
        occupied: 0,
      };
    }

    // Increment counts based on Availability
    if (Availability === "available") {
      groupedData[ESPType].available++;
    } else if (Availability === "unavailable") {
      groupedData[ESPType].unavailable++;
    } else if (Availability === "occupied") {
      groupedData[ESPType].occupied++;
    }
  }

  return groupedData;
}
