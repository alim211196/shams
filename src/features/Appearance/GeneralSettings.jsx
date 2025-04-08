import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import CustomTextField from "../../common/CustomTextField";

import CustomColorPicker from "../../common/CustomColorPicker";
import { Grid } from "@mui/material";
const GeneralSettings = ({
  lang,
  activeLang,
  formData,
  setFormData,
  handleImageUpload,
  handleChange,
  handleEditorChange,
}) => {
  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);

  return (
    hideInArabicFields && (
      <>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label="Primary color" />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CustomColorPicker
            name={`website_primary_color`}
            value={formData.website_primary_color}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label="Primary hover color" />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CustomColorPicker
            name={`website_primary_hover_color`}
            value={formData.website_primary_hover_color}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label="Secondary color" />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CustomColorPicker
            name={`website_secondary_color`}
            value={formData.website_secondary_color}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label="Secondary hover color" />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CustomColorPicker
            name={`website_secondary_hover_color`}
            value={formData.website_secondary_hover_color}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label="Gradient color" />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CustomTextField
            name="website_gradient_color"
            value={formData.website_gradient_color}
            onChange={handleChange}
            placeholder={"Gradient color"}
            lang={lang}
          />
        </Grid>
      </>
    )
  );
};

export default GeneralSettings;
