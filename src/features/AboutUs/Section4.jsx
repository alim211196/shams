import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";

import FeaturesCardSection from "./FeaturesCardSection";
import { editorOptions } from "../../utils/helper";
import CustomEditor from "../../common/CustomEditor";
import { Grid } from "@mui/material";
const Section4 = ({
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
        <CustomLabel label="Partner Title">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomTextField
          name="about_us_Section4_partner_title"
          value={formData.about_us_Section4_partner_title}
          onChange={handleChange}
          placeholder={hideInArabicFields ? "Partner Title" : ""}
          lang={lang}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="Title">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomTextField
          name="about_us_section4_title"
          value={formData.about_us_section4_title}
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
          name="about_us_section4_description"
          value={formData.about_us_section4_description}
          onChange={(content) =>
            handleEditorChange("about_us_section4_description", content)
          }
          lang={lang}
          editorOptions={editorOptions}
        />
      </Grid>
      <FeaturesCardSection
        lang={lang}
        hideInArabicFields={hideInArabicFields}
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleImageUpload={handleImageUpload}
        handleEditorChange={handleEditorChange}
      />
    </>
  );
};

export default Section4;
