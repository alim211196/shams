import { Typography } from "@mui/material";
import React from "react";

const TableTypography = ({ value }) => {
  return (
    <Typography
      variant="caption"
      dangerouslySetInnerHTML={{
        __html: value?.length > 100 ? `${value.substring(0, 100)}...` : value,
      }}
    ></Typography>
  );
};

export default TableTypography;
