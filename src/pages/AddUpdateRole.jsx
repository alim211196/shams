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
import CustomTextField from "../common/CustomTextField";
import CustomLabel from "../common/CustomLabel";
import PermissionBox from "../common/PermissionBox";
import CustomButton from "../common/CustomButton";
import { getAllPermissionsService } from "../services/permissionService";
import {
  createRoleService,
  getByIdRoleService,
  UpdateRoleService,
} from "../services/roleService";
import { useSelector } from "react-redux";
import { hasPermission } from "../utils/permissionHelper";

const AddUpdateRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [loading, setLoading] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    isEditing ? "edit_staff_role" : "add_staff_role"
  );

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await getAllPermissionsService();
        if (response?.result) {
          setPermissions(Array.isArray(response.result) ? response.result : []);
        } else {
          setPermissions([]);
        }
      } catch (error) {
        toast.error("Failed to load permissions");
        setPermissions([]);
      } finally {
      }
    };

    const fetchRoleData = async () => {
      try {
        const response = await getByIdRoleService(id);
        const data = response?.data?.result;
        if (data) {
          setRoleName(data?.role?.name || "");
          const permissionIds =
            data?.role?.permissions?.map((perm) => perm) || [];
          setSelectedPermissions(permissionIds);
        }
      } catch (error) {
        console.log("Error fetching role:", error);
      }
    };

    fetchPermissions();
    if (isEditing) {
      fetchRoleData();
    }
  }, [isEditing, id]);

  const breadcrumbs = [
    <Typography key="1" sx={{ fontSize: "13px" }}>
      Staff Management
    </Typography>,
    <Link
      style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
      key="2"
      to="/admin/staff-management/role"
    >
      Roles
    </Link>,
    <Typography key="3" sx={{ fontSize: "13px" }}>
      {isEditing ? "Edit Role" : "Create Role"}
    </Typography>,
  ];

  // Toggle permission selection
  const handleToggle = (permissionId) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const roleData = {
      name: roleName,
      permissions: selectedPermissions,
    };
    setLoading(true);
    try {
      let response;
      if (id) {
        response = await UpdateRoleService(id, roleData);
        toast.success("Role updated successfully!");
      } else {
        response = await createRoleService(roleData);
        toast.success("Role created successfully!");
      }
      if (response?.status === 200) {
        navigate("/admin/staff-management/role");
      } else {
        toast.error(response?.data?.message || "Failed to create role.");
      }
    } catch (error) {
      toast.error("Error creating role. Please try again.");
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
                {isEditing ? "Update Role" : "Create Role"}
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
          <Box sx={{ p: 2 }}>
            <Typography>{roleName} Role Information</Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <CustomLabel label="Name" isRequired />
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                  <CustomTextField
                    name="name"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    placeholder="Enter role name"
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ py: 2 }}>
                    <Typography>Permissions</Typography>
                  </Box>
                  <Divider />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <PermissionBox
                    permissions={permissions}
                    handleToggle={handleToggle}
                    selectedPermissions={selectedPermissions}
                  />
                </Grid>
                <Grid
                  size={{ xs: 12 }}
                  display="flex"
                  justifyContent="flex-end"
                >
                  <CustomButton
                    type="submit"
                    color="primary"
                    loading={loading}
                    disabled={!checkPermission}
                  >
                    {isEditing ? "Update Role" : "Create Role"}
                  </CustomButton>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddUpdateRole;
