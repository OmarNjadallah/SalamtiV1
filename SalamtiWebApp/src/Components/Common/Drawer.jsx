import React, { useState, useEffect } from "react";
import Button from "./Button";
import Overlay from "./Overlay";
import SideModal from "./SideModal";

const Drawer = ({
  userFormType,
  button,
  buttonClassName,
  onFetchData,
  classNameSize,
  isDrawerOpen = false,
  setIsDrawerOpen,
}) => {
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    if (isDrawerOpen && onFetchData) {
      // Trigger the fetch function when the drawer is opened
      onFetchData();
    }
  }, [isDrawerOpen, onFetchData]);

  return (
    <>
      {/* Button to Open Drawer */}
      <Button className={buttonClassName} onClick={toggleDrawer}>
        {button}
      </Button>

      {/* Overlay */}
      <Overlay onClick={toggleDrawer} isVisible={isDrawerOpen} />

      {/* Drawer */}
      <SideModal
        classNameSize={classNameSize}
        onClick={toggleDrawer}
        isVisible={isDrawerOpen}
        children={userFormType}
      />
    </>
  );
};

export default Drawer;
