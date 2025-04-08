import React, { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  CssBaseline,
  Toolbar,
  IconButton,
  useMediaQuery,
  Drawer as MuiDrawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useDispatch } from "react-redux";
import { AppBar, Drawer, DrawerHeader } from "./helper";
import Sidebar from "./Sidebar";
import AccountPopover from "./AccountPopover";
import { fetchLanguages } from "../redux/slices/languageSlice";
import LanguagePopover from "./LanguagePopover";
import NotificationPopover from "./NotificationPopover";
import { fetchUserDetails } from "../redux/slices/userSlice";
import { decodeToken } from "../utils/jwtHelper";

export default function MiniDrawer({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = decodeToken(token);
      if (decoded?.userId) {
        dispatch(fetchUserDetails(decoded?.userId));
        dispatch(fetchLanguages());
      }
    }
  }, [dispatch]);
  return (
    <Box sx={{ display: "flex", background: "white" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        isMobile={isMobile}
        sx={{ boxShadow: "0 0 15px 0 rgba(0, 0, 0, 0.05)" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => {
              open ? handleDrawerClose() : handleDrawerOpen();
            }}
            edge="start"
            sx={{
              marginRight: isMobile ? 0 : 5,
              // ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box component="div" sx={{ flexGrow: 1 }}>
            {!open && (
              <img
                src="/logo-login.png"
                alt="Company Logo"
                style={{ height: "auto", width: "80px" }}
              />
            )}
          </Box>
          <Box sx={{ gap: 1 }} display={"flex"} alignItems={"center"}>
            <LanguagePopover />

            <NotificationPopover />
            <AccountPopover />
          </Box>
        </Toolbar>
      </AppBar>
      {isMobile ? (
        <MuiDrawer
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
          variant="temporary"
          ModalProps={{ keepMounted: true }}
          sx={(theme) => ({
            zIndex: theme.zIndex.drawer + 2, // Ensures it appears above AppBar
            "& .MuiDrawer-paper": {
              width: 240, // Adjust width as needed
              backgroundColor: theme.palette.primary.main, // Set background color
              color: theme.palette.primary.contrastText, // Ensures text is readable
            },
          })}
        >
          <DrawerHeader>
            {open && (
              <img
                src="/logo-login.png"
                alt="Company Logo"
                style={{ height: "auto", width: "80px" }}
              />
            )}
          </DrawerHeader>
          <Sidebar open={open} />
        </MuiDrawer>
      ) : (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            {open && (
              <img
                src="/logo-login.png"
                alt="Company Logo"
                style={{ height: "auto", width: "80px" }}
              />
            )}
          </DrawerHeader>

          <Sidebar open={open} />
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: isMobile ? 0 : 3,
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
