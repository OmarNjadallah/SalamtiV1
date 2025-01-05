import React from "react";
import DetailsArrivalTimes from "./DetailsPage/DetailsArrivalTimes";
import DetailsFinishTimes from "./DetailsPage/DetailsFinishTimes";
import DetailsEmergencyDetails from "./DetailsPage/DetailsEmergencyDetails";
import DetailsMap from "./DetailsPage/DetailsMap";
import DetailsTable from "./DetailsPage/DetailsTable";

const ViewCasePage = ({ caseDetails }) => {
  if (!caseDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <p className="text-lg">Loading case details...</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white shadow-lg rounded-lg max-w-full w-full p-4 lg:p-8 mx-auto space-y-8 h-screen overflow-scroll">
      <h1 className="text-3xl font-bold text-center lg:text-left">
        Case Details
      </h1>

      {/* First Section: Case Info, Map, and Emergency Details */}
      <div className="flex flex-col lg:flex-row lg:gap-6">
        {/* Case Information Table */}
        <div className="flex-1 bg-black p-4 rounded-md shadow-md">
          <DetailsTable caseDetails={caseDetails} />
        </div>

        {/* Location Map */}
        <div className="flex-1 bg-black p-4 rounded-md shadow-md mt-6 lg:mt-0">
          <DetailsMap caseDetails={caseDetails} />
        </div>

        {/* Emergency Details */}
        <div className="flex-1 bg-black p-4 rounded-md shadow-md mt-6 lg:mt-0">
          <DetailsEmergencyDetails caseDetails={caseDetails} />
        </div>
      </div>

      {/* Second Section: Arrival and Finish Times */}
      <div className="flex flex-col lg:flex-row lg:gap-6">
        {/* ESP Arrival Times Table */}
        <div className="flex-1 bg-black p-4 rounded-md shadow-md overflow-scroll">
          <DetailsArrivalTimes caseDetails={caseDetails} />
        </div>

        {/* ESP Finish Times Table */}
        <div className="flex-1 bg-black p-4 rounded-md shadow-md overflow-scroll">
          <DetailsFinishTimes caseDetails={caseDetails} />
        </div>
      </div>
    </div>
  );
};

export default ViewCasePage;
