import React from "react";
import Navbar from "../Routing/Navbar";

const Layout = ({ children }) => (
  <div className="flex">
    <Navbar />
    <div className="w-full">{children}</div>
  </div>
);

export default Layout;
