import React, { useState } from "react";
import { addUser } from "../../Functions/HandleAddUser";
import { useSnackbar } from "notistack";

const AddUserForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    licensePlate: "",
    password: "",
    confirmPassword: "",
    type: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time password matching validation
    if (name === "password" || name === "confirmPassword") {
      setPasswordMatch(
        name === "password"
          ? value === formData.confirmPassword
          : formData.password === value
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordMatch) {
      enqueueSnackbar("Passwords do not match.", { variant: "error" });
      return;
    }

    if (!formData.licensePlate || !formData.password || !formData.type) {
      enqueueSnackbar("All fields are required.", { variant: "warning" });
      return;
    }

    try {
      setIsSubmitting(true);
      await addUser({
        licensePlate: formData.licensePlate,
        password: formData.password,
        type: formData.type,
      });
      enqueueSnackbar("User added successfully!", { variant: "success" });

      // Reset form
      setFormData({
        licensePlate: "",
        password: "",
        confirmPassword: "",
        type: "",
      });
    } catch (error) {
      enqueueSnackbar(`Error: ${error.message}`, { variant: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col bg-custom-black p-6 rounded-lg shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">
        Add Emergency Service Provider
      </h2>

      {/* License Plate Field */}
      <label className="text-white mb-2">License Plate:</label>
      <input
        type="text"
        name="licensePlate"
        value={formData.licensePlate}
        onChange={handleChange}
        className="p-2 rounded mb-4 border border-gray-300"
        placeholder="Enter license plate"
        required
      />

      {/* Password Field */}
      <label className="text-white mb-2">Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="p-2 rounded mb-4 border border-gray-300"
        placeholder="Enter password"
        required
      />

      {/* Confirm Password Field */}
      <label className="text-white mb-2">Confirm Password:</label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        className={`p-2 rounded mb-4 border ${
          passwordMatch ? "border-gray-300" : "border-red-500"
        }`}
        placeholder="Re-enter password"
        required
      />
      {!passwordMatch && (
        <p className="text-red-500 text-sm mb-4">Passwords do not match.</p>
      )}

      {/* Select Field */}
      <label className="text-white mb-2">ESP Type:</label>
      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="p-2 rounded mb-4 border border-gray-300"
        required
      >
        <option value="" disabled>
          Select ESP Type
        </option>
        <option value="police">Police Car</option>
        <option value="ambulance">Ambulance</option>
        <option value="firetruck">Fire truck</option>
        <option value="hazmatUnit">Hazmat Unit</option>
        <option value="tacticalUnit">Tactical Unit</option>
        <option value="engineeringUnit">Engineering Unit</option>
        <option value="transportUnit">Transport Unit</option>
      </select>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "Add User"}
      </button>
    </form>
  );
};

export default AddUserForm;
