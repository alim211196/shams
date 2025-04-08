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
const TermsAndConditions = ({
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
          <CustomLabel label="Title">
            <TranslateButton />
          </CustomLabel>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CustomTextField
            name="terms_conditions_section1_title"
            value={formData.terms_conditions_section1_title}
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
            name="terms_conditions_section1_description"
            value={formData.terms_conditions_section1_description}
            onChange={(content) =>
              handleEditorChange(
                "terms_conditions_section1_description",
                content
              )
            }
            lang={lang}
            editorOptions={editorOptions}
          />
        </Grid>
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

export default TermsAndConditions;
