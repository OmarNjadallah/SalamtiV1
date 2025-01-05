export function getEmergenciesCount(casesList) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
  const currentDay = currentDate.getDate();

  // Initialize counters for each type and period
  let complete = { today: 0, thisMonth: 0, thisYear: 0, allTime: 0 };
  let ongoing = { today: 0, thisMonth: 0, thisYear: 0, allTime: 0 };

  for (let i = 0; i < casesList.length; i++) {
    const caseItem = casesList[i];
    const status = caseItem.Status;
    const requestTime = caseItem.RequestTime?.toDate(); // Convert Firestore timestamp to Date

    if (requestTime) {
      const requestYear = requestTime.getFullYear();
      const requestMonth = requestTime.getMonth() + 1;
      const requestDay = requestTime.getDate();

      // Handle "complete" cases
      if (status === "complete") {
        complete.allTime++;

        if (requestYear === currentYear) {
          complete.thisYear++;

          if (requestMonth === currentMonth) {
            complete.thisMonth++;

            if (requestDay === currentDay) {
              complete.today++;
            }
          }
        }
      }

      // Handle "ongoing" cases
      if (status === "ongoing") {
        ongoing.allTime++;

        if (requestYear === currentYear) {
          ongoing.thisYear++;

          if (requestMonth === currentMonth) {
            ongoing.thisMonth++;

            if (requestDay === currentDay) {
              ongoing.today++;
            }
          }
        }
      }
    } else {
      console.warn("Invalid RequestTime for case:", caseItem);
    }
  }

  return { complete, ongoing };
}
