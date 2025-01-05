import React from "react";
import UserRow from "./UserRow";

const UserTable = ({ users }) => {
  return (
    <table className="w-full border-collapse border-b-2">
      <thead className="flex-col w-full sticky top-0 z-10 text-xl">
        <tr>
          <th className="bg-custom-gray-light px-4 py-2 w-[20%] rounded-tl-xl">
            Licence Plate #
          </th>
          <th className="bg-custom-gray-light px-4 py-2 w-[20%]">ESP Type</th>
          <th className="bg-custom-gray-light px-4 py-2 w-[20%]">Status</th>
          <th className="bg-custom-gray-light px-4 py-2  w-[20%]">User ID</th>
          <th className="bg-custom-gray-light px-4 py-2 w-[20%] rounded-tr-xl">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="text-center">
        {users.length > 0 ? (
          users.map((user) => <UserRow key={user.id} user={user} />)
        ) : (
          <tr>
            <td colSpan="5" className="border-t px-4 py-2 text-center">
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
