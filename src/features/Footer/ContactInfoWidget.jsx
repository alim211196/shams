import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import ImageUploadCard from "../../common/ImageUploadCard";
import CustomEditor from "../../common/CustomEditor";
import { editorOptions } from "../../utils/helper";
import { Grid } from "@mui/material";
const ContactInfoWidget = ({
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
        <CustomLabel label="Contact address">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomEditor
          name="contact_address"
          value={formData.contact_address}
          onChange={(content) => handleEditorChange("contact_address", content)}
          lang={lang}
          editorOptions={editorOptions}
        />
      </Grid>
      {hideInArabicFields && (
        <>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Contact number" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              placeholder={hideInArabicFields ? "Contact number" : ""}
              lang={lang}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Whatsapp number" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name="whatsapp_number"
              value={formData.whatsapp_number}
              onChange={handleChange}
              placeholder={hideInArabicFields ? "Whatsapp number" : ""}
              lang={lang}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Contact email" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
              placeholder={hideInArabicFields ? "Contact email" : ""}
              lang={lang}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default ContactInfoWidget;
