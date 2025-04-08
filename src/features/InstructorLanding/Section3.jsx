import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import CustomEditor from "../../common/CustomEditor";
import { editorOptions } from "../../utils/helper";
import ImageUploadCard from "../../common/ImageUploadCard";
import StatSection from "./StatSection";
import { Grid } from "@mui/material";
const Section3 = ({
  lang,
  activeLang,
  handleChange,
  formData,
  setFormData,
  handleImageUpload,
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
          name="instructor_section3_heading"
          value={formData.instructor_section3_heading}
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
          name="instructor_section3_subheading"
          value={formData.instructor_section3_subheading}
          onChange={(content) =>
            handleEditorChange("instructor_section3_subheading", content)
          }
          lang={lang}
          editorOptions={editorOptions}
        />
      </Grid>

      {hideInArabicFields && (
        <>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Stat Banner (1920x570)" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <ImageUploadCard
              field="instructor_section3_background_img"
              formData={formData}
              setFormData={setFormData}
              handleImageUpload={handleImageUpload}
            />
          </Grid>
        </>
      )}

      <StatSection
        lang={lang}
        hideInArabicFields={hideInArabicFields}
        handleChange={handleChange}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
};

export default Section3;
