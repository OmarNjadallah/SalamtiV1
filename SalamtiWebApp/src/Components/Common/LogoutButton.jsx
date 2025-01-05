import React from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../Functions/HandleLogout";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut(navigate);
  };

  return (
    <button onClick={handleLogout} className="w-full">
      Logout
    </button>
  );
};

export default LogoutButton;
