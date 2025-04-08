import React, { memo, useMemo } from "react";
import { Paper, Grid } from "@mui/material";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import CustomLabel from "../../common/CustomLabel";
import CustomSelect from "../../common/CustomSelect";
import ImageUploadCard from "../../common/ImageUploadCard";
import CustomButton from "../../common/CustomButton";
import {
  statType,
  statusBooleanOptions,
  statusOptions,
} from "../../utils/helper";

const StatForm = ({
  formData,
  setFormData,
  handleSubmit,
  loading,
  lang,
  activeLang = "en",
  checkPermission,
}) => {
  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file); // For preview purposes
      setFormData((prev) => ({
        ...prev,
        [field]: file, // Store actual file object (not URL)
        [`${field}_preview`]: previewUrl, // Optional for UI preview
      }));
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: "0px !important" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
        encType="multipart/form-data"
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Stat Title" isRequired>
              <TranslateButton />
            </CustomLabel>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name="stat_title"
              value={formData.stat_title}
              onChange={handleChange}
              placeholder={hideInArabicFields ? "Stat Title" : ""}
              lang={lang}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Stat Count" isRequired>
              <TranslateButton />
            </CustomLabel>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name="stat_count"
              type="number"
              value={formData.stat_count}
              onChange={handleChange}
              placeholder={hideInArabicFields ? "Stat Count" : ""}
              lang={lang}
              required
            />
          </Grid>

          {hideInArabicFields && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Stat Type" isRequired />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomSelect
                  name="stat_type"
                  value={formData.stat_type}
                  onChange={handleChange}
                  options={statType}
                  placeholder="Select Stat Type"
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
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Upload icon" isRequired />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <ImageUploadCard
                  field="stat_icon"
                  formData={formData}
                  setFormData={setFormData}
                  handleImageUpload={handleImageUpload}
                />
              </Grid>
            </>
          )}

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

export default memo(StatForm);
