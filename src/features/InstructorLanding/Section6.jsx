import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import { editorOptions } from "../../utils/helper";
import CustomEditor from "../../common/CustomEditor";
import ImageUploadCard from "../../common/ImageUploadCard";
import { Grid } from "@mui/material";
const Section6 = ({
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
        <CustomLabel label="Card Title">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomTextField
          name="instructor_section6_title"
          value={formData.instructor_section6_title}
          onChange={handleChange}
          placeholder={hideInArabicFields ? "Title" : ""}
          lang={lang}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="Card Description">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomEditor
          name="instructor_section6_description"
          value={formData.instructor_section6_description}
          onChange={(content) =>
            handleEditorChange("instructor_section6_description", content)
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
          name="instructor_section6_btn_text"
          value={formData.instructor_section6_btn_text}
          onChange={handleChange}
          placeholder={hideInArabicFields ? "Button Text" : ""}
          lang={lang}
        />
      </Grid>
      {hideInArabicFields && (
        <>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Card Image (1760x300)" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <ImageUploadCard
              field="instructor_section6_card_img"
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

export default Section6;
