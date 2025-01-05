import React from "react";
import Delete from "../AddEditDelete/DeleteUser";
import Edit from "../AddEditDelete/EditUser";

const UserRow = ({ user }) => {
  // Determine the color based on availability
  const getAvailabilityClass = (availability) => {
    switch (availability.toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-700"; // Light green background with dark green text
      case "unavailable":
        return "bg-red-100 text-red-700"; // Light red background with dark red text
      case "occupied":
        return "bg-yellow-100 text-yellow-700"; // Light yellow background with dark yellow text
      default:
        return "bg-gray-100 text-gray-700"; // Default grey for unknown statuses
    }
  };

  return (
    <tr className="hover:bg-gray-100">
      <td className="border-t px-4 py-2">{user.Username}</td>
      <td className="border-t px-4 py-2">{user.ESPType}</td>
      <td
        className={`border-t px-4 py-2 ${getAvailabilityClass(
          user.Availability
        )}`}
      >
        {user.Availability}
      </td>
      <td className="border-t px-4 py-2">{user.id}</td>
      <td className="border-t px-4 py-2 flex-row">
        <Delete DeleteId={user.id} />
        <Edit editId={user.id} />
      </td>
    </tr>
  );
};

export default UserRow;
