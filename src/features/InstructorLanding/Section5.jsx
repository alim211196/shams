import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import { Grid } from "@mui/material";
const Section5 = ({ lang, activeLang, handleChange, formData }) => {
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
          name="instructor_section5_heading"
          value={formData.instructor_section5_heading}
          onChange={handleChange}
          placeholder={hideInArabicFields ? "Heading" : ""}
          lang={lang}
        />
      </Grid>
    </>
  );
};

export default Section5;
