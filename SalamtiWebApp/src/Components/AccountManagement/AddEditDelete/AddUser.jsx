import React from "react";
import Drawer from "../../Common/Drawer";
import AddUserForm from "../Forms/AddUserForm";

const AddUser = () => {
  return (
    <Drawer
      userFormType={<AddUserForm />}
      button={"+"}
      buttonClassName={
        "bg-custom-black w-[8vh] h-[8vh] text-xl rounded-full font-bold text-custom-white "
      }
      classNameSize={"w-[500px]"}
    />
  );
};
export default AddUser;
