import React from "react";
import {
  Typography,
  FormControlLabel,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CustomSwitch } from "../layouts/helper";

const groupPermissionsBySection = (permissions) => {
  return permissions.reduce((acc, permission) => {
    if (!acc[permission.section]) {
      acc[permission.section] = [];
    }
    acc[permission.section].push(permission);
    return acc;
  }, {});
};

const PermissionBox = ({ permissions, handleToggle, selectedPermissions }) => {
  const groupedPermissions = groupPermissionsBySection(permissions);

  return Object.keys(groupedPermissions).map((section) => (
    <Accordion
      key={section}
      elevation={0}
      sx={{ my: 2, border: "1px solid #dee2e6", borderRadius: "5px" }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          background: "#dee2e6",
          minHeight: "40px!important",
          "& .MuiAccordionSummary-content": {
            margin: "0px!important",
          },
          border: "none",
          "& .MuiAccordionSummary-root.Mui-expanded": {
            minHeight: "40px!important",
          },
        }}
      >
        <Typography>{section}</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          {groupedPermissions[section].map((permission) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={permission._id}>
              <Box
                sx={{
                  padding: 1,
                  fontSize: "12px",
                  border: "1px solid #dee2e6",
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  cursor: "pointer",
                  background: permission.status === false && "#dee2e6",
                  ":hover": {
                    background: permission.status === true && "#f9f9f9",
                  },
                }}
              >
                <Typography
                  sx={{
                    width: "100%",
                    textAlign: "left",
                    fontSize: "13px",
                    textTransform: "capitalize",
                  }}
                >
                  {permission.name.replace(/_/g, " ")}
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <FormControlLabel
                    control={
                      <CustomSwitch
                        sx={{ m: 1 }}
                        id={`switch-${permission._id}`}
                        checked={selectedPermissions.includes(permission._id)}
                        onChange={() => {
                          permission.status === true &&
                            handleToggle(permission._id);
                        }}
                      />
                    }
                    label=""
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  ));
};

export default PermissionBox;
