import React from "react";
import Details from "../Details/Details";

const CaseRow = ({ caseData }) => {
  // Determine the background color for the Status column only
  const statusClass =
    caseData.Status === "ongoing"
      ? "bg-yellow-100 text-yellow-800 font-semibold"
      : caseData.Status === "complete"
      ? "bg-green-100 text-green-800 font-semibold"
      : "";

  return (
    <tr className="hover:bg-gray-100">
      <td className="border-t px-4 py-2">{caseData.EmergencyType}</td>
      <td className="border-t px-4 py-2">{caseData.AreaName}</td>
      <td className={`border-t px-4 py-2 ${statusClass}`}>{caseData.Status}</td>
      <td className="border-t px-4 py-2">
        {caseData.RequestTime && caseData.RequestTime.toDate
          ? new Date(caseData.RequestTime.toDate()).toLocaleString()
          : "Unknown"}
      </td>
      <td className="border-t px-4 py-2">
        {caseData.FinishTime ? caseData.FinishTime.toLocaleString() : "Unknown"}
      </td>
      <td className="border-t px-4 py-2">{caseData.id}</td>
      <td className="border-t px-4 py-2">{caseData.CivilianID}</td>
      <td className="border-t px-4 py-2 flex-row">
        <Details caseId={caseData.id} />
      </td>
    </tr>
  );
};

export default CaseRow;
