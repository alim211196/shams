import { useEffect, useState, useMemo } from "react";
import {
  deleteBlogServiceById,
  getAllBlogsService,
  getBlogsService,
  updateBlogStatus,
} from "../services/blogsService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, Paper, FormControlLabel, useMediaQuery } from "@mui/material";
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

const BlogsListing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userPermissions } = useSelector((state) => state.user);
  const fetchBlogs = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getBlogsService(pageIndex + 1, pageSize);
      if (response?.result?.data) {
        setBlogs(
          Array.isArray(response.result.data) ? response.result.data : []
        );
        setRowCount(response.result.totalRecords || 0);
      } else {
        setBlogs([]);
        setRowCount(0);
      }
    } catch (error) {
      setBlogs([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (tid) => {
    navigate(`/admin/blogs/blog/${tid}`);
  };

  const handleAdd = () => {
    navigate("/admin/blogs/blog");
  };

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this blog?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      const response = await deleteBlogServiceById(id);
      if (response.status === 200) {
        toast.success("Blog deleted successfully!");
        fetchBlogs(pagination.pageIndex, pagination.pageSize);
      } else {
        toast.error("Failed to delete blog!");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the blog.");
    }
  };

  const handleChangeStatus = async (id, status) => {
    const newStatus = status === true ? false : true;
    try {
      await updateBlogStatus(id, newStatus);
      toast.success("Blog status updated successfully");
      fetchBlogs(pagination.pageIndex, pagination.pageSize);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const exportBlogs = async () => {
    await handleExportRows(getAllBlogsService, "blogs", {
      "category_id.name": "Category",
      title: "Title",
      slug: "Slug",
      short_description: "Short Description",
      status: "Status",
      created_at: "Created Date",
      updated_at: "Updated Date",
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "user_type",
        header: "User Type",
        size: 50,
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
        accessorKey: "title",
        header: "Title",
        size: 180,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },

      {
        accessorKey: "slug",
        header: "Slug",
        size: 120,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "short_description",
        header: "Short Description",
        size: 180,
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
                  !hasPermission(userPermissions, "toggle_active_post")
                }
                onChange={() => {
                  if (hasPermission(userPermissions, "toggle_active_post")) {
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
        data={blogs}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Blog"}
        tableTitle={"Blogs"}
        btnText={"Add Blog"}
        handleExportRows={exportBlogs}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_post"}
        editPermission={"edit_post"}
        deletePermission={"delete_post"}
        exportPermission={"export_all_posts"}
      />
      <DeleteConfirmationModal />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};

export default BlogsListing;
