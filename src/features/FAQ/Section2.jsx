import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import { Grid } from "@mui/material";
const Section2 = ({ lang, activeLang, formData, handleChange }) => {
  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);
  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="FAQ Title">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomTextField
          name="faq_section2_title"
          value={formData.faq_section2_title}
          onChange={handleChange}
          placeholder={hideInArabicFields ? "FAQ Title" : ""}
          lang={lang}
        />
      </Grid>
    </>
  );
};

export default Section2;
