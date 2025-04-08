import { useState } from "react";

const useImageUpload = (setFormData, formData) => {
  const [previews, setPreviews] = useState({});

  // Handle Image Selection & Preview
  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file); // Create preview URL

      setFormData((prev) => ({
        ...prev,
        [field]: file, // Store file object for upload
      }));

      setPreviews((prev) => ({
        ...prev,
        [field]: previewUrl, // Store preview URL
      }));
    }
  };

  // Remove Image & Clear Preview
  const handleRemoveImage = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: null, // Remove file object
    }));

    setPreviews((prev) => ({
      ...prev,
      [field]: null, // Remove preview URL
    }));
  };

  return {
    formData,
    setFormData,
    previews,
    handleImageUpload,
    handleRemoveImage,
  };
};

export default useImageUpload;
