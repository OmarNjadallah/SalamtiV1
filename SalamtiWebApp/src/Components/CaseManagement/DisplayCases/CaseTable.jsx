import React from "react";
import CaseRow from "./CaseRow"; // The CaseRow component

const CaseTable = ({ cases }) => {
  return (
    <div>
      <table className="w-full border-collapse border-b-2 text-center">
        <thead>
          <tr>
            <th className="bg-custom-gray-light px-4 py-2 w-[5%]">
              Emergency Type
            </th>
            <th className="bg-custom-gray-light px-4 py-2 w-[5%]">
              Civilian Location
            </th>
            <th className="bg-custom-gray-light px-4 py-2 w-[5%]">Status</th>
            <th className="bg-custom-gray-light px-4 py-2 w-[5%]">
              Request Time
            </th>
            <th className="bg-custom-gray-light px-4 py-2 w-[5%]">
              Finish Time
            </th>
            <th className="bg-custom-gray-light px-4 py-2 w-[10%]">Case ID</th>
            <th className="bg-custom-gray-light px-4 py-2 w-[10%]">
              Civilian ID
            </th>
            <th className="bg-custom-gray-light px-4 py-2 w-[5%]">Details</th>
          </tr>
        </thead>
        <tbody>
          {cases.length > 0 ? (
            cases.map((caseData) => (
              <CaseRow key={caseData.id} caseData={caseData} />
            ))
          ) : (
            <tr>
              <td colSpan="8" className="border-t px-4 py-2 text-center">
                No cases found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CaseTable;
