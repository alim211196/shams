import React from "react";
import { Typography } from "@mui/material";
import { MRT_ActionMenuItem } from "material-react-table";

const ActionMenuItem = ({
  icon: Icon,
  label,
  onClick,
  closeMenu,
  color,
  disabled = false,
  table,
}) => {
  return (
    <MRT_ActionMenuItem
      disabled={disabled}
      table={table}
      icon={<Icon fontSize="small" sx={color ? { color: color } : {}} />}
      label={
        <Typography
          variant="body2"
          fontWeight={500}
          sx={{ fontSize: "0.8rem" }}
        >
          {label}
        </Typography>
      }
      onClick={() => {
        onClick();
        closeMenu();
      }}
      // sx={{
      //   display: "flex",
      //   alignItems: "center",
      //   gap: 0.5, // Reduced spacing between icon & text
      //   px: 1, // Reduced horizontal padding
      //   py: 0.5, // Smaller height
      //   borderRadius: "6px",
      //   transition: "background 0.2s ease-in-out",
      //   "&:hover": {
      //     backgroundColor: "#f5f5f5",
      //   },
      //   ...(color ? { color: color } : {}),
      // }}
    ></MRT_ActionMenuItem>
  );
};

export default ActionMenuItem;
