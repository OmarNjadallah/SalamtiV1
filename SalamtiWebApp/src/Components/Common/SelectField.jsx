import React from "react";

const SelectField = ({ label, name, value, options, onChange }) => (
  <div className="mb-4">
    <label className="block font-bold mb-2 text-white text-xl ">{label}:</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 rounded border text-black border-gray-300"
    >
      <option value="" disabled>
        Select {label}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
