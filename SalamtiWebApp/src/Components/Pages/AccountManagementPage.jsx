import React, { useState } from "react";
import Title from "../Common/Title";
import SearchBar from "../Common/SearchBar";

import AddUser from "../AccountManagement/AddEditDelete/AddUser";
import DisplayUsers from "../AccountManagement/DisplayUsers/DisplayUsers";
const AccountManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col w-full">
      <Title text={"Account Management"} />
      <div className="rounded-2xl w-[97%] mt-6 flex justify-between items-center">
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={"Search by ESP ID, License plate, Type, or status"}
        />
        <AddUser />
      </div>

      <DisplayUsers searchQuery={searchQuery} />
    </div>
  );
};
export default AccountManagement;
