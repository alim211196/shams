import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import ImageUploadCard from "../../common/ImageUploadCard";
import { Grid } from "@mui/material";
const Section1 = ({
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
          name="faq_section1_heading"
          value={formData.faq_section1_heading}
          onChange={handleChange}
          placeholder={hideInArabicFields ? "Heading" : ""}
          lang={lang}
        />
      </Grid>

      {hideInArabicFields && (
        <>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Banner (1760x728)" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <ImageUploadCard
              field="faq_section1_banner_img"
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
