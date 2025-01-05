export async function sortCasesByDate(casesList) {
  try {
    const now = new Date();
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const yearStart = new Date(now.getFullYear(), 0, 1);

    const todayCases = [];
    const thisMonthCases = [];
    const thisYearCases = [];
    const completedCases = [];

    casesList.forEach((c) => {
      const requestTime = c.RequestTime?.toDate();
      const Status = c.Status;

      // Add to `completedCases` if status is "complete"
      if (Status === "complete") {
        completedCases.push(c);
      }

      if (!requestTime) return;

      // Add to `today` if it belongs to today
      if (requestTime >= todayStart && Status === "complete") {
        todayCases.push(c);
      }

      // Add to `thisMonth` if it belongs to this month
      if (requestTime >= monthStart && Status === "complete") {
        thisMonthCases.push(c);
      }

      // Add to `thisYear` if it belongs to this year
      if (requestTime >= yearStart && Status === "complete") {
        thisYearCases.push(c);
      }
    });

    return {
      today: todayCases,
      thisMonth: thisMonthCases,
      thisYear: thisYearCases,
      completed: completedCases,
    };
  } catch (error) {
    console.error("Error sorting cases:", error);
    throw error;
  }
}
