import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  FormControlLabel,
  Avatar,
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
import {
  deleteStatServiceById,
  getAllStatService,
  getPaginatedStatService,
  updateStatStatus,
} from "../services/statService";
import { hasPermission } from "../utils/permissionHelper";
import TableTypography from "../common/TableTypography";
import { getS3ImageUrl } from "../utils/helper";
const StatsListing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userPermissions } = useSelector((state) => state.user);
  const fetchStats = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getPaginatedStatService(pageIndex + 1, pageSize);
      if (response?.result?.data) {
        setStats(
          Array.isArray(response.result.data) ? response.result.data : []
        );
        setRowCount(response.result.totalRecords || 0);
      } else {
        setStats([]);
        setRowCount(0);
      }
    } catch (error) {
      setStats([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (id) => navigate(`/admin/settings/stat/${id}`);
  const handleAdd = () => navigate("/admin/settings/stat");

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this stat?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteStatServiceById(id);
      toast.success("Stat deleted successfully");
      setPagination((prev) => ({ ...prev }));
    } catch {
      toast.error("Failed to delete stat");
    }
  };

  const handleChangeStatus = async (id, status) => {
    try {
      await updateStatStatus(id, status === true ? false : true);
      toast.success("Status updated successfully");
      setPagination((prev) => ({ ...prev }));
    } catch {
      toast.error("Failed to update status");
    }
  };

  const exportStats = async () => {
    await handleExportRows(getAllStatService, "stats", {
      stat_title: "Stat Title",
      stat_count: "Stat Count",
      stat_type: "Stat Type",
      status: "Status",
      createdAt: "Created Date",
      updatedAt: "Updated Date",
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "stat_title",
        header: "Stat Title",
        size: 180,
        Cell: ({ renderedCellValue, row }) => (
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src={getS3ImageUrl("stat", row.original?.stat_icon)}
              alt="Icon"
              variant="square"
              sx={{ width: 40, height: "auto" }}
            />
            <TableTypography value={renderedCellValue} />
          </Box>
        ),
      },
      {
        accessorKey: "stat_count",
        header: "Stat Count",
        size: 140,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "stat_type",
        header: "Stat Type",
        size: 140,
        Cell: ({ renderedCellValue }) => (
          <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
            {renderedCellValue}
          </Typography>
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
                  !hasPermission(userPermissions, "toggle_active_stat")
                }
                onChange={() => {
                  if (hasPermission(userPermissions, "toggle_active_stat")) {
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
        data={stats}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Stat"}
        tableTitle={"Stats"}
        btnText={"Add Stat"}
        handleExportRows={exportStats}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_stat"}
        editPermission={"edit_stat"}
        deletePermission={"delete_stat"}
        exportPermission={"export_all_stats"}
      />
      <DeleteConfirmationModal />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};
export default StatsListing;
