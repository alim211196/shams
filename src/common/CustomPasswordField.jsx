import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CustomPasswordField = ({
  name,
  value,
  onChange,
  placeholder = "Enter password",
  required = false,
  fullWidth = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  return (
    <FormControl fullWidth={fullWidth} required={required} variant="outlined">
      <OutlinedInput
        id={name}
        type={showPassword ? "text" : "password"}
        name={name}
        value={value}
        placeholder="Enter Password"
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleTogglePassword} edge="end">
              {showPassword ? (
                <VisibilityOff sx={{ color: "#BDBDBD" }} />
              ) : (
                <Visibility sx={{ color: "#BDBDBD" }} />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default CustomPasswordField;
