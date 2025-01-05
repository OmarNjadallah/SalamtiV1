import React, { useState, useEffect } from "react";
import { initializeDashboardData } from "../Functions/DashboardInfoFunctions";

import ESPStatusCard from "./DashboardCards/ESPSDataCard";
import TotalEmergenciesCard from "./DashboardCards/TotalEmergenciesCard";
import EmergenciesBreakdownCard from "./DashboardCards/PieChartCard";
import EmergenciesPerAreaCard from "./DashboardCards/EmergenciesPerAreaCard";
import MonthlyAveragesCard from "./DashboardCards/AverageResponseTimeCard";
import NumberOfEmergenciesCard from "./DashboardCards/NumberOfEmergenciesCard";

function App() {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await initializeDashboardData();
        if (data) {
          setDashboardData(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError(true);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="text-center mt-10">
        Failed to load dashboard data. Please try again later.
      </div>
    );
  }

  if (!dashboardData) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const {
    areas,
    casesTypesList,
    avgResponseTimeList,
    numOfEmergenciesList,
    ESPData,
    casesData,
  } = dashboardData;

  return (
    <div className="container mx-auto p-4 h-screen">
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-8 w-full gap-4 h-full">
        {/* First Row: Smaller Cards */}
        <div className="flex flex-col col-span-1 gap-4">
          <ESPStatusCard ESPData={ESPData} />
          <TotalEmergenciesCard caseList={casesData} />
        </div>

        {/* Second Row: Medium Cards */}
        <EmergenciesBreakdownCard casesData={casesTypesList} />
        <EmergenciesPerAreaCard areas={areas} />

        {/* Third Row: Wider Cards */}
        <MonthlyAveragesCard yearlyMonthlyAverages={avgResponseTimeList} />
        <NumberOfEmergenciesCard numOfEmergenciesList={numOfEmergenciesList} />
      </div>
    </div>
  );
}

export default App;
