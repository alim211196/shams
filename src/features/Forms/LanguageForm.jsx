import React, { memo } from "react";
import { Paper, Grid } from "@mui/material";
import CustomTextField from "../../common/CustomTextField";
import CustomLabel from "../../common/CustomLabel";
import CustomSelect from "../../common/CustomSelect";
import CustomButton from "../../common/CustomButton";
import {
  rtlOptions,
  statusBooleanOptions,
  statusOptions,
} from "../../utils/helper";

const LanguageForm = ({
  formData,
  setFormData,
  handleSubmit,
  loading,
  checkPermission,
}) => {
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
            <CustomLabel label="Name" isRequired />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={"Name"}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Code" isRequired />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder={"Code"}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="App Language Code" isRequired />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name="app_lang_code"
              value={formData.app_lang_code}
              onChange={handleChange}
              placeholder={"App Language Code"}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="RTL" isRequired />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomSelect
              name="rtl"
              value={formData.rtl}
              onChange={handleChange}
              options={rtlOptions}
              placeholder="Select RTL"
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Status" isRequired />
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

          <Grid size={{ xs: 12 }} display="flex" justifyContent="flex-end">
            <CustomButton
              type="submit"
              color="primary"
              loading={loading}
              disabled={!checkPermission}
            >
              Save
            </CustomButton>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default memo(LanguageForm);
