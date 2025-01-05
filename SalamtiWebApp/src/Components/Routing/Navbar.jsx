// components/Navbar.js
import React, { useState, useRef, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../Common/LogoutButton";
const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref to track the dropdown container

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // Only log if the dropdown is actually open to reduce console noise
      if (dropdownOpen) {
        // Check if the dropdown is open and the click is outside the dropdown
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setDropdownOpen(false);
        }
      }
    };

    // Add event listener only when the dropdown is open
    if (dropdownOpen) {
      document.addEventListener("mousedown", checkIfClickedOutside);
    }

    return () => {
      // Always remove the event listener when the component re-renders or unmounts
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="bg-custom-black text-custom-white  p-4 flex-col h-auto min-h-svh w-[20%] flex justify-between rounded-tr-3xl rounded-br-3xl">
      <div className="flex-auto">
        <div className="flex items-center justify-between p-4">
          <div className="dropdown inline-block relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="font-semibold py-2 px-4 rounded inline-flex items-center text-custom-white  w-full"
            >
              <span className="mr-1 text-3xl">Admin</span>
              <svg
                className="fill-current h-8 w-8 mt-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>
            <div
              className={`absolute left-0 mt-1 w-[160%] rounded-lg bg-red-500 text-center hover:bg-red-700  shadow-lg py-1 z-10 transition-all duration-300 ease-in-out transform ${
                dropdownOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-shrink"></div>
      <div className="flex-auto text-xl">
        <NavLink
          to="/Dashboard"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-custom-gray text-custom-white "
                : " text-custom-white"
            } block py-3 my-1 px-4 rounded-xl transition duration-300 dark:hover:bg-custom-dark-gray hover:bg-custom-dark-gray hover:text-custom-white`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/LiveMap"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-custom-gray text-custom-white "
                : " text-custom-white"
            } block py-3 my-1 px-4 rounded-xl transition duration-300 hover:bg-custom-dark-gray  hover:text-custom-white`
          }
        >
          Live Map
        </NavLink>
        <NavLink
          to="/Cases"
          className={({ isActive }) =>
            `${
              isActive
                ? "dark:bg-custom-gray dark:text-custom-white bg-custom-black text-custom-white"
                : " dark:text-custom-white"
            } block py-3 my-1 px-4 rounded-xl transition duration-300 dark:hover:bg-custom-dark-gray hover:bg-custom-dark-gray hover:text-custom-white`
          }
        >
          Cases
        </NavLink>
        <NavLink
          to="/AccountManagement"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-custom-gray text-custom-white "
                : " text-custom-white"
            } block py-3 my-1 px-4 rounded-xl transition duration-300 hover:bg-custom-dark-gray  hover:text-custom-white`
          }
        >
          Account Management
        </NavLink>
      </div>
      <div className="flex-shrink"></div>
    </div>
  );
};

export default Navbar;
