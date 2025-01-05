import React from "react";

const Overlay = ({ isVisible, onClick }) => (
  <div
    onClick={onClick}
    className={`fixed inset-0 bg-black backdrop-blur-sm z-[200000] transition-opacity duration-300 ${
      isVisible ? "opacity-80" : "opacity-0 pointer-events-none"
    }`}
  ></div>
);

export default Overlay;
