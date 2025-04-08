import React from "react";
import { TextField, InputAdornment, Typography } from "@mui/material";

const SlugTextField = ({
  value,
  onChange,
  placeholder = "Enter slug",
  baseURL = "http://localhost:3000/",
  name = "slug",
  required = true,
}) => {
  return (
    <TextField
      fullWidth
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            sx={{
              p: 1,
              margin: "0px!important",
              background: "#f0f0f0",
              borderTopLeftRadius: "0.375rem",
              borderBottomLeftRadius: "0.375rem",
            }}
          >
            <Typography
              sx={{
                fontSize: "0.875rem",
                color: "#74788d",
              }}
            >
              {baseURL}
            </Typography>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SlugTextField;
