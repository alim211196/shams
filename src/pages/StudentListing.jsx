import { useEffect, useState, useMemo } from "react";
import {
  getStudentService,
  updateStudentStatus,
  deleteStudentServiceById,
} from "../services/studentService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, FormControlLabel, useMediaQuery, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/slices/deleteModalSlice";
import DeleteConfirmationModal from "../features/DeleteConfirmationModal";
import { CustomSwitch } from "../layouts/helper";
import { useTheme } from "@mui/material/styles";
import CustomFloatButton from "../common/CustomFloatButton";
import CustomMaterialTable from "../common/CustomMaterialTable";
import { handleExportRows } from "../utils/exportCsv";
import { hasPermission } from "../utils/permissionHelper";
import TableTypography from "../common/TableTypography";

const StudentListing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userPermissions } = useSelector((state) => state.user);
  const fetchStudents = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getStudentService(pageIndex + 1, pageSize);
      if (response?.data?.result?.data) {
        setStudents(
          Array.isArray(response.data.result.data)
            ? response.data.result.data
            : []
        );
        setRowCount(response.data.result.totalRecords || 0);
      } else {
        setStudents([]);
        setRowCount(0);
      }
    } catch (error) {
      toast.error("Failed to fetch students");
      setStudents([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (id) => {
    navigate(`/admin/student/${id}`);
  };

  const handleView = (id) => {
    navigate(`/admin/student/view/${id}`);
  };

  const handleAdd = () => {
    navigate("/admin/student");
  };

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this student?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteStudentServiceById(id);
      toast.success("Student deleted successfully");
      fetchStudents(pagination.pageIndex, pagination.pageSize);
    } catch {
      toast.error("Failed to delete student");
    }
  };

  const handleChangeStatus = async (id, status) => {
    try {
      await updateStudentStatus(id, status === true ? false : true);
      toast.success("Status updated successfully");
      fetchStudents(pagination.pageIndex, pagination.pageSize);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const exportStudents = async () => {
    await handleExportRows(getStudentService, "students", {
      name: "Name",
      email: "Email",
      phone: "Phone",
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
              src={row.original?.profile_img}
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
        size: 120,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 120,
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
                  !hasPermission(userPermissions, "toggle_active_student")
                }
                onChange={() => {
                  if (hasPermission(userPermissions, "toggle_active_student")) {
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
        data={students}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Student"}
        tableTitle={"Students"}
        btnText={"Add Student"}
        handleExportRows={exportStudents}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleView={handleView}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_student"}
        editPermission={"edit_student"}
        deletePermission={"delete_student"}
        viewPermission={"view_student"}
        exportPermission={"export_all_students"}
      />
      <DeleteConfirmationModal />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};

export default StudentListing;
