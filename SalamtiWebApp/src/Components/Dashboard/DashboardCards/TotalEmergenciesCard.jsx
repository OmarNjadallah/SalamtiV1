import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

function TotalEmergenciesCard({ caseList }) {
  const [selectedStatus, setSelectedStatus] = useState("completed"); // Default status
  const [timePeriod, setTimePeriod] = useState("allTime"); // Default time period

  // Map data for time periods and statuses
  const timePeriodData = {
    completed: {
      today: caseList.complete?.today || 0,
      thisMonth: caseList.complete?.thisMonth || 0,
      thisYear: caseList.complete?.thisYear || 0,
      allTime: caseList.complete?.allTime || 0,
    },
    ongoing: {
      allTime: caseList.ongoing?.allTime || 0, // Only All Time is relevant for ongoing
    },
  };

  const displayValue =
    selectedStatus === "ongoing"
      ? timePeriodData[selectedStatus].allTime
      : timePeriodData[selectedStatus][timePeriod];

  // Define colors for each status
  const statusColors = {
    completed: "green", // Green for Completed
    ongoing: "red", // Red for Ongoing
  };

  return (
    <Card className="rounded-lg bg-gray-100 shadow-md flex flex-col ">
      <CardContent>
        {/* Status Dropdown */}
        <FormControl className="w-full flex justify-center items-center mt-4">
          <Select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            displayEmpty
            className="text-center text-xl md:text-2xl font-bold"
            style={{
              color: statusColors[selectedStatus], // Dynamically apply color
            }}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove default border
              },
              "&:focus": {
                outline: "none", // Remove focus outline
              },
            }}
          >
            <MenuItem value="completed">Completed Emergencies</MenuItem>
            <MenuItem value="ongoing">Ongoing Emergencies</MenuItem>
          </Select>
        </FormControl>

        {/* Time Period Dropdown */}
        {selectedStatus === "completed" && (
          <FormControl className="w-full flex justify-center items-center mt-4">
            <Select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              displayEmpty
              className="text-center text-lg font-bold text-gray-800"
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
        )}

        {/* Displayed Value */}
        <p
          className="flex justify-center font-bold text-3xl md:text-4xl mt-5"
          style={{
            color: statusColors[selectedStatus], // Dynamically apply color
          }}
        >
          {displayValue}
        </p>
      </CardContent>
    </Card>
  );
}

export default TotalEmergenciesCard;
