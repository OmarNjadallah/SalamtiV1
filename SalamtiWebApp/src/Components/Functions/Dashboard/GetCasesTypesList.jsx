export function getCasesTypesList(casesList) {
  const allTimeTypes = [];
  const monthlyTypes = {};
  const yearlyTypes = {};
  const todayTypes = [];
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
  const currentDay = currentDate.getDate();

  for (let i = 0; i < casesList.length; i++) {
    const type = casesList[i].EmergencyType;
    const requestTime = casesList[i].RequestTime?.toDate(); // Convert Firestore timestamp to Date
    const requestDay = requestTime?.getDate();
    const requestMonth = requestTime?.getMonth() + 1;
    const requestYear = requestTime?.getFullYear();
    const monthYear = requestTime
      ? `${requestMonth}-${requestYear}`
      : "unknown";

    // Process All-Time Data
    const allTimeTypeIndex = allTimeTypes.findIndex(
      (item) => item.label === type
    );
    if (allTimeTypeIndex >= 0) {
      allTimeTypes[allTimeTypeIndex].count++;
    } else {
      allTimeTypes.push({
        id: allTimeTypes.length + 1,
        label: type,
        count: 1,
      });
    }

    // Process Monthly Data
    if (!monthlyTypes[monthYear]) {
      monthlyTypes[monthYear] = [];
    }
    const monthlyTypeIndex = monthlyTypes[monthYear].findIndex(
      (item) => item.label === type
    );
    if (monthlyTypeIndex >= 0) {
      monthlyTypes[monthYear][monthlyTypeIndex].count++;
    } else {
      monthlyTypes[monthYear].push({
        id: monthlyTypes[monthYear].length + 1,
        label: type,
        count: 1,
      });
    }

    // Process Yearly Data
    if (!yearlyTypes[requestYear]) {
      yearlyTypes[requestYear] = [];
    }
    const yearlyTypeIndex = yearlyTypes[requestYear].findIndex(
      (item) => item.label === type
    );
    if (yearlyTypeIndex >= 0) {
      yearlyTypes[requestYear][yearlyTypeIndex].count++;
    } else {
      yearlyTypes[requestYear].push({
        id: yearlyTypes[requestYear].length + 1,
        label: type,
        count: 1,
      });
    }

    // Process Today's Data
    if (
      requestDay === currentDay &&
      requestMonth === currentMonth &&
      requestYear === currentYear
    ) {
      const todayTypeIndex = todayTypes.findIndex(
        (item) => item.label === type
      );
      if (todayTypeIndex >= 0) {
        todayTypes[todayTypeIndex].count++;
      } else {
        todayTypes.push({
          id: todayTypes.length + 1,
          label: type,
          count: 1,
        });
      }
    }
  }

  // Ensure all lists are sorted by `label` alphabetically (optional)
  allTimeTypes.sort((a, b) => a.label.localeCompare(b.label));
  todayTypes.sort((a, b) => a.label.localeCompare(b.label));

  return {
    today: todayTypes,
    thisMonth: monthlyTypes[`${currentMonth}-${currentYear}`] || [],
    thisYear: yearlyTypes[currentYear] || [],
    allTime: allTimeTypes,
  };
}
