import React from "react";

const DetailsTable = ({ caseDetails }) => {
  return (
    <div>
      <table className="table-auto w-[25vw] text-left text-gray-300 border-collapse border border-white h-[350px]">
        <tbody>
          <tr className="hover:bg-custom-dark-gray">
            <td className="px-4 py-2 border border-gray-700 font-semibold">
              Case ID
            </td>
            <td className="px-4 py-2 border border-gray-700">
              {caseDetails.id}
            </td>
          </tr>
          <tr className="hover:bg-custom-dark-gray">
            <td className="px-4 py-2 border border-gray-700 font-semibold">
              Civilian ID
            </td>
            <td className="px-4 py-2 border border-gray-700">
              {caseDetails.CivilianID}
            </td>
          </tr>
          <tr className="hover:bg-custom-dark-gray">
            <td className="px-4 py-2 border border-gray-700 font-semibold">
              Civilian Name
            </td>
            <td className="px-4 py-2 border border-gray-700">
              {caseDetails.CivilianDetails.associatedData.Name}
            </td>
          </tr>
          <tr className="hover:bg-custom-dark-gray">
            <td className="px-4 py-2 border border-gray-700 font-semibold">
              Phone #
            </td>
            <td className="px-4 py-2 border border-gray-700">
              {caseDetails.CivilianDetails.user.Username}
            </td>
          </tr>
          <tr className="hover:bg-custom-dark-gray">
            <td className="px-4 py-2 border border-gray-700 font-semibold">
              Emergency Type
            </td>
            <td className="px-4 py-2 border border-gray-700">
              {caseDetails.EmergencyType}
            </td>
          </tr>
          <tr className="hover:bg-custom-dark-gray">
            <td className="px-4 py-2 border border-gray-700 font-semibold">
              Request Time
            </td>
            <td className="px-4 py-2 border border-gray-700">
              {caseDetails.RequestTime}
            </td>
          </tr>
          <tr className="hover:bg-custom-dark-gray">
            <td className="px-4 py-2 border border-gray-700 font-semibold">
              Finish Time
            </td>
            <td className="px-4 py-2 border border-gray-700">
              {caseDetails.FinishTime?.toLocaleString()}
            </td>
          </tr>
          <tr className="hover:bg-custom-dark-gray">
            <td className="px-4 py-2 border border-gray-700 font-semibold">
              Status
            </td>
            <td className="px-4 py-2 border border-gray-700">
              {caseDetails.Status}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetailsTable;
