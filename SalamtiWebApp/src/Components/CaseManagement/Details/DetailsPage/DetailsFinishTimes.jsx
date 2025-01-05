import React from "react";
import { formatTimestamp } from "../../../Functions/FormatTimeStamp";

const DetailsFinishTimes = ({ caseDetails }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2 text-left">
        ESP Finish Times:
      </h2>
      {caseDetails.ESPsFinishDetails?.length > 0 ? (
        <table className="table-auto w-full text-left text-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-700  w-[20%]">
                License Plate
              </th>
              <th className="px-4 py-2 border-b border-gray-700">Type</th>
              <th className="px-4 py-2 border-b border-gray-700">
                Finish Time
              </th>
              <th className="px-4 py-2 border-b border-gray-700">ESP ID</th>
            </tr>
          </thead>
          <tbody>
            {caseDetails.ESPsFinishDetails.map((entry, index) => (
              <tr key={index} className="hover:bg-custom-dark-gray">
                <td className="px-4 py-2">{entry.Username || "Unknown"}</td>
                <td className="px-4 py-2">{entry.Type || "Unknown"}</td>
                <td className="px-4 py-2">
                  {entry.FinishTime
                    ? formatTimestamp(entry.FinishTime)
                    : "Unknown"}
                </td>
                <td className="px-4 py-2">{entry.ESPID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-300">No finish times available</p>
      )}
    </div>
  );
};

export default DetailsFinishTimes;
