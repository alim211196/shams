import { useEffect, useState, useMemo } from "react";
import {
  deleteTestimonialServiceById,
  getAllTestimonialService,
  getTestimonialService,
  updateTestimonialStatus,
} from "../services/testimonialService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getS3ImageUrl, RatingStars } from "../utils/helper";
import { Box, FormControlLabel, Avatar, useMediaQuery } from "@mui/material";
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
const TestimonialListing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userPermissions } = useSelector((state) => state.user);
  const fetchTestimonials = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getTestimonialService(pageIndex + 1, pageSize);
      if (response?.result?.data) {
        setTestimonials(
          Array.isArray(response.result.data) ? response.result.data : []
        );
        setRowCount(response.result.totalRecords || 0);
      } else {
        setTestimonials([]);
        setRowCount(0);
      }
    } catch (error) {
      setTestimonials([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (id) => navigate(`/admin/settings/testimonial/${id}`);
  const handleAdd = () => navigate("/admin/settings/testimonial");

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this testimonial?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteTestimonialServiceById(id);
      toast.success("Testimonial deleted successfully");
      setPagination((prev) => ({ ...prev }));
    } catch {
      toast.error("Failed to delete testimonial");
    }
  };

  const handleChangeStatus = async (id, status) => {
    try {
      await updateTestimonialStatus(id, status === true ? false : true);
      toast.success("Status updated successfully");
      setPagination((prev) => ({ ...prev }));
    } catch {
      toast.error("Failed to update status");
    }
  };

  const exportTestimonials = async () => {
    await handleExportRows(getAllTestimonialService, "testimonials", {
      name: "Name",
      designation: "Designation",
      company: "Company",
      message: "Message",
      rating: "Rating",
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
              src={getS3ImageUrl("testimonial", row.original?.profile_img)}
              alt="Profile"
              sx={{ width: 40, height: 40 }}
            />
            <TableTypography value={renderedCellValue} />
          </Box>
        ),
      },
      {
        accessorKey: "user_type",
        header: "User Type",
        size: 50,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "designation",
        header: "Designation",
        size: 140,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "company",
        header: "Company",
        size: 140,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "message",
        header: "Message",
        size: 280,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "rating",
        header: "Rating",
        size: 130,
        Cell: ({ renderedCellValue, row }) => (
          <Box>
            {renderedCellValue ? (
              <RatingStars rating={renderedCellValue} />
            ) : (
              "N/A"
            )}
          </Box>
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
                  !hasPermission(userPermissions, "toggle_active_testimonial")
                }
                onChange={() => {
                  if (
                    hasPermission(userPermissions, "toggle_active_testimonial")
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
        data={testimonials}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Testimonial"}
        tableTitle={"Testimonials"}
        btnText={"Add Testimonial"}
        handleExportRows={exportTestimonials}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_testimonial"}
        editPermission={"edit_testimonial"}
        deletePermission={"delete_testimonial"}
        exportPermission={"export_all_testimonials"}
      />
      <DeleteConfirmationModal />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};
export default TestimonialListing;
