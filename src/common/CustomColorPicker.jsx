import React, { useState } from "react";
import { Box, Button, Popover, Typography } from "@mui/material";
import { SketchPicker } from "react-color";

const CustomColorPicker = ({ name, value, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorChange = (color) => {
    onChange({ target: { name, value: color.hex } });
  };

  const open = Boolean(anchorEl);
  const id = open ? "color-picker-popover" : undefined;

  return (
    <Box>
      {/* Clickable Color Button */}
      <Button
        variant="text"
        onClick={handleClick}
        fullWidth
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          backgroundColor: value,
          //   color: "#fff",
          border: "1px dashed #ddd",
          "&:hover": { backgroundColor: value },
          borderRadius: "8px",
          padding: "8px 16px",
        }}
      >
        <Box />
        <Typography variant="body2" sx={{ color: value ? "white" : "#BDBDBD" }}>
          Pick Color
        </Typography>
      </Button>

      {/* Popover with Color Picker */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <SketchPicker color={value} onChange={handleColorChange} />
      </Popover>
    </Box>
  );
};

export default CustomColorPicker;
