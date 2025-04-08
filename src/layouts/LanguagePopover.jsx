import React, { useState } from "react";
import { Box, Menu, MenuItem, Typography, IconButton } from "@mui/material";
import { useSelector } from "react-redux";

const LanguagePopover = () => {
  const { languages } = useSelector((state) => state.languages); // Fetch languages from redux
  const [anchorElLang, setAnchorElLang] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[1] || {}); // Default to English (languages[1])

  const open = Boolean(anchorElLang);

  const handleOpenLangMenu = (event) => setAnchorElLang(event.currentTarget);
  const handleCloseLangMenu = () => setAnchorElLang(null);

  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language); // Update selected language
    handleCloseLangMenu(); // Close the menu after selecting
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpenLangMenu}>
        <img
          src={selectedLanguage.flag || "/united-states.png"} // Use the flag from the data
          alt={selectedLanguage.name}
          width={24} // Adjust image width
          height={20} // Adjust image height
        />
      </IconButton>
      <Menu
        anchorEl={anchorElLang}
        open={open}
        onClose={handleCloseLangMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Box sx={{ minWidth: 180 }}>
          {languages.map((language) => (
            <MenuItem
              key={language._id}
              onClick={() => handleSelectLanguage(language)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2, // Added spacing between flag and text
                borderRadius: 1,
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <img
                src={language.flag}
                alt={language.name}
                width={24}
                height={20}
              />
              <Typography variant="body2">{language.name}</Typography>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </>
  );
};

export default LanguagePopover;
