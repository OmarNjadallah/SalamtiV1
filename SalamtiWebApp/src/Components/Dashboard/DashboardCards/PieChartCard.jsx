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
    <Card className="rounded-md bg-gray-100 shadow-sm flex flex-col col-span-4 row-span-1 p-2">
      {/* Header Section */}
      <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center p-2">
        <p className="font-bold text-sm md:text-lg">Emergencies Breakdown</p>
        <FormControl size="small" className="mt-2 md:mt-0">
          <Select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            displayEmpty
            className="bg-white border rounded-md text-xs md:text-sm"
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
      <CardContent className="flex-grow flex justify-around items-center p-2">
        {currentData.length > 0 ? (
          <PieChart
            series={[
              {
                cornerRadius: 12,
                data: currentData.map((item) => ({
                  ...item,
                  value: parseInt(item.count), // Use `count` from the new format
                })),
                arcLabel: (item) => item.value,
              },
            ]}
            tooltip={{ trigger: "item" }}
            className="w-full max-w-xs h-full max-h-56"
          />
        ) : (
          <p className="text-gray-500 text-sm text-center">No data available</p>
        )}
      </CardContent>
    </Card>
  );
}

export default EmergenciesBreakdownCard;
