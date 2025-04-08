import React, { useEffect } from "react";
import {
  TextField,
  Button,
  IconButton,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { Add, AddCircleOutline, Close, Remove } from "@mui/icons-material";
import CustomTextField from "./CustomTextField";
import ImageUploadCard from "./ImageUploadCard";
const RepeatablePaymentMethods = ({
  paymentMethods,
  setPaymentMethods,
  hideInArabicFields,
  lang,
  formData,
  setFormData,
  activeLang,
}) => {
  useEffect(() => {
    if (formData?.payment_methods?.length) {
      const prefilledLinks = formData?.payment_methods?.map((name, index) => ({
        payment_name: name,
        payment_img: formData?.payment_methods_img?.[index] || "",
      }));
      setPaymentMethods(prefilledLinks);
    }
  }, [formData, activeLang, setPaymentMethods]);

  // Add new link field
  const handleAdd = () => {
    setPaymentMethods([
      ...paymentMethods,
      { payment_name: "", payment_img: "", payment_img_preview: "" },
    ]);
  };

  // Update link values
  const handleChange = (index, field, value) => {
    const updatedLinks = [...paymentMethods];
    updatedLinks[index][field] = value;
    setPaymentMethods(updatedLinks);

    // Extract only day values as an array
    const methodTextValues = updatedLinks
      .map((link) => link.payment_name)
      .filter(Boolean);

    setFormData((prev) => ({
      ...prev,
      [activeLang]: {
        ...prev[activeLang],
        payment_methods: methodTextValues,
      },
    }));
  };

  const handleImageUpload = (e, field, index) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);

      // ✅ Ensure previous state is maintained properly
      const updatedPaymentMethods = [...paymentMethods];
      updatedPaymentMethods[index] = {
        ...updatedPaymentMethods[index],
        payment_img: file,
        payment_img_preview: previewUrl,
      };

      setPaymentMethods(updatedPaymentMethods);

      // ✅ Extract images and previews correctly
      const methodImgValues = updatedPaymentMethods.map(
        (item) => item.payment_img || null
      );
      const methodImgPreviewValues = updatedPaymentMethods.map(
        (item) => item.payment_img_preview || null
      );

      setFormData((prev) => ({
        ...prev,
        [activeLang]: {
          ...prev[activeLang],
          payment_methods_img: methodImgValues,
          payment_methods_img_preview: methodImgPreviewValues,
        },
      }));
    }
  };

  // Remove a link field
  const handleRemove = (index) => {
    const filteredLinks = paymentMethods.filter((_, i) => i !== index);
    setPaymentMethods(filteredLinks);

    // Extract only day values as an array
    const methodTextValues = filteredLinks
      .map((link) => link.payment_name)
      .filter(Boolean);
    const methodImgValues = filteredLinks
      .map((link) => link.payment_img)
      .filter(Boolean);

    setFormData((prev) => ({
      ...prev,
      [activeLang]: {
        ...prev[activeLang],
        payment_methods: methodTextValues,
        payment_methods_img: methodImgValues,
      },
    }));
  };

  return (
    <Grid
      container
      spacing={2}
      //   sx={{ mb: 1, border: "1px dashed #ddd", p: 2, borderRadius: "5px" }}
    >
      {paymentMethods.map((link, index) => (
        <>
          <Grid size={{ xs: 12, md: hideInArabicFields ? 4 : 11 }}>
            <CustomTextField
              name={"payment_name"}
              value={link.payment_name}
              onChange={(e) =>
                handleChange(index, "payment_name", e.target.value)
              }
              placeholder={hideInArabicFields ? "Label" : ""}
              lang={lang}
            />
          </Grid>
          {hideInArabicFields && (
            <Grid size={{ xs: 12, md: 7 }}>
              <ImageUploadCard
                activeLang={activeLang}
                field={"payment_methods_img"}
                formData={formData}
                setFormData={setFormData}
                handleImageUpload={handleImageUpload}
                index={index}
              />
            </Grid>
          )}

          <Grid size={{ xs: 12, md: 1 }}>
            <IconButton onClick={() => handleRemove(index)}>
              <Close color="secondary" style={{ fontSize: "16px" }} />
            </IconButton>
          </Grid>
        </>
      ))}
      <Grid size={{ xs: 12, md: 2 }}>
        <Button
          color="secondary"
          fullWidth
          variant="text"
          startIcon={<AddCircleOutline />}
          sx={{ border: "1px dashed #ddd" }}
          onClick={handleAdd}
        >
          Add New
        </Button>
      </Grid>
    </Grid>
  );
};

export default RepeatablePaymentMethods;
