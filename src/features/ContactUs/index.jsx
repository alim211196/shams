import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import { editorOptions } from "../../utils/helper";
import CustomEditor from "../../common/CustomEditor";
import { useSelector } from "react-redux";
import { hasPermission } from "../../utils/permissionHelper";
import CustomButton from "../../common/CustomButton";
import { Grid } from "@mui/material";
const ContactUs = ({
  lang,
  activeLang,
  formData,
  handleSubmit,
  loading,
  handleChange,
  handleEditorChange,
}) => {
  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);
  const { userPermissions } = useSelector((state) => state.user);
  const canEdit = hasPermission(userPermissions, "edit_section");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      encType="multipart/form-data"
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label="Title" isRequired>
            <TranslateButton />
          </CustomLabel>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CustomTextField
            name="contact_us_section1_title"
            value={formData.contact_us_section1_title}
            onChange={handleChange}
            placeholder={hideInArabicFields ? "Title" : ""}
            lang={lang}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label="Description" isRequired>
            <TranslateButton />
          </CustomLabel>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CustomEditor
            name="contact_us_section1_description"
            value={formData.contact_us_section1_description}
            onChange={(content) =>
              handleEditorChange("contact_us_section1_description", content)
            }
            lang={lang}
            editorOptions={editorOptions}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label="Full Address" isRequired>
            <TranslateButton />
          </CustomLabel>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CustomEditor
            name="contact_us_section1_address"
            value={formData.contact_us_section1_address}
            onChange={(content) =>
              handleEditorChange("contact_us_section1_address", content)
            }
            lang={lang}
            editorOptions={editorOptions}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label="Contact Details" isRequired>
            <TranslateButton />
          </CustomLabel>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CustomEditor
            name="contact_us_section1_contact_details"
            value={formData.contact_us_section1_contact_details}
            onChange={(content) =>
              handleEditorChange("contact_us_section1_contact_details", content)
            }
            lang={lang}
            editorOptions={editorOptions}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label="Available Time" isRequired>
            <TranslateButton />
          </CustomLabel>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CustomEditor
            name="contact_us_section1_available_time"
            value={formData.contact_us_section1_available_time}
            onChange={(content) =>
              handleEditorChange("contact_us_section1_available_time", content)
            }
            lang={lang}
            editorOptions={editorOptions}
          />
        </Grid>
        {hideInArabicFields && (
          <>
            <Grid size={{ xs: 12, md: 4 }}>
              <CustomLabel label="Google Map key" isRequired />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <CustomTextField
                name="contact_us_section1_map_key"
                value={formData.contact_us_section1_map_key}
                onChange={handleChange}
                placeholder={hideInArabicFields ? "Google Map key" : ""}
                lang={lang}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <CustomLabel label="Latitude & Longitude" isRequired />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <CustomTextField
                name="contact_us_section1_map_latitude"
                value={formData.contact_us_section1_map_latitude}
                onChange={handleChange}
                placeholder={hideInArabicFields ? "Latitude: 25.308014" : ""}
                lang={lang}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <CustomTextField
                name="contact_us_section1_map_longitude"
                value={formData.contact_us_section1_map_longitude}
                onChange={handleChange}
                placeholder={hideInArabicFields ? "Longitude: 55.411171" : ""}
                lang={lang}
              />
            </Grid>
          </>
        )}

        <Grid size={{ xs: 12 }} display="flex" justifyContent="flex-end">
          <CustomButton
            type="submit"
            color="primary"
            loading={loading}
            disabled={!canEdit}
          >
            Save
          </CustomButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContactUs;
