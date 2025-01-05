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

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-6 h-full">
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col gap-4">
          <ESPStatusCard ESPData={dashboardData.ESPData} />
          <TotalEmergenciesCard caseList={dashboardData.casesData} />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 ">
          <EmergenciesBreakdownCard casesData={dashboardData.casesTypesList} />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-3">
          <EmergenciesPerAreaCard areas={dashboardData.areas} />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-4">
          <MonthlyAveragesCard
            yearlyMonthlyAverages={dashboardData.avgResponseTimeList}
          />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-4">
          <NumberOfEmergenciesCard
            numOfEmergenciesList={dashboardData.numOfEmergenciesList}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
