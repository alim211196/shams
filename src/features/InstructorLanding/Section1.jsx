import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import ImageUploadCard from "../../common/ImageUploadCard";
import CustomEditor from "../../common/CustomEditor";
import { editorOptions } from "../../utils/helper";
import { Grid } from "@mui/material";
const Section1 = ({
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
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="Heading">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomTextField
          name="instructor_section1_heading"
          value={formData.instructor_section1_heading}
          onChange={handleChange}
          placeholder={hideInArabicFields ? "Heading" : ""}
          lang={lang}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="Sub Heading">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomEditor
          name="instructor_section1_subheading"
          value={formData.instructor_section1_subheading}
          onChange={(content) =>
            handleEditorChange("instructor_section1_subheading", content)
          }
          lang={lang}
          editorOptions={editorOptions}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="Button Text">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomTextField
          name="instructor_section1_btn_text"
          value={formData.instructor_section1_btn_text}
          onChange={handleChange}
          placeholder={hideInArabicFields ? "Button Text" : ""}
          lang={lang}
        />
      </Grid>
      {hideInArabicFields && (
        <>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Banner (1760x780)" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <ImageUploadCard
              field="instructor_section1_banner_img"
              formData={formData}
              setFormData={setFormData}
              handleImageUpload={handleImageUpload}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default Section1;
