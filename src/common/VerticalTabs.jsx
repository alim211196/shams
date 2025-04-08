import { Box, Tabs, Tab, useTheme } from "@mui/material";
import { tabsClasses } from "@mui/material/Tabs";

export default function VerticalTabs({ handleChange, value, tabs = [],isCourseSection=false }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: isCourseSection?190:320,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value} // Now value is a string (tab name)
        onChange={(_, newValue) => handleChange(newValue)}
        aria-label="Vertical tabs example"
        sx={{
          width: "100%", // Full width
          [`& .${tabsClasses.scrollButtons}`]: {
            "&.Mui-disabled": { opacity: 0.3 },
          },
          "& .MuiTabs-indicator": {
            backgroundColor: theme.palette.secondary.main, // Blue indicator
          },
          "& .MuiTab-root": {
            fontSize: "12px",
            textTransform: "capitalize",
            color: "gray", // Unselected text color
            backgroundColor: "white", // Unselected bg color
            transition: "all 0.3s ease",
            width: "100%", // Full width of section
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
