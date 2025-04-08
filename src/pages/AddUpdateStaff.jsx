import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import {
  createStaffService,
  getByIdStaffService,
  UpdateStaffService,
} from "../services/staffService";
import StaffForm from "../features/Forms/StaffForm";
import { hasPermission } from "../utils/permissionHelper";
import { useSelector } from "react-redux";
import { getS3ImageUrl } from "../utils/helper";

const AddUpdateStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    isEditing ? "edit_staff" : "add_staff"
  );
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    profile_img: null,
    profile_img_preview: null,
    status: true,
  });
  useEffect(() => {
    if (isEditing) {
      const fetchStaffData = async () => {
        try {
          const response = await getByIdStaffService(id);
          const data = response?.data?.result;
          if (data) {
            setFormData({
              name: data?.staff?.name || "",
              email: data?.staff?.email || "",
              password: data?.staff?.password || "",
              role: data?.staff?.role?._id || "",
              status: data?.staff?.status || true,
              profile_img: { name: data?.staff?.profile_img || null },
              profile_img_preview: data?.staff?.profile_img
                ? getS3ImageUrl("staff", data?.staff?.profile_img)
                : null,
            });
          }
        } catch (error) {
          console.log("Error fetching language:", error);
        }
      };

      fetchStaffData();
    }
  }, [isEditing]);

  const breadcrumbs = [
    <Typography key="1" sx={{ fontSize: "13px" }}>
      Staff Management
    </Typography>,
    <Link
      style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
      key="2"
      to="/admin/staff-management/staff"
    >
      Roles
    </Link>,
    <Typography key="3" sx={{ fontSize: "13px" }}>
      {isEditing ? "Edit Staff" : "Create Staff"}
    </Typography>,
  ];

  const handleSubmit = async (data) => {
    setLoading(true);
    // ✅ Create FormData
    const formDataToSend = new FormData();
    // ✅ Remove preview field
    const { profile_img_preview, ...filteredData } = data;

    // ✅ Append all text fields
    Object.keys(filteredData).forEach((key) => {
      if (key !== "profile_img") {
        formDataToSend.append(key, filteredData[key]);
      }
    });
    // ✅ Append new image if selected
    if (filteredData.profile_img && filteredData.profile_img instanceof File) {
      formDataToSend.append("profile_img", filteredData.profile_img);

      // ✅ If updating, append old image for deletion
      if (isEditing && formData?.profile_img) {
        formDataToSend.append("old_profile_img", formData.profile_img);
      }
    }
    try {
      let response;
      if (id) {
        response = await UpdateStaffService(id, formDataToSend);
      } else {
        response = await createStaffService(formDataToSend);
      }
      if (response?.status === 200) {
        toast.success("Form Submitted Successfully:");
        navigate("/admin/staff-management/staff");
      }
    } catch (error) {
      console.error("Error submitting language:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ padding: "0px !important" }}>
      <Paper elevation={3}>
        <Box sx={{ p: 2 }}>
          <Grid container alignItems="center" spacing={2}>
            {/* Title Section */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {isEditing ? "Update Staff" : "Create Staff"}
              </Typography>
            </Grid>

            {/* Breadcrumbs (Aligned Right on Larger Screens) */}
            <Grid size={{ xs: 12, md: 9 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "flex-start", md: "flex-end" },
                }}
              >
                <Breadcrumbs
                  separator={<NavigateNext fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  {breadcrumbs}
                </Breadcrumbs>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ px: 2, py: 1 }}>
          <Box sx={{ p: 2, gap: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Staff Information
            </Typography>

            <Typography variant="caption">
              {isEditing
                ? "Update staff details and manage role assignments."
                : "Create a new staff member and assign them to a role."}
            </Typography>
          </Box>
          <Divider />
          <StaffForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            loading={loading}
            checkPermission={!checkPermission}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default AddUpdateStaff;
