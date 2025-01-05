import React, { useState, useRef, useEffect, useCallback } from "react";

import { NavLink } from "react-router-dom";
import LogoutButton from "../Common/LogoutButton";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = useCallback(() => {
    setDropdownOpen((prev) => !prev);
  }, []);

  const toggleNavbar = () => {
    setNavbarOpen((prev) => !prev);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [dropdownOpen]);

  return (
    <>
      {!dropdownOpen && (
        <button
          className="fixed top-4 left-4 z-[1050] text-custom-white bg-custom-black p-2 rounded-lg shadow-lg"
          onClick={toggleNavbar}
        >
          {navbarOpen ? (
            <svg
              className="h-8 w-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-8 w-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      )}

      {/* Navbar */}
      <div
        className={`bg-custom-black text-custom-white p-4 flex-col h-auto min-h-screen w-[80%] sm:w-[60%] lg:w-[20%] flex justify-between rounded-tr-3xl rounded-br-3xl fixed top-0 left-0 border border-custom-border shadow-lg z-[1100] transform transition-transform duration-300 ${
          navbarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex-auto">
          <div className="flex items-center justify-between px-4">
            <div className="dropdown inline-block relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="font-semibold py-10 rounded inline-flex items-center text-custom-white w-full"
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
                className={`absolute left-0 mt-1 w-[160%] rounded-lg bg-red-500 text-center hover:bg-red-700 shadow-lg py-1 z-[1200] transition-all duration-300 ease-in-out transform ${
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

        <div className="flex-auto text-xl">
          <NavLink
            to="/Dashboard"
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-custom-gray text-custom-white "
                  : " text-custom-white"
              } block py-3 my-1 px-4 rounded-xl transition duration-300 hover:bg-custom-dark-gray hover:text-custom-white`
            }
            onClick={toggleNavbar}
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
              } block py-3 my-1 px-4 rounded-xl transition duration-300 hover:bg-custom-dark-gray hover:text-custom-white`
            }
            onClick={toggleNavbar}
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
              } block py-3 my-1 px-4 rounded-xl transition duration-300 hover:bg-custom-dark-gray hover:text-custom-white`
            }
            onClick={toggleNavbar}
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
              } block py-3 my-1 px-4 rounded-xl transition duration-300 hover:bg-custom-dark-gray hover:text-custom-white`
            }
            onClick={toggleNavbar}
          >
            Account Management
          </NavLink>
        </div>
      </div>

      {/* Overlay */}
      {navbarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[1050]"
          onClick={toggleNavbar}
        ></div>
      )}
    </>
  );
};

export default Navbar;
