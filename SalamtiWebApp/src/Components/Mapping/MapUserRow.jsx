import React from "react";

const UserRow = ({ user, onClick }) => {
  return (
    <tr
      className="hover:bg-gray-100 cursor-pointer"
      onClick={() => onClick(user)}
    >
      <td className="border-t px-4 py-2">{user.id}</td>
      <td className="border-t px-4 py-2">{user.Username}</td>
      <td className="border-t px-4 py-2">{user.ESPType}</td>
      <td className="border-t px-4 py-2">{user.Availability}</td>
    </tr>
  );
};

export default UserRow;
