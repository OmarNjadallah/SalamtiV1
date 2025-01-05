import React, { useState, useEffect } from "react";
import CaseTable from "./CaseTable"; // Component to display the cases table
import { useCases } from "../../Functions/UseCasesHook"; // Hook to fetch cases

const DisplayCases = ({ searchQuery }) => {
  const { cases, fetchCases } = useCases();
  const [filteredCases, setFilteredCases] = useState([]);

  // Function to match query with dates
  const isDateMatch = (query, date) => {
    if (!date) return false;

    // Convert date to multiple formats
    const isoDate = date.toISOString().split("T")[0]; // e.g., "2024-12-30"
    const localDate = date.toLocaleDateString(); // e.g., "12/30/2024" or "30/12/2024" based on locale
    const time = date.toLocaleTimeString(); // e.g., "10:30:00 AM"

    // Check if query matches any date or time format
    return (
      isoDate.includes(query) ||
      localDate.includes(query) ||
      time.includes(query)
    );
  };

  // Filter cases based on search query
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();

    const filtered = cases.filter((caseData) => {
      // Extract fields and ensure they are valid strings
      const id = caseData.id?.toLowerCase() || "";
      const civilianID = caseData.CivilianID?.toLowerCase() || "";
      const emergencyTypeText = caseData.EmergencyType.toLowerCase() || "";
      const location =
        Array.isArray(caseData.CivilianLocation) &&
        caseData.CivilianLocation.length === 2
          ? `${caseData.CivilianLocation[0]},${caseData.CivilianLocation[1]}`.toLowerCase()
          : "";
      const requestTime = caseData.RequestTime?.toDate
        ? caseData.RequestTime.toDate()
        : null;
      const Status = caseData.Status?.toLowerCase() || "";

      // Match against all fields
      return (
        id.includes(lowercasedQuery) ||
        civilianID.includes(lowercasedQuery) ||
        emergencyTypeText.toLowerCase().includes(lowercasedQuery) ||
        location.includes(lowercasedQuery) ||
        (requestTime && isDateMatch(lowercasedQuery, requestTime)) ||
        Status.includes(lowercasedQuery)
      );
    });

    setFilteredCases(filtered);
  }, [searchQuery, cases]);

  // Fetch cases on component mount
  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  return (
    <div className="rounded-2xl w-[97%] mr-auto mt-6 ml-5 border-4 border-black h-fit overflow-auto no-scrollbar">
      <CaseTable cases={filteredCases} />
    </div>
  );
};

export default DisplayCases;
