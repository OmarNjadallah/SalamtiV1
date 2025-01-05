import React from "react";
import Title from "../Common/Title";
import App from "../Dashboard/Dashboard";
const DashBoard = () => {
  return (
    <div className="w-full h-screen">
      <Title text={"Dashboard"} />
      <App />
    </div>
  );
};

export default DashBoard;
