import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import ImageUploadCard from "../../common/ImageUploadCard";
import CustomEditor from "../../common/CustomEditor";
import { editorOptions } from "../../utils/helper";
import { Grid } from "@mui/material";
const AboutWidget = ({
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
    <>
      {hideInArabicFields && (
        <>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Logo" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <ImageUploadCard
              field="about_logo_img"
              formData={formData}
              setFormData={setFormData}
              handleImageUpload={handleImageUpload}
            />
          </Grid>
        </>
      )}

      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="Title">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomTextField
          name="about_title"
          value={formData.about_title}
          onChange={handleChange}
          placeholder={hideInArabicFields ? "Title" : ""}
          lang={lang}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="Description">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomEditor
          name="about_description"
          value={formData.about_description}
          onChange={(content) =>
            handleEditorChange("about_description", content)
          }
          lang={lang}
          editorOptions={editorOptions}
        />
      </Grid>
    </>
  );
};

export default AboutWidget;
