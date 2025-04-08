import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

const CustomSelect = ({
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  required = false,
  fullWidth = true,
  disableCondition = () => false,
}) => {
  return (
    <FormControl fullWidth={fullWidth} required={required}>
      <Select
        name={name}
        value={value !== null ? value : ""}
        onChange={onChange}
        displayEmpty
        sx={{ color: value !== null ? "inherit" : "#c1c1c1" }}
      >
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={disableCondition(option)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
