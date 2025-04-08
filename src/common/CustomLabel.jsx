import React from "react";
import Typography from "@mui/material/Typography";

const CustomLabel = ({ label, isRequired = false, children }) => {
  return (
    <Typography
      component="label"
      variant="caption"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        width: "fit-content",
      }}
    >
      {label}
      {isRequired && <span style={{ color: "red" }}>*</span>}
      {children && <span>{children}</span>}
    </Typography>
  );
};

export default CustomLabel;
