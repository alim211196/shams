import React, { useMemo } from "react";
import CustomButton from "../../common/CustomButton";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";
import Section5 from "./Section5";
import { useSelector } from "react-redux";
import { hasPermission } from "../../utils/permissionHelper";
import { Grid } from "@mui/material";
const AboutUsWebPage = ({
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
}) => {
  const { userPermissions } = useSelector((state) => state.user);
  const canEdit = hasPermission(userPermissions, "edit_section");

  const getSelectedSection = () => {
    const sectionMap = {
      "Section 1": Section1,
      "Section 2": Section2,
      "Section 3": Section3,
      "Section 4": Section4,
      "Section 5": Section5,
    };
    return sectionMap[tabValue] || null;
  };

  const SelectedSection = useMemo(getSelectedSection, [tabValue]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
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
          />
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

export default AboutUsWebPage;
