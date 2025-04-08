import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import StepperSection from "./StepperSection";
import { Grid } from "@mui/material";
const Section4 = ({
  lang,
  activeLang,
  formData,
  setFormData,
  handleImageUpload,
  handleChange,
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
          name="instructor_section4_heading"
          value={formData.instructor_section4_heading}
          onChange={handleChange}
          placeholder={hideInArabicFields ? "Heading" : ""}
          lang={lang}
        />
      </Grid>
      <StepperSection
        step={1}
        handleChange={handleChange}
        lang={lang}
        hideInArabicFields={hideInArabicFields}
        handleImageUpload={handleImageUpload}
        formData={formData}
        setFormData={setFormData}
      />
      <StepperSection
        step={2}
        handleChange={handleChange}
        lang={lang}
        hideInArabicFields={hideInArabicFields}
        handleImageUpload={handleImageUpload}
        formData={formData}
        setFormData={setFormData}
      />
      <StepperSection
        step={3}
        handleChange={handleChange}
        lang={lang}
        hideInArabicFields={hideInArabicFields}
        handleImageUpload={handleImageUpload}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
};

export default Section4;
