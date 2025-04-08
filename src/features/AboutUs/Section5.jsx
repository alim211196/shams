import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import { editorOptions } from "../../utils/helper";
import CustomEditor from "../../common/CustomEditor";
import { Grid } from "@mui/material";
const Section5 = ({
  lang,
  activeLang,
  handleChange,
  formData,
  handleEditorChange,
}) => {
  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);
  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="Title">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomTextField
          name="about_us_section5_title"
          value={formData.about_us_section5_title}
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
          name="about_us_section5_description"
          value={formData.about_us_section5_description}
          onChange={(content) =>
            handleEditorChange("about_us_section5_description", content)
          }
          lang={lang}
          editorOptions={editorOptions}
        />
      </Grid>
    </>
  );
};

export default Section5;
