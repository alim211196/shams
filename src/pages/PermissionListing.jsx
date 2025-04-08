import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, FormControlLabel, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/slices/deleteModalSlice";
import DeleteConfirmationModal from "../features/DeleteConfirmationModal";
import { CustomSwitch } from "../layouts/helper";
import { useTheme } from "@mui/material/styles";
import CustomFloatButton from "../common/CustomFloatButton";
import CustomMaterialTable from "../common/CustomMaterialTable";
import {
  deletePermissionService,
  getPaginatedPermissionsService,
  updatePermissionStatusService,
} from "../services/permissionService";
import PermissionsDialog from "../features/Dialogs/PermissionsDialog";
import { hasPermission } from "../utils/permissionHelper";
import TableTypography from "../common/TableTypography";
const PermissionListing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState(null);
  const { userPermissions } = useSelector((state) => state.user);
  const fetchPermissions = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getPaginatedPermissionsService(
        pageIndex + 1,
        pageSize
      );
      if (response?.result?.data) {
        setPermissions(
          Array.isArray(response.result.data) ? response.result.data : []
        );
        setRowCount(response.result.totalRecords || 0);
      } else {
        setPermissions([]);
        setRowCount(0);
      }
    } catch (error) {
      setPermissions([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (id) => {
    const permissionToEdit = permissions.find((p) => p._id === id);
    if (permissionToEdit) {
      setSelectedPermission(permissionToEdit);
      setEditMode(true);
      setOpen(true);
    }
  };
  const handleAdd = () => {
    setEditMode(false);
    setSelectedPermission(null);
    setOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this permission?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deletePermissionService(id);
      toast.success("Permission deleted successfully");
      setPagination((prev) => ({ ...prev }));
    } catch {
      toast.error("Failed to delete permission");
    }
  };

  const handleChangeStatus = async (id, status) => {
    try {
      await updatePermissionStatusService(id, status === true ? false : true);
      toast.success("Status updated successfully");
      setPagination((prev) => ({ ...prev }));
    } catch {
      toast.error("Failed to update status");
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "section",
        header: "Section",
        size: 140,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 180,
        Cell: ({ renderedCellValue, row }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 80,
        Cell: ({ renderedCellValue, row }) => (
          <FormControlLabel
            control={
              <CustomSwitch
                sx={{ m: 1 }}
                id={`switch-${row.original._id}`}
                checked={renderedCellValue === true}
                disabled={
                  !userPermissions.length ||
                  !hasPermission(userPermissions, "toggle_active_permission")
                }
                onChange={() => {
                  if (
                    hasPermission(userPermissions, "toggle_active_permission")
                  ) {
                    handleChangeStatus(row.original._id, renderedCellValue);
                  }
                }}
              />
            }
            label=""
          />
        ),
      },
    ],
    []
  );

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <CustomMaterialTable
        data={permissions}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Permission"}
        tableTitle={"All Permissions"}
        btnText={"Add New Permission"}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_permission"}
        deletePermission={"delete_permission"}
      />
      <DeleteConfirmationModal />
      <PermissionsDialog
        open={open}
        onClose={() => setOpen(false)}
        refresh={() =>
          fetchPermissions(pagination.pageIndex, pagination.pageSize)
        }
        editMode={editMode}
        existingPermission={selectedPermission}
      />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};
export default PermissionListing;
