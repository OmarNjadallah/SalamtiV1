import React, { useState } from "react";
import Drawer from "../../Common/Drawer";
import EditUserForm from "../Forms/EditUserForm";
import { fetchEspData } from "../../Functions/HandleEditUser";

const Edit = ({ editId }) => {
  const [userData, setUserData] = useState(null);

  const handleFetchUserData = async () => {
    try {
      const data = await fetchEspData({ userId: editId });
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <Drawer
      userFormType={<EditUserForm userData={userData} userId={editId} />}
      button="Edit"
      buttonClassName="ml-1 bg-blue-500 text-center text-custom-white hover:bg-blue-700 px-2 py-1 rounded transition-all duration-300 ease-in-out transform font-semibold"
      onFetchData={handleFetchUserData} // Fetch data when the drawer opens
      classNameSize={"w-[500px]"}
    />
  );
};

export default Edit;
