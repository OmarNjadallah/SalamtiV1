import { db } from "../../../Config/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { calculateYearlyMonthlyAverages } from "./Dashboard/AvgResponseTime";
import { ESPsData } from "./Dashboard/ESPData";
import { getEmergenciesCount } from "./Dashboard/GetEmergenciesCount";
import { getCasesTypesList } from "./Dashboard/GetCasesTypesList";
import { getAreasList } from "./Dashboard/GetAreasList"; // Updated function to handle time periods
import { sortCasesByDate } from "./Dashboard/SortCasesByDateComplete";
import { getNumOfEmergenciesList } from "./Dashboard/GetNumberOfCasesMonthly";

export async function fetchFirestoreData() {
  try {
    const [casesSnapshot, espsSnapshot] = await Promise.all([
      getDocs(collection(db, "cases")),
      getDocs(collection(db, "esps")),
    ]);

    const casesList = casesSnapshot.docs.map((doc) => doc.data());
    const espsList = espsSnapshot.docs.map((doc) => doc.data());

    return { casesList, espsList };
  } catch (error) {
    console.error("Error fetching Firestore data:", error);
    return { casesList: [], espsList: [] }; // Return empty arrays on failure
  }
}

export async function initializeDashboardData() {
  try {
    // Fetch data from Firestore
    const { casesList, espsList } = await fetchFirestoreData();

    if (casesList.length === 0 && espsList.length === 0) {
      console.warn("No data found in Firestore.");
      return null;
    }

    // Sort cases by date periods
    const sortedData = sortCasesByDate(casesList);

    async function areascal() {
      return {
        allTime: await getAreasList((await sortedData).completed),
        today: await getAreasList((await sortedData).today),
        thisMonth: await getAreasList((await sortedData).thisMonth),
        thisYear: await getAreasList((await sortedData).thisYear),
      };
    }
    // Process data in parallel
    const [
      casesTypesList,
      avgResponseTimeList,
      numOfEmergenciesList,
      areas,
      ESPData,
      casesData,
    ] = await Promise.all([
      getCasesTypesList(casesList),
      calculateYearlyMonthlyAverages((await sortedData).completed),
      getNumOfEmergenciesList(casesList),
      areascal(), // Updated function for all time periods
      ESPsData(espsList),
      getEmergenciesCount(casesList),
    ]);

    // Return the processed dashboard data
    return {
      areas,
      casesTypesList,
      avgResponseTimeList,
      numOfEmergenciesList,
      ESPData,
      casesData,
    };
  } catch (error) {
    console.error("Error initializing dashboard data:", error);
    return null;
  }
}
