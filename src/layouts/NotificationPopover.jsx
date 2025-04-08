import React, { useState, useCallback } from "react";
import {
  Box,
  List,
  Avatar,
  Divider,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  Badge,
} from "@mui/material";

import { AccessTime, Notifications } from "@mui/icons-material";
import moment from "moment";

const NotificationMenu = ({ sx, ...other }) => {
  const dummyNotifications = [
    {
      id: "1",
      type: "order-placed",
      title: "Order Placed",
      isUnRead: true,
      description: "Your order has been placed.",
      avatarUrl: null,
      postedAt: moment().subtract(1, "hours"),
    },
    {
      id: "2",
      type: "order-shipped",
      title: "Order Shipped",
      isUnRead: true,
      description: "Your order has been shipped.",
      avatarUrl: null,
      postedAt: moment().subtract(2, "hours"),
    },
    {
      id: "3",
      type: "mail",
      title: "New Mail",
      isUnRead: false,
      description: "You have a new email from admin.",
      avatarUrl: null,
      postedAt: moment().subtract(5, "hours"),
    },
    {
      id: "4",
      type: "chat-message",
      title: "New Chat Message",
      isUnRead: true,
      description: "You have a new chat message.",
      avatarUrl: null,
      postedAt: moment().subtract(6, "hours"),
    },
    {
      id: "5",
      type: "order-placed",
      title: "Order Placed",
      isUnRead: false,
      description: "Your order has been placed.",
      avatarUrl: null,
      postedAt: moment().subtract(1, "days"),
    },
  ];

  const [notifications, setNotifications] = useState(dummyNotifications);
  const totalUnRead = notifications.filter((item) => item.isUnRead).length;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = useCallback(
    (event) => setAnchorEl(event.currentTarget),
    []
  );
  const handleCloseMenu = useCallback(() => setAnchorEl(null), []);

  const handleMarkAllAsRead = useCallback(() => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isUnRead: false,
    }));
    setNotifications(updatedNotifications);
  }, [notifications]);

  return (
    <>
      <IconButton
        color={anchorEl ? "primary" : "default"}
        onClick={handleOpenMenu}
        sx={sx}
        {...other}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Notifications sx={{ color: "#BDBDBD" }} />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 320,
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
        <Box
          display="flex"
          alignItems="center"
          sx={{ py: 2, pl: 2.5, pr: 1.5 }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title="Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <AccessTime />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ overflowY: "auto", maxHeight: 360 }}>
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                New
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                Before that
              </ListSubheader>
            }
          >
            {notifications.slice(2).map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </List>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ p: 1 }}>
          <MenuItem onClick={handleCloseMenu}>View all</MenuItem>
        </Box>
      </Menu>
    </>
  );
};

const NotificationItem = ({ notification }) => {
  const { avatarUrl, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(notification.isUnRead && {
          bgcolor: "action.selected",
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "background.neutral" }}>{avatarUrl}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              gap: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            <AccessTime sx={{ width: 14 }} />
            {moment(notification.postedAt).fromNow()}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        &nbsp; {notification.description}
      </Typography>
    </Typography>
  );

  return {
    avatarUrl: notification.avatarUrl ? (
      <img alt={notification.title} src={notification.avatarUrl} />
    ) : null,
    title,
  };
}

export default NotificationMenu;
