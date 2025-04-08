import { useEffect, useState, useMemo } from "react";
import {
  getAdminService,
  updateAdminStatus,
  deleteAdminServiceId,
} from "../services/adminService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, FormControlLabel, useMediaQuery, Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/slices/deleteModalSlice";
import DeleteConfirmationModal from "../features/DeleteConfirmationModal";
import { CustomSwitch } from "../layouts/helper";
import { useTheme } from "@mui/material/styles";
import CustomFloatButton from "../common/CustomFloatButton";
import CustomMaterialTable from "../common/CustomMaterialTable";
import { handleExportRows } from "../utils/exportCsv";
import TableTypography from "../common/TableTypography";

const AdminListing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchAdmins = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getAdminService(pageIndex + 1, pageSize);
      if (response?.data?.result?.data) {
        setAdmins(
          Array.isArray(response.data.result.data)
            ? response.data.result.data
            : []
        );
        setRowCount(response.data.result.totalRecords || 0);
      } else {
        setAdmins([]);
        setRowCount(0);
      }
    } catch (error) {
      toast.error("Failed to fetch admins");
      setAdmins([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (id) => {
    navigate(`/admin/settings/admin/${id}`);
  };

  const handleAdd = () => {
    navigate("/admin/settings/admin");
  };

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this admin?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteAdminServiceId(id);
      toast.success("Admin deleted successfully");
      fetchAdmins(pagination.pageIndex, pagination.pageSize);
    } catch {
      toast.error("Failed to delete admin");
    }
  };

  const handleChangeStatus = async (id, status) => {
    try {
      await updateAdminStatus(id, status === "1" ? "0" : "1");
      toast.success("Status updated successfully");
      fetchAdmins(pagination.pageIndex, pagination.pageSize);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const exportAdmins = async () => {
    await handleExportRows(getAdminService, "admins", {
      name: "Name",
      email: "Email",
      phone: "Phone",
      "role_id.name": "Admin Role",
      status: "Status",
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
              src={row.original?.profile_img?.base64}
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
        accessorKey: "phone",
        header: "Phone",
        size: 140,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "role_id.name",
        header: "Admin Role",
        size: 300,
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
                checked={renderedCellValue === "1"}
                onChange={() =>
                  handleChangeStatus(row.original._id, renderedCellValue)
                }
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
        data={admins}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Admin"}
        tableTitle={"Admins"}
        btnText={"Add Admin"}
        handleExportRows={exportAdmins}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isMobile={isMobile}
      />
      <DeleteConfirmationModal />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};

export default AdminListing;
