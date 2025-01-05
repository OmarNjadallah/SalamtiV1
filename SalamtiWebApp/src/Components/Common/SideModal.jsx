import React from "react";
import Button from "./Button";

const SideModal = ({ onClick, isVisible, children, classNameSize }) => {
  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full bg-custom-black shadow-lg z-[200001] transform ] ${
          isVisible ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out ${classNameSize} rounded-l-3xl`}
      >
        <div className="flex flex-col h-full ">
          <div className="flex flex-row-reverse justify-between p-4">
            <Button
              className=" w-[4vh] h-[4vh]  text-3xl rounded-full font-bold text-white z-50"
              onClick={onClick}
            >
              x
            </Button>
          </div>

          <div className="mb-auto">{children}</div>
        </div>
      </div>
    </>
  );
};
export default SideModal;
