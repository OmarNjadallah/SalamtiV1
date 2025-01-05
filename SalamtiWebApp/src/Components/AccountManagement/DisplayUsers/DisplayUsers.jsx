import React, { useState, useEffect } from "react";
import UserTable from "./UserTable";
import { useUsers } from "../../Functions/UseUsersHook";

const DisplayUsers = ({ searchQuery }) => {
  const { users, fetchUsersWithESPType } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Filter users based on search query
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();

    const filtered = users.filter((user) => {
      // Match Availability with controlled partial matching
      const availabilityMatch = user.Availability
        ? ["available", "unavailable", "occupied"].some(
            (status) =>
              status.startsWith(lowercasedQuery) &&
              user.Availability.toLowerCase() === status
          )
        : false;

      return (
        user.id?.toLowerCase().includes(lowercasedQuery) ||
        user.Username?.toLowerCase().includes(lowercasedQuery) ||
        user.ESPType?.toLowerCase().includes(lowercasedQuery) ||
        availabilityMatch
      );
    });

    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  useEffect(() => {
    fetchUsersWithESPType();
  }, [fetchUsersWithESPType]);

  return (
    <div className="rounded-2xl w-[97%] mr-auto mt-6 ml-5 border-4 border-black h-[70vh] overflow-auto no-scrollbar">
      <UserTable users={filteredUsers} />
    </div>
  );
};

export default DisplayUsers;
