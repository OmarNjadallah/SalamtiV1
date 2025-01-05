import React, { useState } from "react";
import Title from "../Common/Title";
import SearchBar from "../Common/SearchBar";

import DisplayCases from "../CaseManagement/DisplayCases/DisplayCases";

const Cases = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="flex flex-col ">
      <Title text={"Cases"} />
      <div className="rounded-2xl w-[97%] mt-6 flex justify-between items-center">
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={"Search by Case ID, Date, Type, or status"}
        />
      </div>
      <DisplayCases searchQuery={searchQuery} />
    </div>
  );
};
export default Cases;
