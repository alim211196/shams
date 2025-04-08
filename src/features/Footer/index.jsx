import React, { useMemo } from "react";
import CustomButton from "../../common/CustomButton";

import { useSelector } from "react-redux";
import { hasPermission } from "../../utils/permissionHelper";
import AboutWidget from "./AboutWidget";
import ContactInfoWidget from "./ContactInfoWidget";
import LinkWidgetOne from "./LinkWidgetOne";
import LinkWidgetTwo from "./LinkWidgetTwo";
import LinkWidgetThree from "./LinkWidgetThree";
import OpeningSchedule from "./OpeningSchedule";
import CopyrightWidget from "./CopyrightWidget";
import SocialLinkWidget from "./SocialLinkWidget";
import PaymentMethodsWidget from "./PaymentMethodsWidget";
import { Grid } from "@mui/material";
const FooterIndex = ({
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
      "About Widget": AboutWidget,
      "Contact Info Widget": ContactInfoWidget,
      "Link Widget One": LinkWidgetOne,
      "Link Widget Two": LinkWidgetTwo,
      "Link Widget Three": LinkWidgetThree,
      "Opening Schedule": OpeningSchedule,
      "Copyright Widget": CopyrightWidget,
      "Social Link Widget": SocialLinkWidget,
      "Payment Methods Widget": PaymentMethodsWidget,
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
          activeLang === "ar" && ["Social Link Widget"].includes(tabValue)
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

export default FooterIndex;
