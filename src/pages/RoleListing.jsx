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
  deleteRoleService,
  getPaginatedRolesService,
  updateRoleStatusService,
} from "../services/roleService";
import { hasPermission } from "../utils/permissionHelper";
import TableTypography from "../common/TableTypography";
const RoleList = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userPermissions } = useSelector((state) => state.user);
  const fetchRoles = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getPaginatedRolesService(pageIndex + 1, pageSize);
      if (response?.result?.data) {
        setRoles(
          Array.isArray(response.result.data) ? response.result.data : []
        );
        setRowCount(response.result.totalRecords || 0);
      } else {
        setRoles([]);
        setRowCount(0);
      }
    } catch (error) {
      setRoles([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (id) =>
    navigate(`/admin/staff-management/role/edit/${id}`);
  const handleAdd = () => navigate("/admin/staff-management/role/create");

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this role?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteRoleService(id);
      toast.success("Role deleted successfully");
      setPagination((prev) => ({ ...prev }));
    } catch {
      toast.error("Failed to delete role");
    }
  };

  const handleChangeStatus = async (id, status) => {
    try {
      await updateRoleStatusService(id, status === true ? false : true);
      toast.success("Status updated successfully");
      setPagination((prev) => ({ ...prev }));
    } catch {
      toast.error("Failed to update status");
    }
  };

  const columns = useMemo(
    () => [
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
                  !hasPermission(userPermissions, "toggle_active_staff_role")
                }
                onChange={() => {
                  if (
                    hasPermission(userPermissions, "toggle_active_staff_role")
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
        data={roles}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Role"}
        tableTitle={"All Roles"}
        btnText={"Add New Role"}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_staff_role"}
        editPermission={"edit_staff_role"}
        deletePermission={"delete_staff_role"}
      />
      <DeleteConfirmationModal />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};
export default RoleList;
