import React, { useMemo } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { AddPhotoAlternate } from "@mui/icons-material";

const AddAmenities = ({
  formData,
  setFormData,
  editMode,
  lang,
  activeLang,
}) => {
  const hideInArabicFields = useMemo(() => activeLang !== "en", [activeLang]);

  // Handle file upload
  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => {
        const updatedOptions = [...prev];
        updatedOptions[index] = {
          ...updatedOptions[index],
          icon_img: file,
          icon_img_preview: previewUrl,
        };
        return updatedOptions;
      });
    }
  };

  // Handle text input change
  const handleTextChange = (index, event) => {
    setFormData((prev) => {
      const updatedOptions = [...prev];
      updatedOptions[index] = {
        ...updatedOptions[index],
        name: event.target.value,
      };
      return updatedOptions;
    });
  };

  // Add new option
  const addOption = () => {
    setFormData((prev) => [
      ...prev,
      { name: "", icon_img: null, icon_img_preview: null },
    ]);
  };

  // Remove option
  const removeOption = (index) => {
    setFormData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {formData.map((option, index) => (
        <TextField
          key={index}
          placeholder={`Option ${index + 1}`}
          value={option.name}
          onChange={(e) => handleTextChange(index, e)}
          InputProps={{
            startAdornment: !(hideInArabicFields && editMode) && (
              <InputAdornment position="start" sx={{ marginRight: 0 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e)}
                  style={{ display: "none" }}
                  id={`upload-button-${index}`}
                />
                <label htmlFor={`upload-button-${index}`}>
                  <Avatar
                    alt="Icon"
                    variant="square"
                    src={option?.icon_img_preview || ""}
                    sx={{
                      width: 24,
                      height: 24,
                      cursor: "pointer",
                      backgroundColor: "transparent",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {!option?.icon_img_preview && (
                      <AddPhotoAlternate
                        sx={{ fontSize: 28, color: "#BDBDBD" }}
                      />
                    )}
                  </Avatar>
                </label>
              </InputAdornment>
            ),
            endAdornment: !editMode && (
              <InputAdornment position="end">
                {index === 0 ? (
                  <IconButton color="primary" onClick={addOption}>
                    <AddCircleIcon />
                  </IconButton>
                ) : (
                  <IconButton color="error" onClick={() => removeOption(index)}>
                    <RemoveCircleIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      ))}
    </Box>
  );
};

export default AddAmenities;
