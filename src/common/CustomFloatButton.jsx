import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import React from "react";

const CustomFloatButton = ({ handleAdd }) => {
  return (
    <Fab
      size="small"
      color="primary"
      aria-label="add"
      onClick={handleAdd}
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 1100,
      }}
    >
      <Add />
    </Fab>
  );
};

export default CustomFloatButton;
