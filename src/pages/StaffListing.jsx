import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, FormControlLabel, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/slices/deleteModalSlice";
import DeleteConfirmationModal from "../features/DeleteConfirmationModal";
import { CustomSwitch } from "../layouts/helper";
import { useTheme } from "@mui/material/styles";
import CustomFloatButton from "../common/CustomFloatButton";
import CustomMaterialTable from "../common/CustomMaterialTable";
import {
  deleteStaffService,
  getAllStaffService,
  getPaginatedStaffService,
  updateStaffStatusService,
} from "../services/staffService";
import { handleExportRows } from "../utils/exportCsv";
import { hasPermission } from "../utils/permissionHelper";
import TableTypography from "../common/TableTypography";
import { getS3ImageUrl } from "../utils/helper";
const StaffListing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [staff, SetStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userPermissions } = useSelector((state) => state.user);
  const fetchStaff = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getPaginatedStaffService(pageIndex + 1, pageSize);
      if (response?.result?.data) {
        SetStaff(
          Array.isArray(response.result.data) ? response.result.data : []
        );
        setRowCount(response.result.totalRecords || 0);
      } else {
        SetStaff([]);
        setRowCount(0);
      }
    } catch (error) {
      SetStaff([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (id) =>
    navigate(`/admin/staff-management/staff/edit/${id}`);
  const handleAdd = () => navigate("/admin/staff-management/staff/create");

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this staff?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteStaffService(id);
      toast.success("Staff deleted successfully");
      setPagination((prev) => ({ ...prev }));
    } catch {
      toast.error("Failed to delete staff");
    }
  };

  const handleChangeStatus = async (id, status) => {
    try {
      await updateStaffStatusService(id, status === true ? false : true);
      toast.success("Status updated successfully");
      setPagination((prev) => ({ ...prev }));
    } catch {
      toast.error("Failed to update status");
    }
  };

  const exportStaff = async () => {
    await handleExportRows(getAllStaffService, "staff", {
      name: "Name",
      email: "Email",
      "role.name": "Role",
      status: "Status",
      createdAt: "Created Date",
      updatedAt: "Updated Date",
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 180,
        Cell: ({ renderedCellValue, row }) => (
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src={getS3ImageUrl("staff", row.original?.profile_img)}
              alt="Profile"
              sx={{ width: 40, height: 40 }}
            />
            <TableTypography value={renderedCellValue} />
          </Box>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 140,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "role.name",
        header: "Roles",
        size: 140,
        Cell: ({ renderedCellValue }) => (
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
                  !hasPermission(userPermissions, "toggle_active_staff")
                }
                onChange={() => {
                  if (hasPermission(userPermissions, "toggle_active_staff")) {
                    handleChangeStatus(row.original._id, renderedCellValue);
                  }
                }}
              />
            }
          />
        ),
      },
    ],
    []
  );

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <CustomMaterialTable
        data={staff}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Staff"}
        tableTitle={"All Staff"}
        btnText={"Add New Staff"}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleExportRows={exportStaff}
        isMobile={isMobile}
        addPermission={"add_staff"}
        editPermission={"edit_staff"}
        deletePermission={"delete_staff"}
        exportPermission={"export_all_staffs"}
      />
      <DeleteConfirmationModal />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};
export default StaffListing;
