import { AppBar, Box, Tab, Tabs, Typography, useTheme } from "@mui/material";
import React, { useMemo, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import { useSelector } from "react-redux";

const LanguageTabs = ({ handleChange, activeLang, children }) => {
  const theme = useTheme();
  const { languages } = useSelector((state) => state.languages) || [];
  const swipeContainerRef = useRef(null);

  // Find the index of the active language; default to 0 if not found
  const index = useMemo(() => {
    const langIndex = languages.findIndex((lang) => lang.code === activeLang);
    return langIndex !== -1 ? langIndex : 0;
  }, [activeLang, languages]);

  // Configure swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (theme.direction === "rtl") {
        handleChange(null, Math.max(0, index - 1));
      } else {
        handleChange(null, Math.min(languages.length - 1, index + 1));
      }
    },
    onSwipedRight: () => {
      if (theme.direction === "rtl") {
        handleChange(null, Math.min(languages.length - 1, index + 1));
      } else {
        handleChange(null, Math.max(0, index - 1));
      }
    },
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: false,
  });

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      {/* Tabs */}
      <AppBar position="static" elevation={0}>
        <Tabs
          value={index}
          onChange={(event, newIndex) => handleChange(event, newIndex)}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {Array.isArray(languages) &&
            languages.map((lang, idx) => (
              <Tab
                key={lang._id}
                value={idx}
                label={
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                  >
                    <img
                      src={lang.flag}
                      alt={lang.name}
                      width={24}
                      height={16}
                    />
                    <Typography
                      sx={{ color: "black", textTransform: "capitalize" }}
                    >
                      {lang.name}
                    </Typography>
                  </Box>
                }
              />
            ))}
        </Tabs>
      </AppBar>

      {/* Swipeable Content */}
      <Box
        ref={swipeContainerRef}
        {...swipeHandlers}
        sx={{
          overflow: "hidden",
          position: "relative",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: `${languages.length * 100}%`,
            transform: `translateX(-${index * (100 / languages.length)}%)`,
            transition: "transform 0.3s ease",
          }}
        >
          {React.Children.map(children, (child, i) => (
            <Box sx={{ width: `${100 / languages.length}%` }} key={i}>
              {child}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default LanguageTabs;
