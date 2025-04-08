import React from "react";
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

const AddOptions = ({ formData, setFormData }) => {
  // Handle file upload
  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file); // Generate preview URL
      setFormData((prev) => {
        const updatedOptions = [...prev.options];
        updatedOptions[index].icon = file; // Store actual file object
        updatedOptions[index].icon_preview = previewUrl; // Store preview URL
        return { ...prev, options: updatedOptions };
      });
    }
  };

  // Handle text input change
  const handleTextChange = (index, event) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index].text = event.target.value;
    setFormData({ ...formData, options: updatedOptions });
  };

  // Add new option
  const addOption = () => {
    setFormData({
      ...formData,
      options: [...formData.options, { text: "", icon: null }],
    });
  };

  // Remove option
  const removeOption = (index) => {
    const updatedOptions = formData.options.filter((_, i) => i !== index);
    setFormData({ ...formData, options: updatedOptions });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {formData.options.map((option, index) => (
        <TextField
          key={index}
          placeholder={`Option ${index + 1}`}
          value={option.text}
          onChange={(e) => handleTextChange(index, e)}
          InputProps={{
            startAdornment: (
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
                    src={option?.icon_preview || ""}
                    sx={{
                      width: 28, // Adjust width
                      height: 28, // Adjust height
                      cursor: "pointer",
                      backgroundColor: "transparent",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {!option?.icon_preview && (
                      <AddPhotoAlternate
                        sx={{ fontSize: 28, color: "#BDBDBD" }}
                      />
                    )}
                  </Avatar>
                </label>
              </InputAdornment>
            ),
            endAdornment: (
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

export default AddOptions;
