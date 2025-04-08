import React, { memo, useCallback, useEffect, useState } from "react";
import { Paper, Grid } from "@mui/material";
import CustomTextField from "../../common/CustomTextField";
import CustomLabel from "../../common/CustomLabel";
import CustomSelect from "../../common/CustomSelect";
import CustomButton from "../../common/CustomButton";
import { statusBooleanOptions } from "../../utils/helper";
import { getAllRolesService } from "../../services/roleService";
import CustomPasswordField from "../../common/CustomPasswordField";
import ImageUploadCard from "../../common/ImageUploadCard";

const StaffForm = ({
  formData,
  setFormData,
  handleSubmit,
  loading,
  checkPermission,
}) => {
  const [roles, setRoles] = useState([]);
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
  const fetchRoles = useCallback(async () => {
    try {
      const response = await getAllRolesService();
      setRoles(response?.result || []);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

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
            <CustomLabel label="Upload profile" isRequired />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <ImageUploadCard
              field="profile_img"
              formData={formData}
              setFormData={setFormData}
              handleImageUpload={handleImageUpload}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Name" isRequired />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={"Enter name"}
              required
            />
          </Grid>
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
            <CustomLabel label="Role" isRequired />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomSelect
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={roles.map((role) => ({
                value: role._id,
                label: role.name,
                status: role.status,
              }))}
              disableCondition={(option) => option.status === false}
              placeholder="Select Role"
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
              disabled={checkPermission}
            >
              Save
            </CustomButton>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default memo(StaffForm);
