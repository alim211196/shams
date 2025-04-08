import { useEffect, useState, useMemo } from "react";
import {
  getCourseService,
  updateCourseStatus,
  deleteCourseServiceById,
} from "../services/courseService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import {
  Box,
  Typography,
  FormControlLabel,
  useMediaQuery,
  Avatar,
} from "@mui/material";
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

const CourseListing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userPermissions } = useSelector((state) => state.user);
  const fetchCourses = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getCourseService(pageIndex + 1, pageSize);
      if (response?.data?.result?.data) {
        setCourses(
          Array.isArray(response.data.result.data)
            ? response.data.result.data
            : []
        );
        setRowCount(response.data.result.totalRecords || 0);
      } else {
        setCourses([]);
        setRowCount(0);
      }
    } catch (error) {
      toast.error("Failed to fetch courses");
      setCourses([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (id) => {
    navigate(`/admin/course/${id}`);
  };

  const handleAdd = () => {
    navigate("/admin/course");
  };

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this course?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteCourseServiceById(id);
      toast.success("Course deleted successfully");
      fetchCourses(pagination.pageIndex, pagination.pageSize);
    } catch {
      toast.error("Failed to delete course");
    }
  };

  const handleChangeStatus = async (id, status) => {
    try {
      await updateCourseStatus(id, { status: status === true ? "0" : "1" });
      toast.success("Status updated successfully");
      fetchCourses(pagination.pageIndex, pagination.pageSize);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const exportCourses = async () => {
    await handleExportRows(getCourseService, "courses", {
      title: "Title",
      description: "Description",
      difficulty: "Difficulty",
      "category_id.name": "Category",
      discount: "Discount",
      duration: "Duration",
      price: "Price",
      session_type: "Session Type",
      trending: "Trending",
      status: "Status",
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 140,
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
        accessorKey: "description",
        header: "Description",
        size: 120,
        Cell: ({ renderedCellValue }) => (
          <Typography variant="caption">{parse(renderedCellValue)}</Typography>
        ),
      },
      {
        accessorKey: "difficulty",
        header: "Difficulty",
        size: 120,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "category_id.name",
        header: "Category",
        size: 120,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "discount",
        header: "Discount",
        size: 120,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "duration",
        header: "Duration",
        size: 120,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 120,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "session_type",
        header: "Session Type",
        size: 120,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "trending",
        header: "Trending",
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
                checked={renderedCellValue === "1"}
                disabled={
                  !userPermissions.length ||
                  !hasPermission(userPermissions, "toggle_active_course")
                }
                onChange={() => {
                  if (hasPermission(userPermissions, "toggle_active_course")) {
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
        data={courses}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Course"}
        tableTitle={"Courses"}
        btnText={"Add Course"}
        handleExportRows={exportCourses}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_course"}
        editPermission={"edit_course"}
        deletePermission={"delete_course"}
      />

      <DeleteConfirmationModal />
      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};

export default CourseListing;
