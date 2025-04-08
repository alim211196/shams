import { useEffect, useState, useMemo } from "react";
import {
  getCategoryService,
  updateCategoryStatus,
  deleteCategoryServiceById,
} from "../services/categoryService";
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
import { handleExportRows } from "../utils/exportCsv";
import { hasPermission } from "../utils/permissionHelper";
import TableTypography from "../common/TableTypography";

const CategoryListing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userPermissions } = useSelector((state) => state.user);
  const fetchCategories = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getCategoryService(pageIndex + 1, pageSize);
      if (response?.data?.result?.data) {
        setCategories(
          Array.isArray(response.data.result.data)
            ? response.data.result.data
            : []
        );
        setRowCount(response.data.result.totalRecords || 0);
      } else {
        setCategories([]);
        setRowCount(0);
      }
    } catch (error) {
      toast.error("Failed to fetch Categories");
      setCategories([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (id) => {
    navigate(`/admin/category/${id}`);
  };

  const handleAdd = () => {
    navigate("/admin/category");
  };

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this category?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteCategoryServiceById(id);
      toast.success("Category deleted successfully");
      fetchCategories(pagination.pageIndex, pagination.pageSize);
    } catch {
      toast.error("Failed to delete category");
    }
  };

  const handleChangeStatus = async (id, status) => {
    try {
      await updateCategoryStatus(id, status === true ? false : true);
      toast.success("Status updated successfully");
      fetchCategories(pagination.pageIndex, pagination.pageSize);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const exportCategories = async () => {
    await handleExportRows(getCategoryService, "categories", {
      name: "Name",
      status: "Status",
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
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
                  !hasPermission(userPermissions, "toggle_active_category")
                }
                onChange={() => {
                  if (
                    hasPermission(userPermissions, "toggle_active_category")
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
        data={categories}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Category"}
        tableTitle={"Categories"}
        btnText={"Add Category"}
        handleExportRows={exportCategories}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_category"}
        editPermission={"edit_category"}
        deletePermission={"delete_category"}
        exportPermission={"export_all_categories"}
      />
      <DeleteConfirmationModal />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};

export default CategoryListing;
