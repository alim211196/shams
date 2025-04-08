import { useEffect, useState, useMemo } from "react";
import {
  deleteFaqServiceById,
  getAllFaqsService,
  getFaqsService,
  updateFaqFeatured,
  updateFaqStatus,
} from "../services/faqsService";
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
const FaqsListing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userPermissions } = useSelector((state) => state.user);
  const fetchFaqs = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getFaqsService(pageIndex + 1, pageSize);
      if (response?.result?.data) {
        setFaqs(
          Array.isArray(response.result.data) ? response.result.data : []
        );
        setRowCount(response.result.totalRecords || 0);
      } else {
        setFaqs([]);
        setRowCount(0);
      }
    } catch (error) {
      setFaqs([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (tid) => {
    navigate(`/admin/faqs/faq/${tid}`);
  };

  const handleAdd = () => {
    navigate("/admin/faqs/faq");
  };

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this faq?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      const response = await deleteFaqServiceById(id);
      if (response.status === 200) {
        toast.success("Faq deleted successfully!");
        fetchFaqs(pagination.pageIndex, pagination.pageSize);
      } else {
        toast.error("Failed to delete faq!");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the faq.");
    }
  };

  const handleChangeStatus = async (id, status) => {
    const newStatus = status === true ? false : true;
    try {
      await updateFaqStatus(id, newStatus);
      toast.success("Faq status updated successfully");
      fetchFaqs(pagination.pageIndex, pagination.pageSize);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleChangeFeatured = async (id, featured) => {
    const newStatus = featured === true ? false : true;
    try {
      await updateFaqFeatured(id, newStatus);
      toast.success("Faq status updated successfully");
      fetchFaqs(pagination.pageIndex, pagination.pageSize);
    } catch (error) {
      console.error("Error updating featured:", error);
    }
  };

  const exportFaqs = async () => {
    await handleExportRows(getAllFaqsService, "faqs", {
      "category_id.name": "Category",
      title: "Title",
      description: "Description",
      status: "Status", // Boolean check
      is_featured: "Is_Featured", // Boolean check
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
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "title",
        header: "Title",
        size: 200,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 300,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "is_featured",
        header: "Featured",
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
                  !hasPermission(userPermissions, "toggle_featured_faq")
                }
                onChange={() => {
                  if (hasPermission(userPermissions, "toggle_featured_faq")) {
                    handleChangeFeatured(row.original._id, renderedCellValue);
                  }
                }}
              />
            }
            label=""
          />
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
                  !hasPermission(userPermissions, "toggle_active_faq")
                }
                onChange={() => {
                  if (hasPermission(userPermissions, "toggle_active_faq")) {
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
        data={faqs}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Faq"}
        tableTitle={"Faqs"}
        btnText={"Add Faq"}
        handleExportRows={exportFaqs}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_faq"}
        editPermission={"edit_faq"}
        deletePermission={"delete_faq"}
        exportPermission={"export_all_faqs"}
      />
      <DeleteConfirmationModal />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};
export default FaqsListing;
