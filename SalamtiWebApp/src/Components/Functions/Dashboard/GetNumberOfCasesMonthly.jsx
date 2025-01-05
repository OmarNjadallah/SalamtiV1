export function getNumOfEmergenciesList(casesList) {
  // Initialize an object to hold data by year and month
  const numOfEmergenciesList = {};

  // Iterate through cases to populate monthly emergency counts
  casesList.forEach((caseItem) => {
    const caseStatus = caseItem.Status?.toLowerCase() || "unknown"; // Normalize status
    if (caseStatus === "ongoing" || caseStatus === "complete") {
      const requestTime = caseItem.RequestTime?.toDate();
      if (requestTime) {
        const year = requestTime.getFullYear(); // Extract the year
        const month = requestTime.getMonth(); // Extract the month

        // Initialize the year if not present
        if (!numOfEmergenciesList[year]) {
          numOfEmergenciesList[year] = Array.from({ length: 12 }, (_, i) => ({
            month: new Date(0, i).toLocaleString("en", { month: "short" }),
            value: 0,
          }));
        }

        // Increment count for the corresponding month of the year
        numOfEmergenciesList[year][month].value += 1;
      }
    }
  });

  return numOfEmergenciesList;
}
