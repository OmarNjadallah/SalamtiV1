import React from "react";

const Button = ({ children, onClick, type = "button", className }) => (
  <button type={type} onClick={onClick} className={className}>
    {children}
  </button>
);

export default Button;
