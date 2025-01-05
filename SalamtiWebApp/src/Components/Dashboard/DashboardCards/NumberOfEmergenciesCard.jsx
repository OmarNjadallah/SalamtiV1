import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { LineChart } from "@mui/x-charts/LineChart";

function NumberOfEmergenciesCard({ numOfEmergenciesList }) {
  // Extract available years from the dataset
  const availableYears = Object.keys(numOfEmergenciesList).sort();
  // State for the selected year
  const [selectedYear, setSelectedYear] = useState(availableYears[0]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <Card className="w-full max-w-3xl lg:max-w-5xl h-auto rounded-lg bg-gray-100 shadow-md p-4 flex flex-col col-span-4">
      <CardContent className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <p className="font-bold text-lg md:text-2xl">Number of Emergencies</p>
        <div className="flex items-center mt-4 md:mt-0">
          <p className="text-gray-500 font-bold mr-3 text-sm md:text-base">
            Year:
          </p>
          <Select
            value={selectedYear}
            onChange={handleYearChange}
            className="bg-white border rounded-md text-sm md:text-base font-bold"
            sx={{
              height: 36,
              fontSize: "16px",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove default border
              },
            }}
          >
            {availableYears.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </div>
      </CardContent>
      <div className="flex-grow w-full h-[250px] md:h-[350px]">
        <LineChart
          xAxis={[
            {
              scaleType: "band",
              dataKey: "month",
            },
          ]}
          series={[
            {
              dataKey: "value",
              disableHighlight: true,
            },
          ]}
          dataset={numOfEmergenciesList[selectedYear]}
          colors={["black"]}
          tooltip={{ trigger: "none" }}
          disableLineItemHighlight
        />
      </div>
    </Card>
  );
}

export default NumberOfEmergenciesCard;
