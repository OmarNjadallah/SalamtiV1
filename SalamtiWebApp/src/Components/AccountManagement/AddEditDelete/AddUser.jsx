import React, { useState } from "react";
import Drawer from "../../Common/Drawer";
import AddUserForm from "../Forms/AddUserForm";

const AddUser = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <Drawer
      isDrawerOpen={isDrawerOpen}
      setIsDrawerOpen={setIsDrawerOpen}
      userFormType={<AddUserForm setIsDrawerOpen={setIsDrawerOpen} />}
      button={"+"}
      buttonClassName={
        "bg-custom-black w-[8vh] h-[8vh] text-xl rounded-full font-bold text-custom-white "
      }
      classNameSize={"w-[500px] max-w-[90%]"}
    />
  );
};
export default AddUser;
