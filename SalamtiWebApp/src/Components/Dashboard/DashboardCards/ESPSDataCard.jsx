import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

function ESPStatusCard({ ESPData }) {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("available");

  const count =
    selectedType === "all"
      ? Object.values(ESPData).reduce(
          (total, typeData) =>
            total +
            (selectedStatus === "total"
              ? (typeData.available || 0) +
                (typeData.occupied || 0) +
                (typeData.unavailable || 0)
              : typeData[selectedStatus] || 0),
          0
        )
      : selectedStatus === "total"
      ? (ESPData[selectedType]?.available || 0) +
        (ESPData[selectedType]?.occupied || 0) +
        (ESPData[selectedType]?.unavailable || 0)
      : ESPData[selectedType]?.[selectedStatus] || 0;

  const statusColors = {
    total: "#1F2937",
    available: "green",
    occupied: "orange",
    unavailable: "red",
  };

  return (
    <Card className="w-full max-w-sm md:max-w-md h-auto rounded-lg bg-gray-100 shadow-md p-4  ">
      <CardContent>
        {/* Title Dropdown */}
        <FormControl className="w-full flex justify-center items-center mt-4">
          <Select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            displayEmpty
            sx={{
              fontSize: "28px",
              fontWeight: "bold",
              color: statusColors[selectedStatus],
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove border
              },
              "&:focus": {
                outline: "none", // Remove focus outline
              },
            }}
          >
            <MenuItem value="total">Total ESPs</MenuItem>
            <MenuItem value="available">Active ESPs</MenuItem>
            <MenuItem value="occupied">Occupied ESPs</MenuItem>
            <MenuItem value="unavailable">Offline ESPs</MenuItem>
          </Select>
        </FormControl>

        {/* Type Dropdown */}
        <FormControl className="w-full flex justify-center items-center mt-4">
          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            displayEmpty
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#1F2937",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove border
              },
              "&:focus": {
                outline: "none", // Remove focus outline
              },
            }}
          >
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="police">Police</MenuItem>
            <MenuItem value="firetruck">Firetruck</MenuItem>
            <MenuItem value="ambulance">Ambulance</MenuItem>
            <MenuItem value="hazmatUnit">Hazmat Unit</MenuItem>
            <MenuItem value="tacticalUnit">Tactical Unit</MenuItem>
            <MenuItem value="engineeringUnit">Engineering Unit</MenuItem>
            <MenuItem value="transportUnit">Transport Unit</MenuItem>
          </Select>
        </FormControl>

        {/* Displayed Count */}
        <p
          className="flex justify-center font-bold text-3xl md:text-4xl mt-5"
          style={{
            color: statusColors[selectedStatus],
          }}
        >
          {count}
        </p>
      </CardContent>
    </Card>
  );
}

export default ESPStatusCard;
