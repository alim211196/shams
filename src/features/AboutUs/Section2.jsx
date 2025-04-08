import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import ImageUploadCard from "../../common/ImageUploadCard";
import { editorOptions } from "../../utils/helper";
import CustomEditor from "../../common/CustomEditor";
import { Grid } from "@mui/material";
const Section2 = ({
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
        <CustomLabel label="Title">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomTextField
          name="about_us_section2_title"
          value={formData.about_us_section2_title}
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
          name="about_us_section2_description"
          value={formData.about_us_section2_description}
          onChange={(content) =>
            handleEditorChange("about_us_section2_description", content)
          }
          lang={lang}
          editorOptions={editorOptions}
        />
      </Grid>
      {hideInArabicFields && (
        <>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="About Image (900x600)" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <ImageUploadCard
              field="about_us_section2_img"
              formData={formData}
              setFormData={setFormData}
              handleImageUpload={handleImageUpload}
            />
          </Grid>
        </>
      )}

      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="Tab 1">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomTextField
          name="about_us_section2_tab1"
          value={formData.about_us_section2_tab1}
          onChange={handleChange}
          placeholder={hideInArabicFields ? "Tab 1" : ""}
          lang={lang}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="Tab 2">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomTextField
          name="about_us_section2_tab2"
          value={formData.about_us_section2_tab2}
          onChange={handleChange}
          placeholder={hideInArabicFields ? "Tab 2" : ""}
          lang={lang}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="Tab 1 Description">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomEditor
          name="about_us_section2_tab1_description"
          value={formData.about_us_section2_tab1_description}
          onChange={(content) =>
            handleEditorChange("about_us_section2_tab1_description", content)
          }
          lang={lang}
          editorOptions={editorOptions}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="Tab 2 Description">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomEditor
          name="about_us_section2_tab2_description"
          value={formData.about_us_section2_tab2_description}
          onChange={(content) =>
            handleEditorChange("about_us_section2_tab2_description", content)
          }
          lang={lang}
          editorOptions={editorOptions}
        />
      </Grid>
      {hideInArabicFields && (
        <>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Tab Background (1920x860)" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <ImageUploadCard
              field="about_us_section2_tab_img"
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

export default Section2;
