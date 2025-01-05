import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { PieChart } from "@mui/x-charts/PieChart";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

function EmergenciesBreakdownCard({ casesData }) {
  const [timePeriod, setTimePeriod] = useState("thisMonth");

  // Handle empty data fallback
  const currentData =
    timePeriod && casesData[timePeriod] ? casesData[timePeriod] : [];

  return (
    <Card className="rounded-lg bg-gray-100 shadow-md flex flex-col col-span-4 row-span-1 h-full">
      {/* Header Section */}
      <CardContent className="flex justify-between items-center p-4 border-b">
        <p className="font-bold text-lg">Emergencies Breakdown</p>
        <FormControl size="small" className="w-auto">
          <Select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            displayEmpty
            className="bg-white border rounded-md text-sm"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove default border
              },
              "&:focus": {
                outline: "none", // Remove focus outline
              },
            }}
          >
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="thisMonth">This Month</MenuItem>
            <MenuItem value="thisYear">This Year</MenuItem>
            <MenuItem value="allTime">All Time</MenuItem>
          </Select>
        </FormControl>
      </CardContent>

      {/* Chart Section */}
      <CardContent className="flex-grow flex justify-center items-center">
        {currentData.length > 0 ? (
          <PieChart
            series={[
              {
                cornerRadius: 5,
                data: currentData.map((item) => ({
                  ...item,
                  value: parseInt(item.count, 10),
                })),
                arcLabel: (item) => `${item.value}`, // Ensure the value is returned as a string
              },
            ]}
            tooltip={{ trigger: "item" }}
            className="w-full h-full max-h-[220px]"
          />
        ) : (
          <p className="text-gray-500 text-sm text-center">No data available</p>
        )}
      </CardContent>
    </Card>
  );
}

export default EmergenciesBreakdownCard;
