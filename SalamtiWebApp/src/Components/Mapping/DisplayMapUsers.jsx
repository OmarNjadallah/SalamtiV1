import React, { useState, useEffect } from "react";
import UserTable from "./MapUserTable";
import { useUsers } from "../Functions/fetchusersformap";
import ESPMap from "./MapComponent";

const DisplayUsers = ({ searchQuery }) => {
  const { users, fetchUsersForMap } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Track the selected user

  // Filter users based on search query
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.id?.toLowerCase().includes(lowercasedQuery) ||
        user.Username?.toLowerCase().includes(lowercasedQuery) ||
        user.ESPType?.toLowerCase().includes(lowercasedQuery) ||
        user.Availability?.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  useEffect(() => {
    fetchUsersForMap();
  }, [fetchUsersForMap]);

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <div className="rounded-2xl overflow-hidden w-[97%] ml-auto mr-auto mt-8 border-4 border-black">
        <ESPMap selectedUser={selectedUser} />
      </div>
      <div className="rounded-2xl w-[97%] mr-auto mt-6 ml-5 border-4 border-black h-[20vh] overflow-auto no-scrollbar">
        <UserTable users={filteredUsers} onRowClick={handleRowClick} />
      </div>
    </div>
  );
};

export default DisplayUsers;
