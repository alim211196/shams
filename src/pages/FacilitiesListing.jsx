import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
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
import {
  deleteFacilityServiceById,
  getAllFacilitiesService,
  getPaginatedFacilitiesService,
  updateFacilityStatus,
} from "../services/facilitiesService";
import { getS3ImageUrl } from "../utils/helper";

const FacilitiesListing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userPermissions } = useSelector((state) => state.user);
  const fetchFacilities = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getPaginatedFacilitiesService(
        pageIndex + 1,
        pageSize
      );
      if (response?.result?.data) {
        setFacilities(
          Array.isArray(response.result.data) ? response.result.data : []
        );
        setRowCount(response.result.totalRecords || 0);
      } else {
        setFacilities([]);
        setRowCount(0);
      }
    } catch (error) {
      setFacilities([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (tid) => {
    navigate(`/admin/facilities-management/facility/edit/${tid}`);
  };

  const handleAdd = () => {
    navigate("/admin/facilities-management/facility/create");
  };

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this facility?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      const response = await deleteFacilityServiceById(id);
      if (response.status === 200) {
        toast.success("Facility deleted successfully!");
        fetchFacilities(pagination.pageIndex, pagination.pageSize);
      } else {
        toast.error("Failed to delete facility!");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the facility.");
    }
  };

  const handleChangeStatus = async (id, status) => {
    const newStatus = status === true ? false : true;
    try {
      await updateFacilityStatus(id, newStatus);
      toast.success("Facility status updated successfully");
      fetchFacilities(pagination.pageIndex, pagination.pageSize);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const exportFacilities = async () => {
    await handleExportRows(getAllFacilitiesService, "facilities", {
      title: "Room Name",
      short_description: "Short Description",
      long_description: "Long Description",
      capacity: "Capacity",
      price: "Price",
      space_type: "Space Type",
      amenities: "Amenities",
      status: "Status",
      created_at: "Created Date",
      updated_at: "Updated Date",
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Room Name",
        size: 180,
        Cell: ({ renderedCellValue, row }) => (
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src={getS3ImageUrl("facility", row.original?.card_img)}
              alt="Icon"
              variant="square"
              sx={{ width: "100%", height: "80px" }}
            />
            <TableTypography value={renderedCellValue} />
          </Box>
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
        accessorKey: "long_description",
        header: "Long Description",
        size: 180,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },

      {
        accessorKey: "capacity",
        header: "Capacity",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 100,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "space_type",
        header: "Space Type",
        size: 100,
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
                  !hasPermission(userPermissions, "toggle_active_facility")
                }
                onChange={() => {
                  if (
                    hasPermission(userPermissions, "toggle_active_facility")
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
        data={facilities}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Facility"}
        tableTitle={"Facilities"}
        btnText={"Add Facility"}
        handleExportRows={exportFacilities}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_facility"}
        editPermission={"edit_facility"}
        deletePermission={"delete_facility"}
        exportPermission={"export_all_facilities"}
      />
      <DeleteConfirmationModal />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};

export default FacilitiesListing;
