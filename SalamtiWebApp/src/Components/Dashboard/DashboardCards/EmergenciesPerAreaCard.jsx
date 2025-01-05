import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function EmergenciesPerAreaCard({ areas }) {
  const [selectedPeriod, setSelectedPeriod] = useState("thisYear");

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  const selectedAreas = (areas[selectedPeriod] || [])
    .slice()
    .sort((a, b) => b.count - a.count);

  return (
    <Card className="w-full h-full rounded-lg bg-gray-100 shadow-md flex flex-col col-span-3 row-span-1">
      {/* Card Header */}
      <CardContent className="flex justify-between items-center p-4 border-b">
        <Typography className="font-bold text-lg sm:text-xl">
          Emergencies per area
        </Typography>
        <Select
          value={selectedPeriod}
          onChange={handlePeriodChange}
          size="small"
          className="text-gray-800 text-sm font-bold bg-white border rounded-md"
        >
          <MenuItem value="allTime">All Time</MenuItem>
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="thisMonth">This Month</MenuItem>
          <MenuItem value="thisYear">This Year</MenuItem>
        </Select>
      </CardContent>

      {/* Card Content */}
      <div className="flex-grow overflow-y-auto p-4">
        {selectedAreas.length > 0 ? (
          selectedAreas.map((area, i) => (
            <div
              key={i}
              className="flex justify-between py-2 border-b last:border-b-0"
            >
              <Typography className="font-bold text-gray-800">
                {area.area}
              </Typography>
              <Typography className="text-gray-700 font-bold">
                {area.count}
              </Typography>
            </div>
          ))
        ) : (
          <div className="text-center">
            <Typography className="text-gray-500">No data available</Typography>
          </div>
        )}
      </div>
    </Card>
  );
}

export default EmergenciesPerAreaCard;
