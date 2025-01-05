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
    <div className="bg-black text-white shadow-lg rounded-lg max-w-6xl w-full p-8 mx-auto -mt-10 flex flex-col space-y-8">
      <h1 className="text-3xl font-bold">Case Details</h1>

      <div className="flex-row flex gap-3">
        {/* Case Information */}
        <DetailsTable caseDetails={caseDetails} />
        {/* Location Map */}
        <DetailsMap caseDetails={caseDetails} />
        <DetailsEmergencyDetails caseDetails={caseDetails} />
      </div>

      {/* Emergency Details */}

      <div className="flex-row flex gap-3 justify-between">
        {/* ESP Arrival Times Table */}
        <DetailsArrivalTimes caseDetails={caseDetails} />

        {/* ESP Finish Times Table */}
        <DetailsFinishTimes caseDetails={caseDetails} />
      </div>
    </div>
  );
};

export default ViewCasePage;
