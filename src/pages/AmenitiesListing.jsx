import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { Box, FormControlLabel, useMediaQuery, Avatar } from "@mui/material";
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
  deleteAmenityServiceById,
  getAllAmenitiesService,
  getPaginatedAmenitiesService,
  updateAmenityStatus,
} from "../services/amenitiesService";
import { getS3ImageUrl } from "../utils/helper";
import AmenityDialog from "../features/Dialogs/AmenityDialog";

const AmenitiesListing = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedAmenityId, setSelectedAmenityId] = useState(null);
  const { userPermissions } = useSelector((state) => state.user);

  const fetchAmenities = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getPaginatedAmenitiesService(
        pageIndex + 1,
        pageSize
      );
      if (response?.result?.data) {
        setAmenities(
          Array.isArray(response.result.data) ? response.result.data : []
        );
        setRowCount(response.result.totalRecords || 0);
      } else {
        setAmenities([]);
        setRowCount(0);
      }
    } catch (error) {
      setAmenities([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmenities(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (id) => {
    setSelectedAmenityId(id);
    setEditMode(true);
    setOpen(true);
  };
  const handleAdd = () => {
    setEditMode(false);
    setSelectedAmenityId(null);
    setOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this amenity?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      const response = await deleteAmenityServiceById(id);
      if (response.status === 200) {
        toast.success("Amenity deleted successfully!");
        fetchAmenities(pagination.pageIndex, pagination.pageSize);
      } else {
        toast.error("Failed to delete amenity!");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the amenity.");
    }
  };

  const handleChangeStatus = async (id, status) => {
    const newStatus = status === true ? false : true;
    try {
      await updateAmenityStatus(id, newStatus);
      toast.success("Amenity status updated successfully");
      fetchAmenities(pagination.pageIndex, pagination.pageSize);
    } catch (error) {
      console.log(error);
      console.error("Error updating status:", error);
    }
  };

  const exportAmenities = async () => {
    await handleExportRows(getAllAmenitiesService, "amenities", {
      name: "Name",
      created_at: "Created Date",
      updated_at: "Updated Date",
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
              src={getS3ImageUrl("amenity", row.original?.icon_img)}
              alt="Icon"
              variant="square"
              sx={{ width: 24, height: "auto" }}
            />
            <TableTypography value={renderedCellValue} />
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
                  !hasPermission(userPermissions, "toggle_active_amenity")
                }
                onChange={() => {
                  if (hasPermission(userPermissions, "toggle_active_amenity")) {
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
        data={amenities}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Amenity"}
        tableTitle={"Amenities"}
        btnText={"Add Amenity"}
        handleExportRows={exportAmenities}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_amenity"}
        editPermission={"edit_amenity"}
        deletePermission={"delete_amenity"}
        exportPermission={"export_all_amenities"}
      />
      <DeleteConfirmationModal />
      <AmenityDialog
        open={open}
        onClose={() => setOpen(false)}
        refresh={() =>
          fetchAmenities(pagination.pageIndex, pagination.pageSize)
        }
        editMode={editMode}
        selectedAmenityId={selectedAmenityId}
      />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};

export default AmenitiesListing;
