import { useEffect, useState, useMemo } from "react";
import {
  getInstructorService,
  updateInstructorStatus,
  deleteInstructorServiceById,
} from "../services/instructorService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useMediaQuery, Avatar, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/slices/deleteModalSlice";
import DeleteConfirmationModal from "../features/DeleteConfirmationModal";
import { useTheme } from "@mui/material/styles";
import CustomFloatButton from "../common/CustomFloatButton";
import CustomMaterialTable from "../common/CustomMaterialTable";
import { handleExportRows } from "../utils/exportCsv";
import { hasPermission } from "../utils/permissionHelper";
import TableTypography from "../common/TableTypography";

const InstructorListing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userPermissions } = useSelector((state) => state.user);
  const fetchInstructors = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getInstructorService(pageIndex + 1, pageSize);
      if (response?.data?.result?.data) {
        setInstructors(
          Array.isArray(response.data.result.data)
            ? response.data.result.data
            : []
        );
        setRowCount(response.data.result.totalRecords || 0);
      } else {
        setInstructors([]);
        setRowCount(0);
      }
    } catch (error) {
      toast.error("Failed to fetch instructors");
      setInstructors([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (id) => {
    navigate(`/admin/instructor/${id}`);
  };

  const handleAdd = () => {
    navigate("/admin/instructor");
  };

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this instructor?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteInstructorServiceById(id);
      toast.success("Instructor deleted successfully");
      fetchInstructors(pagination.pageIndex, pagination.pageSize);
    } catch {
      toast.error("Failed to delete instructor");
    }
  };

  const handleChangeStatus = async (id, status) => {
    try {
      await updateInstructorStatus(id, status);
      toast.success("Status updated successfully");
      fetchInstructors(pagination.pageIndex, pagination.pageSize);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const exportInstructors = async () => {
    await handleExportRows(getInstructorService(1, 1000), "instructors", {
      name: "Name",
      email: "Email",
      phone: "Phone",
      status: "Status",
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "fullName", // Virtual key, since the data does not contain a direct "fullName" field
        header: "Name",
        size: 180,
        Cell: ({ row }) => {
          const { fname, lname, profile_img } = row.original;
          const fullName = `${fname || ""} ${lname || ""}`.trim(); // Combine first and last name
          return (
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                src={profile_img?.base64}
                alt="Profile"
                sx={{ width: 40, height: 40 }}
              />
              <Typography variant="caption">{fullName || "N/A"}</Typography>
            </Box>
          );
        },
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
        accessorKey: "status",
        header: "Approval",
        size: 150,
        Cell: ({ row }) => {
          const trainer = row.original;

          // Function to determine status display
          const getStatusLabel = () => {
            switch (trainer.status) {
              case "approved":
                return (
                  <Typography variant="caption" color="success.main">
                    Approved
                  </Typography>
                );
              case "rejected":
                return (
                  <Typography variant="caption" color="error.main">
                    Rejected
                  </Typography>
                );
              case "under_review":
                return (
                  <Typography variant="caption" color="warning.main">
                    Under Review
                  </Typography>
                );
              case "pending":
              default:
                return (
                  <Typography variant="caption" color="info.main">
                    Pending
                  </Typography>
                );
            }
          };

          return trainer.status === "pending" ? (
            getStatusLabel()
          ) : trainer.status === "under_review" ? (
            <>
              <Button
                size="small"
                variant="contained"
                color="success"
                disabled={
                  !userPermissions.length ||
                  !hasPermission(userPermissions, "toggle_active_instructor")
                }
                onClick={() => {
                  if (
                    hasPermission(userPermissions, "toggle_active_instructor")
                  ) {
                    handleChangeStatus(trainer?._id, "approved");
                  }
                }}
              >
                Approve
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                disabled={
                  !userPermissions.length ||
                  !hasPermission(userPermissions, "toggle_active_instructor")
                }
                onClick={() => {
                  if (
                    hasPermission(userPermissions, "toggle_active_instructor")
                  ) {
                    handleChangeStatus(trainer?._id, "rejected");
                  }
                }}
                sx={{ marginLeft: 1 }}
              >
                Reject
              </Button>
            </>
          ) : (
            getStatusLabel()
          );
        },
      },
    ],
    []
  );

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <CustomMaterialTable
        data={instructors}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Instructor"}
        tableTitle={"Instructors"}
        btnText={"Add Instructor"}
        handleExportRows={exportInstructors}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_instructor"}
        editPermission={"edit_instructor"}
        deletePermission={"delete_instructor"}
        exportPermission={"export_all_instructors"}
      />
      <DeleteConfirmationModal />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};

export default InstructorListing;
