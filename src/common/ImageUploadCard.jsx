import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import RemoveCardImage from "./RemoveCardImage";

const ImageUploadCard = ({
  field,
  formData,
  setFormData,
  handleImageUpload,
  activeLang,
}) => {
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      handleImageUpload(e, field);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#FFFFFF",
          borderRadius: "0.375rem",
          color: "#383838",
          border: "1px solid #dee2e6",
          cursor: "pointer",
          gap: 1,
          flexWrap: "wrap", // Allow wrapping on small screens
          maxWidth: "100%", // Ensure it doesn’t overflow
          overflow: "hidden",
        }}
        onClick={() => document.getElementById(`file-input-${field}`).click()}
      >
        <Typography
          sx={{
            fontSize: "12px",
            color: "#495057",
            padding: "0.375rem 0.75rem",
            whiteSpace: "nowrap",
            backgroundColor: "#f0f0f0",
          }}
        >
          Choose file
        </Typography>

        <Typography
          sx={{
            fontSize: "12px",
            color: "#6c757d",
            padding: "0.375rem 0.75rem",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: { xs: "100px", sm: "150px", lg: "100%" }, // Adjust width based on screen size
            flexShrink: 1, // Prevent it from expanding too much
          }}
        >
          {formData[field] ? formData[field]?.name : fileName}
        </Typography>
      </Box>

      <input
        id={`file-input-${field}`}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />

      {formData[field] && (
        <RemoveCardImage
          activeLang={activeLang}
          setFormData={setFormData}
          field={field}
          formData={formData}
        />
      )}
    </>
  );
};

export default ImageUploadCard;
