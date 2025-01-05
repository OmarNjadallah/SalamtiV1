import React, { useState, useRef } from "react";
import Drawer from "../../Common/Drawer";
import { fetchCaseById } from "../../Functions/UseCasesHook";
import ViewCasePage from "./DetailsPage";

const Details = ({ caseId }) => {
  const [caseDetails, setCaseDetails] = useState(null);
  const hasFetched = useRef(false); // Ensure the fetch runs only once

  const handleFetchDetails = async () => {
    if (hasFetched.current) return; // Prevent repeated fetches
    hasFetched.current = true;

    try {
      const data = await fetchCaseById({ caseId });
      setCaseDetails(data);
    } catch (error) {
      console.error("Error fetching case details:", error);
    }
  };

  return (
    <Drawer
      userFormType={<ViewCasePage caseDetails={caseDetails} />}
      button="Details"
      buttonClassName="ml-1 bg-custom-gray text-center text-custom-white hover:bg-custom-dark-gray px-2 py-1 rounded transition-all duration-300 ease-in-out transform font-semibold"
      onFetchData={handleFetchDetails}
      classNameSize={"w-[60vw]"}
    />
  );
};

export default Details;
