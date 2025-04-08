import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = ({
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  multiline = false,
  minRows = 1,
  lang,
  type = "text",
}) => {
  const handleInputChange = (e) => {
    if (type === "number") {
      // Allow only numeric values (no negative or special characters)
      if (/^\d*$/.test(e.target.value)) {
        onChange(e);
      }
    } else {
      onChange(e); // Default behavior for other input types
    }
  };
  return (
    <TextField
      fullWidth
      type={type}
      inputProps={type === "number" ? { min: 0 } : {}}
      multiline={multiline}
      minRows={multiline ? minRows : undefined}
      name={name}
      value={value}
      onChange={handleInputChange}
      required={required}
      placeholder={placeholder}
      dir={lang?.rtl === "1" ? "rtl" : "ltr"}
      sx={{
        "& .MuiInputBase-input": {
          textAlign: lang?.rtl === "1" ? "right" : "left",
        },
      }}
    />
  );
};

export default CustomTextField;
