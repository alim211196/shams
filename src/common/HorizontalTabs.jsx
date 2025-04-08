import * as React from "react";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTheme } from "@mui/material";

export default function HorizontalTabs({ handleChange, value, tabs = [],isCouseSection=false }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: { xs: 360, sm: 480 },
        bgcolor: "background.paper",
      }}
    >
      <Tabs
        value={value} // Now value is a string (tab name)
        onChange={(_, newValue) => handleChange(newValue)}
        variant={isCouseSection?"":"scrollable"}
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 },
          },
          "& .MuiTabs-indicator": {
            backgroundColor: theme.palette.secondary.main, // Blue indicator
          },
          "& .MuiTab-root": {
            fontSize: "14px",
            textTransform: "capitalize",
            color: "gray", // Unselected text color
            backgroundColor: "white", // Unselected bg color
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: theme.palette.secondary.light, // Light blue hover effect
              color: theme.palette.secondary.main,
            },
          },
          "& .Mui-selected": {
            color: `${theme.palette.secondary.main} !important`, // Selected text color
            backgroundColor: `${theme.palette.secondary.light} !important`, // Selected background
            fontWeight: "bold",
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab} value={tab} />
        ))}
      </Tabs>
    </Box>
  );
}
