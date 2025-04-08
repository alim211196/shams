/* eslint-disable react/prop-types */
import { memo, useMemo } from "react";
import { Paper, Grid } from "@mui/material";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import CustomLabel from "../../common/CustomLabel";
import CustomSelect from "../../common/CustomSelect";
import CustomButton from "../../common/CustomButton";
import { statusOptions } from "../../utils/helper";
import ImageUploadCard from "../../common/ImageUploadCard";
import CustomPasswordField from "../../common/CustomPasswordField";

const InstructorForm = ({
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
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [field]: {
            name: file.name,
            size: file.size,
            type: file.type,
            base64: reader.result,
          },
        }));
      };
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: "0px !important" }}>
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
                <CustomLabel label="Email" isRequired />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomTextField
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={"Enter email"}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Password" isRequired />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomPasswordField
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={"Enter Password"}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Phone" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomTextField
                  name="phone"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={hideInArabicFields ? "Phone" : ""}
                  lang={lang}
                />
              </Grid>
            </>
          )}
          {hideInArabicFields && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Tutor Type" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomTextField
                  name="tutorType"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={"Enter Tutor Type"}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Licence" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomTextField
                  name="licence"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={"Enter Licence"}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="certification" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomTextField
                  name="certification"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={"Enter Certification"}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Expertise" isRequired />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomTextField
                  name="expertise"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={"Enter Expertise"}
                  required
                />
              </Grid>
            </>
          )}

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
                  options={statusOptions}
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

export default memo(InstructorForm);
