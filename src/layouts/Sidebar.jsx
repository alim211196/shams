import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import { ChevronRight, ExpandLess, ExpandMore } from "@mui/icons-material";
import { menuItems } from "./menuItems";
import { useSelector } from "react-redux";

const filterMenuItems = (items, permissions) => {
  return items
    ?.filter(
      (item) =>
        !item?.requiredPermission ||
        permissions?.includes(item?.requiredPermission)
    )
    ?.map((item) => ({
      ...item,
      children: item.children
        ? filterMenuItems(item.children, permissions)
        : undefined,
    }));
};

const Sidebar = ({ open }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState({});
  const { userPermissions } = useSelector((state) => state.user);
  // Toggle expansion for items with children
  const handleToggle = (name) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };

  const filteredMenu = filterMenuItems(menuItems, userPermissions);

  return (
    <List sx={{ pt: open && 2.5 }}>
      {filteredMenu.map((item) => (
        <React.Fragment key={item.name}>
          <ListItem disablePadding sx={{ display: "block", py: 0.5 }}>
            <ListItemButton
              onClick={() =>
                item.children
                  ? handleToggle(item.name)
                  : handleNavigation(item.path)
              }
              sx={{
                justifyContent: "initial",
                borderRadius: open && "5px",
                padding: "7px 15px",
                color: "#9DA2B4",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  "& .MuiListItemIcon-root": {
                    color: "white",
                  },
                },
                ...(location.pathname === item.path && {
                  backgroundColor: "#1B2850",
                  color: "white",
                  "& .MuiListItemIcon-root": {
                    color: "white",
                  },
                }),
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 1 : 3.5,
                  justifyContent: "center",
                  color: "#9DA2B4",
                  "&:hover": { color: "white" },
                }}
              >
                <Box
                  sx={{
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {React.cloneElement(item.icon, {
                    sx: { fontSize: "20px", width: "20px", height: "20px" },
                  })}
                </Box>
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={{
                  sx: {
                    fontSize: "13px !important",
                    fontWeight: 500,
                    color: "inherit",
                  },
                }}
                sx={{ opacity: 1 }}
              />

              {item.children ? (
                expanded[item.name] ? (
                  <ExpandLess sx={{ width: "20px", height: "20px" }} />
                ) : (
                  <ExpandMore sx={{ width: "20px", height: "20px" }} />
                )
              ) : (
                <ChevronRight sx={{ width: "20px", height: "20px" }} />
              )}
            </ListItemButton>
          </ListItem>

          {/* Render children if available */}
          {item.children && (
            <Collapse in={expanded[item.name]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.children.map((child) => (
                  <ListItemButton
                    key={child.name}
                    onClick={() => handleNavigation(child.path)}
                    sx={{
                      pl: open ? 4 : 2, // Indent child items
                      color: "#9DA2B4",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        color: "white",
                      },
                      ...(location.pathname === child.path && {
                        backgroundColor: "#1B2850",
                        color: "white",
                      }),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 1 : 3.5,
                        justifyContent: "center",
                        color: "#9DA2B4",
                        "&:hover": { color: "white" },
                      }}
                    >
                      <Box
                        sx={{
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {React.cloneElement(child.icon, {
                          sx: {
                            fontSize: "20px",
                            width: "20px",
                            height: "20px",
                          },
                        })}
                      </Box>
                    </ListItemIcon>

                    <ListItemText
                      primary={child.name}
                      primaryTypographyProps={{
                        sx: {
                          fontSize: "13px !important",
                          fontWeight: 500,
                          color: "inherit",
                        },
                      }}
                      sx={{ opacity: 1 }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      ))}
    </List>
  );
};

export default Sidebar;
