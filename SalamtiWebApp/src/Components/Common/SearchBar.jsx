import React from "react";

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <input
      autoFocus
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-[50%] h-[8vh] border-4 border-black rounded-2xl p-5 bg-transparent ml-5 text-l  mt-2 flex justify-between items-center"
    />
  );
};

export default SearchBar;
