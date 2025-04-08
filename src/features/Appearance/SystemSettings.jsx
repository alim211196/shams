import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import ImageUploadCard from "../../common/ImageUploadCard";
import CustomEditor from "../../common/CustomEditor";
import { editorOptions } from "../../utils/helper";
import CustomAutocomplete from "../../common/CustomAutocomplete";
import moment from "moment-timezone";
import { Grid } from "@mui/material";
const SystemSettings = ({
  lang,
  activeLang,
  formData,
  setFormData,
  handleImageUpload,
  handleChange,
  handleEditorChange,
}) => {
  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);
  const timezones = moment?.tz?.names();
  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="System name">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomTextField
          name="system_name"
          value={formData.system_name}
          onChange={handleChange}
          placeholder={hideInArabicFields ? "System name" : ""}
          lang={lang}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="Frontend Website Name">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomTextField
          name="website_name"
          value={formData.website_name}
          onChange={handleChange}
          placeholder={hideInArabicFields ? "Frontend Website Name" : ""}
          lang={lang}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="Site Motto">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomTextField
          name="site_motto"
          value={formData.site_motto}
          onChange={handleChange}
          placeholder={hideInArabicFields ? "Site Motto" : ""}
          lang={lang}
        />
      </Grid>

      {hideInArabicFields && (
        <>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Logo - White" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <ImageUploadCard
              field="system_logo_white_img"
              formData={formData}
              setFormData={setFormData}
              handleImageUpload={handleImageUpload}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Logo - Black" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <ImageUploadCard
              field="system_logo_black_img"
              formData={formData}
              setFormData={setFormData}
              handleImageUpload={handleImageUpload}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="System Timezone" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomAutocomplete
              name="system_timezone"
              value={formData.system_timezone}
              onChange={handleChange}
              options={timezones.map((tz) => ({
                value: tz,
                label: tz,
              }))}
              placeholder="Select Timezone"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Site Icon" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <ImageUploadCard
              field="system_site_icon_img"
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

export default SystemSettings;
