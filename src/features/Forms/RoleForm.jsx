/* eslint-disable react/prop-types */
import { memo, useMemo } from "react";
import { Paper, Grid } from "@mui/material";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import CustomLabel from "../../common/CustomLabel";
import CustomSelect from "../../common/CustomSelect";
import CustomButton from "../../common/CustomButton";
import { statusBooleanOptions } from "../../utils/helper";

const RoleForm = ({
  formData,
  setFormData,
  handleSubmit,
  loading,
  lang,
  activeLang = "en",
}) => {
  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: "0px !important" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Name" isRequired>
              <TranslateButton />
            </CustomLabel>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={hideInArabicFields ? "Name" : ""}
              lang={lang}
              required
            />
          </Grid>
          {hideInArabicFields && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Status" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomSelect
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={statusBooleanOptions}
                  placeholder="Select Status"
                  required
                />
              </Grid>
            </>
          )}

          <Grid size={{ xs: 12 }} display="flex" justifyContent="flex-end">
            <CustomButton type="submit" color="primary" loading={loading}>
              Save
            </CustomButton>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default memo(RoleForm);
