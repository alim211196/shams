import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import WhyBecomeTrainerSection from "./WhyBecomeTrainerSection";
import { Grid } from "@mui/material";
const Section2 = ({
  lang,
  activeLang,
  formData,
  setFormData,
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
          name="instructor_section2_heading"
          value={formData.instructor_section2_heading}
          onChange={handleChange}
          placeholder={hideInArabicFields ? "Heading" : ""}
          lang={lang}
        />
      </Grid>
      <WhyBecomeTrainerSection
        lang={lang}
        hideInArabicFields={hideInArabicFields}
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleEditorChange={handleEditorChange}
      />
    </>
  );
};

export default Section2;
