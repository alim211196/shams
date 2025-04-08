import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import CustomTextField from "../../common/CustomTextField";

import ImageUploadCard from "../../common/ImageUploadCard";
import { editorOptions } from "../../utils/helper";
import CustomEditor from "../../common/CustomEditor";
import { Grid } from "@mui/material";
const GlobalSEO = ({
  lang,
  activeLang,
  formData,
  setFormData,
  handleChange,
  handleImageUpload,
  handleEditorChange,
}) => {
  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);

  return (
    hideInArabicFields && (
      <>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label="Meta Title" />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CustomTextField
            name="meta_title"
            value={formData.meta_title}
            onChange={handleChange}
            placeholder="Meta Title"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label="Meta Description" />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CustomEditor
            name="meta_description"
            value={formData.meta_description}
            onChange={(content) =>
              handleEditorChange("meta_description", content)
            }
            lang={lang}
            editorOptions={editorOptions}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label="Meta Keywords" />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CustomTextField
            name="meta_keywords"
            value={formData.meta_keywords}
            onChange={handleChange}
            placeholder="Meta Keywords"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label="Meta Image (200x200)" />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <ImageUploadCard
            field="meta_img"
            formData={formData}
            setFormData={setFormData}
            handleImageUpload={handleImageUpload}
          />
        </Grid>
      </>
    )
  );
};

export default GlobalSEO;
