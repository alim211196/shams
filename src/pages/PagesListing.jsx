import { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/slices/deleteModalSlice";
import DeleteConfirmationModal from "../features/DeleteConfirmationModal";
import { useTheme } from "@mui/material/styles";
import CustomFloatButton from "../common/CustomFloatButton";
import {
  deleteWebPageServiceById,
  getAllPaginatedPagesService,
} from "../services/webPageService";
import CustomMaterialTable from "../common/CustomMaterialTable";
import TableTypography from "../common/TableTypography";
const PagesListing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchPages = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getAllPaginatedPagesService(
        pageIndex + 1,
        pageSize
      );
      if (response?.result?.data) {
        setPages(
          Array.isArray(response.result.data) ? response.result.data : []
        );
        setRowCount(response.result.totalRecords || 0);
      } else {
        setPages([]);
        setRowCount(0);
      }
    } catch (error) {
      setPages([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleViewSection = (id, link_id) => {
    navigate(`/admin/website/custom-pages/sections/${id}?page=${link_id}`);
  };

  const handleAdd = () => {
    navigate("/admin/website/custom-pages/create");
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
      const response = await deleteWebPageServiceById(id);
      if (response.statusText === "OK") {
        toast.success("Page deleted successfully!");
        fetchPages(pagination.pageIndex, pagination.pageSize);
      } else {
        toast.error("Failed to delete page!");
      }
    } catch (error) {
      console.error("Error deleting page:", error);
      toast.error("An error occurred while deleting the page.");
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Name",
        size: 200,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "slug",
        header: "URL",
        size: 300,
        Cell: ({ renderedCellValue }) => (
          <Typography variant="caption">
            {"http://localhost:3000/" + "" + renderedCellValue}
          </Typography>
        ),
      },
    ],
    []
  );

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <CustomMaterialTable
        data={pages}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        tableTitle={"Website Pages"}
        title={"Page"}
        btnText={"Add New Page"}
        handleAdd={handleAdd}
        handleEdit={handleViewSection}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_page"}
        viewSectionPermission={"view_sections"}
      />
      <DeleteConfirmationModal />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};

export default PagesListing;
