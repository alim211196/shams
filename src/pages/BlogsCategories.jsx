import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  FormControlLabel,
  useMediaQuery,
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
import {
  deleteBlogCategoryServiceById,
  getAllBlogCategoryService,
  getPaginatedBlogCategoryService,
  updateBlogCategoryStatus,
} from "../services/blogCategoryService";

const BlogsCategories = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [blogCategory, setBlogCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userPermissions } = useSelector((state) => state.user);
  const fetchBlogCategory = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getPaginatedBlogCategoryService(
        pageIndex + 1,
        pageSize
      );
      if (response?.result?.data) {
        setBlogCategory(
          Array.isArray(response.result.data) ? response.result.data : []
        );
        setRowCount(response.result.totalRecords || 0);
      } else {
        setBlogCategory([]);
        setRowCount(0);
      }
    } catch (error) {
      setBlogCategory([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogCategory(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (tid) => {
    navigate(`/admin/blogs/category/${tid}`);
  };

  const handleAdd = () => {
    navigate("/admin/blogs/category");
  };

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this blog category?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      const response = await deleteBlogCategoryServiceById(id);
      if (response.status === 200) {
        toast.success("Blog category deleted successfully!");
        fetchBlogCategory(pagination.pageIndex, pagination.pageSize);
      } else {
        toast.error("Failed to delete blog category!");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the blog category.");
    }
  };

  const handleChangeStatus = async (id, status) => {
    const newStatus = status === true ? false : true;
    try {
      await updateBlogCategoryStatus(id, newStatus);
      toast.success("Blog category status updated successfully");
      fetchBlogCategory(pagination.pageIndex, pagination.pageSize);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const exportBlogCategories = async () => {
    await handleExportRows(getAllBlogCategoryService, "blog_category", {
      name: "Category Name",
      status: "Status",
      created_at: "Created Date",
      updated_at: "Updated Date",
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Category Name",
        size: 180,
        Cell: ({ renderedCellValue }) => (
          <Typography variant="caption">{renderedCellValue}</Typography>
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
                  !hasPermission(userPermissions, "toggle_active_post_category")
                }
                onChange={() => {
                  if (
                    hasPermission(
                      userPermissions,
                      "toggle_active_post_category"
                    )
                  ) {
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
        data={blogCategory}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Blog Category"}
        tableTitle={"Blogs Category"}
        btnText={"Add Category"}
        handleExportRows={exportBlogCategories}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_post_category"}
        editPermission={"edit_post_category"}
        deletePermission={"delete_post_category"}
        exportPermission={"export_all_post_categories"}
      />
      <DeleteConfirmationModal />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};

export default BlogsCategories;
