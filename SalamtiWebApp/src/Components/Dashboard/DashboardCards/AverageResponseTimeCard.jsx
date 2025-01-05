import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function MonthlyAveragesCard({ yearlyMonthlyAverages }) {
  const availableYears = Object.keys(yearlyMonthlyAverages).sort();
  const [selectedYear, setSelectedYear] = useState(availableYears[0]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const data = yearlyMonthlyAverages[selectedYear] || [];

  return (
    <Card className="w-full max-w-3xl h-auto rounded-lg bg-grey shadow-md flex flex-col col-span-4">
      <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4">
        <h1 className="font-bold text-2xl sm:text-xl">Monthly Averages</h1>
        <div className="flex items-center">
          <p className="text-gray-500 font-bold mr-2">Year:</p>
          <Select
            value={selectedYear}
            onChange={handleYearChange}
            size="small"
            className="h-8 bg-white border rounded-md"
          >
            {availableYears.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </div>
      </CardContent>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="averageResponseTime"
              name="Avg Response Time (min)"
              fill="#8884d8"
            />
            <Bar
              dataKey="averageHandlingTime"
              name="Avg Handling Time (min)"
              fill="#82ca9d"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default MonthlyAveragesCard;
