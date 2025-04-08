import React, { memo, useMemo } from "react";
import { Paper, Grid } from "@mui/material";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import CustomLabel from "../../common/CustomLabel";
import CustomSelect from "../../common/CustomSelect";
import ImageUploadCard from "../../common/ImageUploadCard";
import CustomButton from "../../common/CustomButton";
import {
  ratingOptions,
  statusBooleanOptions,
  userType,
} from "../../utils/helper";

const TestimonialForm = ({
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
                <CustomLabel label="Designation" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomTextField
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder={hideInArabicFields ? "Designation" : ""}
                  lang={lang}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Company" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomTextField
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={hideInArabicFields ? "Company" : ""}
                  lang={lang}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Rating" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomSelect
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  options={ratingOptions}
                  placeholder="Select Rating"
                  required
                />
              </Grid>
            </>
          )}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Message" isRequired>
              <TranslateButton />
            </CustomLabel>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={hideInArabicFields ? "Message" : ""}
              required
              multiline
              minRows={5}
              lang={lang}
            />
          </Grid>
          {hideInArabicFields && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="User Type" isRequired />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomSelect
                  name="user_type"
                  value={formData.user_type}
                  onChange={handleChange}
                  options={userType}
                  placeholder="Select user type"
                  required
                />
              </Grid>
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

          {hideInArabicFields && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Upload Image" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <ImageUploadCard
                  field="profile_img"
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

export default memo(TestimonialForm);
