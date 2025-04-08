import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const CustomAutocomplete = ({
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  required = false,
  fullWidth = true,
}) => {
  return (
    <Autocomplete
      fullWidth={fullWidth}
      options={options}
      getOptionLabel={(option) => option.label}
      value={options.find((option) => option.value === value) || null}
      onChange={(event, newValue) => {
        onChange({
          target: { name, value: newValue ? newValue.value : "" },
        });
      }}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          required={required}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default CustomAutocomplete;
