import { Close } from "@mui/icons-material";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import React, { memo } from "react";

const RemoveCardImage = ({ activeLang, setFormData, field, formData }) => {
  const changeObjectFit = [
    "profile_img",
    "stat_icon",
    "partner_img",
    "about_us_section4_card_img_",
  ].some((prefix) => field.startsWith(prefix));

  const handleRemoveImage = () => {
    if (activeLang) {
      setFormData((prev) => ({
        ...prev,
        [activeLang]: {
          ...prev[activeLang], // Preserve other data
          [field]: null, // Reset the file object
          [`${field}_preview`]: null, // Reset the preview
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: null }));
    }
  };

  return (
    <Box display="flex" justifyContent="start" alignItems="center" my={1}>
      <Paper
        elevation={2}
        sx={{
          width: 120,
          borderRadius: 1,
          border: "1px solid #f1f1f1",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
        }}
      >
        {/* Remove Button */}
        <IconButton
          onClick={handleRemoveImage}
          size="small"
          sx={{
            position: "absolute",
            top: -5,
            right: -10,
            backgroundColor: "lightgray",
            color: "white",
            width: 20,
            height: 20,

            "&:hover": { backgroundColor: "lightgray" },
          }}
          title="Remove Image"
        >
          <Close fontSize="small" />
        </IconButton>

        {/* Image Preview */}
        <Box
          component="img"
          src={formData[`${field}_preview`]}
          alt="Preview"
          sx={{
            width: "100%",
            height: 60,
            m: changeObjectFit ? 1 : 0,
            objectFit: changeObjectFit ? "contain" : "cover",
            borderRadius: 1,
          }}
        />

        {/* Image Details */}
        <Box sx={{ width: "100%", padding: "5px" }}>
          <Typography
            variant="inherit"
            fontWeight="bold"
            noWrap
            sx={{
              wordBreak: "break-word",
              maxWidth: "100%", // Prevents overflow
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontSize: "11px",
            }}
            title={formData[field]?.name}
          >
            {formData[field]?.name}
          </Typography>
          {formData[field]?.size && (
            <Typography variant="caption" color="text.secondary">
              {((formData[field]?.size || 0) / 1024).toFixed(2)} KB
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default memo(RemoveCardImage);
