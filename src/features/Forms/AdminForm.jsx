/* eslint-disable react/prop-types */
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Paper, Grid } from "@mui/material";
import { getAllRolesService } from "../../services/roleService";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import CustomLabel from "../../common/CustomLabel";
import CustomSelect from "../../common/CustomSelect";
import CustomButton from "../../common/CustomButton";
import { statusBooleanOptions } from "../../utils/helper";
import CustomPasswordField from "../../common/CustomPasswordField";
import ImageUploadCard from "../../common/ImageUploadCard";

const AdminForm = ({
  formData,
  setFormData,
  handleSubmit,
  loading,
  lang,
  activeLang = "en",
}) => {
  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);
  const [roles, setRoles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchRoles = useCallback(async () => {
    try {
      const response = await getAllRolesService();
      setRoles(response?.result?.data || []);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

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
                  placeholder={hideInArabicFields ? "Email" : ""}
                  lang={lang}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Password" />
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
                  value={formData.phone}
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
                <CustomLabel label="Role" isRequired />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomSelect
                  name="role_id"
                  value={formData.role_id}
                  onChange={handleChange}
                  options={
                    Array.isArray(roles) &&
                    roles?.map((cat) => ({
                      value: cat._id,
                      label: cat.name,
                    }))
                  }
                  placeholder="Select Role"
                  required
                />
              </Grid>
            </>
          )}

          {hideInArabicFields && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Image" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <ImageUploadCard
                  field="image"
                  formData={formData}
                  setFormData={setFormData}
                  handleImageUpload={handleImageUpload}
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

export default memo(AdminForm);
