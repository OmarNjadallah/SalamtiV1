import React from "react";

const DetailsEmergencyDetails = ({ caseDetails }) => {
  return (
    <div className="p-3 bg-black rounded-md shadow-md border h-[350px] overflow-scroll border-gray-700">
      <h2 className="text-md font-semibold mb-3 text-left text-white">
        Emergency Details
      </h2>
      <ul className="space-y-2">
        {caseDetails.EmergencyDetails?.length > 0 ? (
          caseDetails.EmergencyDetails.map((entry, index) => (
            <li
              key={index}
              className="p-2 bg-custom-dark-gray rounded-md border border-gray-700"
            >
              <p className="text-sm font-bold text-gray-100">
                Q:{" "}
                <span className="font-normal text-gray-400">
                  {entry.Question}
                </span>
              </p>
              <p className="text-sm font-bold text-gray-100">
                A:{" "}
                <span className="font-normal text-gray-400">
                  {entry.Answer}
                </span>
              </p>
            </li>
          ))
        ) : (
          <li className="p-2 bg-gray-900 rounded-md border border-gray-700 text-gray-400">
            No emergency details available
          </li>
        )}
      </ul>
    </div>
  );
};

export default DetailsEmergencyDetails;
