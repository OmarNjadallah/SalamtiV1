export function calculateYearlyMonthlyAverages(cases) {
  console.log(cases);

  // Helper function to parse Firebase Timestamp or AM/PM string to Date
  const parseTimestamp = (timestamp) => {
    if (timestamp?.toDate) {
      return timestamp.toDate(); // Convert Firebase Timestamp to Date
    } else if (typeof timestamp === "string") {
      // Parse string with AM/PM format
      const date = new Date(`1970-01-01T${timestamp}`);
      if (!isNaN(date)) {
        return date;
      }
      console.warn(`Invalid timestamp string: ${timestamp}`);
    }
    return null; // Return null for invalid or missing timestamps
  };

  // Initialize a data structure for grouping by year and month
  const yearlyData = {};

  cases.forEach((caseData, index) => {
    const { RequestTime, ESPsArrivalTime, ESPsFinishTime } = caseData;

    // Validate required fields
    if (
      !RequestTime ||
      !Array.isArray(ESPsArrivalTime) ||
      ESPsArrivalTime.length === 0 ||
      !Array.isArray(ESPsFinishTime) ||
      ESPsFinishTime.length === 0
    ) {
      console.warn(
        `Case at index ${index} is missing required data. Skipping.`,
        { caseData }
      );
      return;
    }

    try {
      const requestTime = parseTimestamp(RequestTime);
      const arrivalTime = parseTimestamp(ESPsArrivalTime[0]?.ArrivalTime); // First arrival time
      const finishTime = parseTimestamp(
        ESPsFinishTime[ESPsFinishTime.length - 1]?.FinishTime
      ); // Last finish time

      // Ensure all parsed dates are valid
      if (!requestTime || !arrivalTime || !finishTime) {
        throw new Error("Invalid timestamp encountered.");
      }

      const year = requestTime.getFullYear(); // Extract year
      const month = requestTime.getMonth(); // Extract month (0-based)
      const responseTime = (arrivalTime - requestTime) / 1000 / 60; // Response time in minutes
      const handlingTime = (finishTime - arrivalTime) / 1000 / 60; // Handling time in minutes

      // Initialize year if not present
      if (!yearlyData[year]) {
        yearlyData[year] = Array.from({ length: 12 }, (_, i) => ({
          month: new Date(0, i).toLocaleString("en", { month: "short" }),
          totalResponseTime: 0,
          totalHandlingTime: 0,
          validCasesCount: 0,
        }));
      }

      // Update monthly data for the year
      yearlyData[year][month].totalResponseTime += responseTime;
      yearlyData[year][month].totalHandlingTime += handlingTime;
      yearlyData[year][month].validCasesCount++;
    } catch (error) {
      console.error(
        `Error processing case at index ${index}: ${error.message}`,
        caseData
      );
    }
  });

  // Calculate averages for each year and month
  const result = {};
  for (const [year, months] of Object.entries(yearlyData)) {
    result[year] = months.map((data) => {
      const { totalResponseTime, totalHandlingTime, validCasesCount } = data;
      return {
        month: data.month,
        averageResponseTime:
          validCasesCount > 0 ? totalResponseTime / validCasesCount : 0, // in minutes
        averageHandlingTime:
          validCasesCount > 0 ? totalHandlingTime / validCasesCount : 0, // in minutes
      };
    });
  }

  return result;
}
