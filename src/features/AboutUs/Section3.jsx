import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import AboutUsCardSection from "./AboutUsCardSection";
import { Grid } from "@mui/material";
const Section3 = ({
  lang,
  activeLang,
  handleChange,
  formData,
  setFormData,
  handleEditorChange,
}) => {
  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);
  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="Achievement Title">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomTextField
          name="about_us_Section3_achievement_title"
          value={formData.about_us_Section3_achievement_title}
          onChange={handleChange}
          placeholder={hideInArabicFields ? "Achievement Title" : ""}
          lang={lang}
        />
      </Grid>
      <AboutUsCardSection
        lang={lang}
        hideInArabicFields={hideInArabicFields}
        handleChange={handleChange}
        formData={formData}
        setFormData={setFormData}
        handleEditorChange={handleEditorChange}
      />
    </>
  );
};

export default Section3;
