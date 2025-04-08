import React, { useMemo } from "react";
import CustomButton from "../../common/CustomButton";

import { useSelector } from "react-redux";
import { hasPermission } from "../../utils/permissionHelper";
import SystemSettings from "./SystemSettings";
import GeneralSettings from "./GeneralSettings";
import GlobalSEO from "./GlobalSEO";
import CookiesAgreement from "./CookiesAgreement";
import WebsitePopup from "./WebsitePopup";
import HeaderSetting from "./HeaderSetting";
import { Grid } from "@mui/material";
const AppearanceIndex = ({
  tabValue,
  lang,
  activeLang,
  setFormData,
  formData,
  handleSubmit,
  loading,
  handleChange,
  handleEditorChange,
  handleImageUpload,
  handleToggle,
}) => {
  const { userPermissions } = useSelector((state) => state.user);
  const canEdit = hasPermission(userPermissions, "edit_section");

  const getSelectedSection = () => {
    const sectionMap = {
      "System Settings": SystemSettings,
      "General Settings": GeneralSettings,
      "Global SEO": GlobalSEO,
      "Cookies Agreement": CookiesAgreement,
      "Website Popup": WebsitePopup,
      "Header Setting": HeaderSetting,
    };
    return sectionMap[tabValue] || null;
  };

  const SelectedSection = useMemo(getSelectedSection, [tabValue]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formData);
      }}
      encType="multipart/form-data"
    >
      <Grid container spacing={2}>
        {SelectedSection && (
          <SelectedSection
            lang={lang}
            activeLang={activeLang}
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            handleImageUpload={handleImageUpload}
            handleEditorChange={handleEditorChange}
            handleToggle={handleToggle}
          />
        )}
        {!(
          activeLang === "ar" &&
          ["General Settings", "Global SEO", "Header Setting"].includes(
            tabValue
          )
        ) && (
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
        )}
      </Grid>
    </form>
  );
};

export default AppearanceIndex;
