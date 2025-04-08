import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Stack,
  Typography,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import CustomTextField from "../../common/CustomTextField";
import {
  createPermissionService,
  UpdatePermissionService,
} from "../../services/permissionService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { hasPermission } from "../../utils/permissionHelper";

const PermissionsDialog = ({
  open,
  onClose,
  refresh,
  editMode = false,
  existingPermission = null,
}) => {
  const [section, setSection] = useState("");
  const [permissions, setPermissions] = useState([""]);
  const [loading, setLoading] = useState(false);

  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(userPermissions, "add_permission");

  useEffect(() => {
    if (editMode && existingPermission) {
      setSection(existingPermission.section);
      setPermissions([existingPermission.name]);
    } else {
      setSection("");
      setPermissions([""]);
    }
  }, [editMode, existingPermission]);

  const formatPermissionName = (value) => {
    return value
      .toLowerCase()
      .replace(/\s+/g, "_") // Replace spaces with underscores
      .replace(/[^a-z_]/g, ""); // Remove any character that is not a lowercase letter or underscore
  };

  const handlePermissionChange = (index, value) => {
    const formattedValue = formatPermissionName(value);
    const updatedPermissions = [...permissions];
    updatedPermissions[index] = formattedValue;
    setPermissions(updatedPermissions);
  };

  const handleAddPermission = () => {
    setPermissions([...permissions, ""]);
  };

  const handleRemovePermission = (index) => {
    const updatedPermissions = permissions.filter((_, i) => i !== index);
    setPermissions(updatedPermissions);
  };

  const handleClose = () => {
    setSection("");
    setPermissions([""]);
    onClose();
  };

  const handleSave = async () => {
    if (!section || permissions.some((p) => !p)) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }
    setLoading(true);
    try {
      if (editMode) {
        const id = existingPermission?._id;
        const data = { section, name: permissions[0] };
        await UpdatePermissionService(id, data);
        toast.success("Permission updated successfully!");
      } else {
        const data = {
          permissions: permissions.map((name) => ({ section, name })),
        };
        await createPermissionService(data);
        toast.success("Permissions added successfully!");
      }

      refresh();
      handleClose();
    } catch (error) {
      console.error("Error saving permissions:", error);
      toast.error("Failed to save permissions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">
          {editMode ? "Edit Permission" : "Add Permissions"}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            color: "#757575",
            mb: 1,
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          Enter the section name to which these permissions will belong:
        </Typography>
        <CustomTextField
          label="Section Name"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          placeholder="Enter Section Name"
          required
          fullWidth
        />
        <Divider sx={{ my: 2, border: "none" }} />

        <Typography
          variant="body1"
          gutterBottom
          sx={{
            color: "#757575",
            mb: 1,
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          Add multiple permissions that belong to the section:
        </Typography>

        {permissions.map((perm, index) => (
          <Stack
            key={index}
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <CustomTextField
              name={`permission-${index}`}
              value={perm}
              onChange={(e) => handlePermissionChange(index, e.target.value)}
              placeholder="Permission Name"
              required
            />
            {index === 0 ? (
              <Button
                variant="text"
                color="primary"
                onClick={handleAddPermission}
                sx={{ border: "1px solid #f0f0f0" }}
              >
                Add
              </Button>
            ) : (
              <Button
                variant="text"
                color="error"
                onClick={() => handleRemovePermission(index)}
                sx={{ border: "1px solid #f0f0f0" }}
              >
                Remove
              </Button>
            )}
          </Stack>
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        {loading ? (
          <Button color="primary" variant="contained" disabled={loading}>
            <CircularProgress size={24} sx={{ color: "white" }} />
          </Button>
        ) : (
          <Button
            onClick={handleSave}
            color="primary"
            variant="contained"
            disabled={!checkPermission}
          >
            {editMode ? "Update" : "Save"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PermissionsDialog;
