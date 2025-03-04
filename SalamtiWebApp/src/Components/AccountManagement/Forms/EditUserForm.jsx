import React, { useState, useEffect } from "react";
import { editUser } from "../../Functions/HandleEditUser";
import { useSnackbar } from "notistack";

const EditUserForm = ({ userData, userId, setIsDrawerOpen }) => {
  const [formData, setFormData] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const espTypeOptions = [
    "police",
    "firetruck",
    "ambulance",
    "hazmatUnit",
    "tacticalUnit",
    "engineeringUnit",
    "transportUnit",
  ];
  const availabilityOptions = ["available", "unavailable", "occupied"];

  // Initialize `formData` only when `userData` is first received
  useEffect(() => {
    if (userData && !formData) {
      setFormData({
        user: userData.user || {},
        esp: userData.esp || {},
      });
    }
  }, [userData, formData]);

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [name]: value,
      },
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    if (name === "newPassword") {
      setNewPassword(value.trim() ? value : ""); // Update newPassword
      setPasswordMatch(value === confirmPassword); // Check match with confirmPassword
    } else if (name === "confirmPassword") {
      setConfirmPassword(value.trim() ? value : ""); // Update confirmPassword
      setPasswordMatch(newPassword === value); // Check match with newPassword
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure passwords match before submission
    if (!passwordMatch) {
      enqueueSnackbar("Passwords do not match.", { variant: "error" });
      return;
    }

    const userUpdates = { ...formData.user };

    // Only include Password if newPassword and confirmPassword match and are non-empty
    if (newPassword && passwordMatch) {
      userUpdates.Password = newPassword; // Include password
    } else {
      delete userUpdates.Password; // Remove Password to avoid accidental updates
    }

    // Check if username has changed and validate it

    try {
      setIsLoading(true);
      await editUser({
        userId,
        userUpdates,
        espUpdates: formData.esp,
        currentUsername: userData.user.Username,

        enqueueSnackbar,
      });

      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Error saving data:", error);
      enqueueSnackbar("Error updating user.", { variant: "error" });
      setIsDrawerOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!formData) {
    return <p className="text-lg text-white">Loading user data...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-black text-white p-6 rounded-lg shadow-md w-full h-full justify-center"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Edit Emergency Service Provider
      </h2>

      {/* Username Field */}
      <label className="mb-2">License Plate:</label>
      <input
        type="text"
        name="Username"
        value={formData.user.Username || ""}
        onChange={(e) => handleInputChange(e, "user")}
        className="p-2 rounded mb-4 border border-gray-600 bg-white text-black"
        placeholder="Enter username"
        disabled={isLoading}
        required
      />

      {/* New Password Field */}
      <label className="mb-2">New Password:</label>
      <input
        type="password"
        name="newPassword"
        value={newPassword}
        onChange={handlePasswordChange}
        className="p-2 rounded mb-4 border border-gray-600 bg-white text-black"
        placeholder="Enter new password"
        disabled={isLoading}
      />

      {/* Confirm Password Field */}
      <label className="mb-2">Confirm New Password:</label>
      <input
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={handlePasswordChange}
        className={`p-2 rounded mb-4 border ${
          passwordMatch ? "border-gray-600" : "border-red-500"
        } bg-white text-black`}
        placeholder="Confirm new password"
        disabled={isLoading}
      />
      {!passwordMatch && (
        <p className="text-red-500 text-sm mb-4">Passwords do not match.</p>
      )}

      {/* ESP Type Field */}
      <label className="mb-2">ESP Type:</label>
      <select
        name="ESPType"
        value={formData.esp.ESPType || ""}
        onChange={(e) => handleInputChange(e, "esp")}
        className="p-2 rounded mb-4 border border-gray-600 bg-white text-black"
        disabled={isLoading}
      >
        <option value="" disabled>
          Select ESP Type
        </option>
        {espTypeOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Availability Field */}
      <label className="mb-2">Availability:</label>
      <select
        name="Availability"
        value={formData.esp.Availability || ""}
        onChange={(e) => handleInputChange(e, "esp")}
        className="p-2 rounded mb-4 border border-gray-600 bg-white text-black"
        disabled={isLoading}
      >
        <option value="" disabled>
          Select Availability
        </option>
        {availabilityOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Submit Button */}
      <button
        type="submit"
        className={`bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditUserForm;
