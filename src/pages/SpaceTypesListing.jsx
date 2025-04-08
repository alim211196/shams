import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
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
import {
  deleteSpaceTypeServiceById,
  getAllSpaceTypesService,
  getPaginatedSpaceTypesService,
  updateSpaceTypeStatus,
} from "../services/spaceTypesService";
import SpaceTypeDialog from "../features/Dialogs/SpaceTypeDialog";

const SpaceTypesListing = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [spaceTypes, setSpaceTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedSpaceTypeId, setSelectedSpaceTypeId] = useState(null);
  const { userPermissions } = useSelector((state) => state.user);

  const fetchSpaceTypes = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getPaginatedSpaceTypesService(
        pageIndex + 1,
        pageSize
      );
      if (response?.result?.data) {
        setSpaceTypes(
          Array.isArray(response.result.data) ? response.result.data : []
        );
        setRowCount(response.result.totalRecords || 0);
      } else {
        setSpaceTypes([]);
        setRowCount(0);
      }
    } catch (error) {
      setSpaceTypes([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaceTypes(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (id) => {
    setSelectedSpaceTypeId(id);
    setEditMode(true);
    setOpen(true);
  };
  const handleAdd = () => {
    setEditMode(false);
    setSelectedSpaceTypeId(null);
    setOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this space type?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      const response = await deleteSpaceTypeServiceById(id);
      if (response.status === 200) {
        toast.success("space type deleted successfully!");
        fetchSpaceTypes(pagination.pageIndex, pagination.pageSize);
      } else {
        toast.error("Failed to delete space type!");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the space type.");
    }
  };

  const handleChangeStatus = async (id, status) => {
    const newStatus = status === true ? false : true;
    try {
      await updateSpaceTypeStatus(id, newStatus);
      toast.success("Space type status updated successfully");
      fetchSpaceTypes(pagination.pageIndex, pagination.pageSize);
    } catch (error) {
      console.log(error);
      console.error("Error updating status:", error);
    }
  };

  const exportSpaceTypes = async () => {
    await handleExportRows(getAllSpaceTypesService, "spaceTypes", {
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
                  !hasPermission(userPermissions, "toggle_active_space_type")
                }
                onChange={() => {
                  if (
                    hasPermission(userPermissions, "toggle_active_space_type")
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
        data={spaceTypes}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Space Type"}
        tableTitle={"Space Types"}
        btnText={"Add Space Type"}
        handleExportRows={exportSpaceTypes}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_space_type"}
        editPermission={"edit_space_type"}
        deletePermission={"delete_space_type"}
        exportPermission={"export_all_space_types"}
      />
      <DeleteConfirmationModal />
      <SpaceTypeDialog
        open={open}
        onClose={() => setOpen(false)}
        refresh={() =>
          fetchSpaceTypes(pagination.pageIndex, pagination.pageSize)
        }
        editMode={editMode}
        selectedSpaceTypeId={selectedSpaceTypeId}
      />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};

export default SpaceTypesListing;
