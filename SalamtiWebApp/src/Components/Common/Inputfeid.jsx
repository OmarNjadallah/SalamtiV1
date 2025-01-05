import React from "react";

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  className,
  property,
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={className}
    property={property}
  />
);

export default InputField;
