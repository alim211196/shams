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
import { handleExportRows } from "../utils/exportCsv";
import { hasPermission } from "../utils/permissionHelper";
import {
  deleteFaqCategoryServiceById,
  getAllFaqCategoryService,
  getPaginatedFaqCategoryService,
  updateFaqCategoryStatus,
} from "../services/faqCategoryService";
import TableTypography from "../common/TableTypography";

const FaqsCategories = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [faqCategory, setFaqCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userPermissions } = useSelector((state) => state.user);
  const fetchFaqCategory = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getPaginatedFaqCategoryService(
        pageIndex + 1,
        pageSize
      );
      if (response?.result?.data) {
        setFaqCategory(
          Array.isArray(response.result.data) ? response.result.data : []
        );
        setRowCount(response.result.totalRecords || 0);
      } else {
        setFaqCategory([]);
        setRowCount(0);
      }
    } catch (error) {
      setFaqCategory([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqCategory(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (tid) => {
    navigate(`/admin/faqs/category/${tid}`);
  };

  const handleAdd = () => {
    navigate("/admin/faqs/category");
  };

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this faq category?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      const response = await deleteFaqCategoryServiceById(id);
      if (response.statusText === "OK") {
        toast.success("Faq category deleted successfully!");
        fetchFaqCategory(pagination.pageIndex, pagination.pageSize);
      } else {
        toast.error("Failed to delete faq category!");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the faq category.");
    }
  };

  const handleChangeStatus = async (id, status) => {
    const newStatus = status === true ? false : true;
    try {
      await updateFaqCategoryStatus(id, newStatus);
      toast.success("Faq category status updated successfully");
      fetchFaqCategory(pagination.pageIndex, pagination.pageSize);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const exportFaqCategories = async () => {
    await handleExportRows(getAllFaqCategoryService, "faq_category", {
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
                  !hasPermission(userPermissions, "toggle_active_faq_category")
                }
                onChange={() => {
                  if (
                    hasPermission(userPermissions, "toggle_active_faq_category")
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
        data={faqCategory}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Faq Category"}
        tableTitle={"Faqs Category"}
        btnText={"Add Category"}
        handleExportRows={exportFaqCategories}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_faq_category"}
        editPermission={"edit_faq_category"}
        deletePermission={"delete_faq_category"}
        exportPermission={"export_all_faq_categories"}
      />
      <DeleteConfirmationModal />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};

export default FaqsCategories;
