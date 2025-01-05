import React from "react";
import Title from "../Common/Title";

import DisplayUsers from "../Mapping/DisplayMapUsers";
const LiveMap = () => {
  return (
    <div className="flex flex-col w-full">
      <Title text={"Live Map"} />

      <div>
        <DisplayUsers searchQuery={""}></DisplayUsers>
      </div>
    </div>
  );
};
export default LiveMap;
