import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  FormControlLabel,
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
  getAllAchievementService,
  getPaginatedAchievementService,
  updateAchievementAchievementStatus,
} from "../services/achievementService";
import { hasPermission } from "../utils/permissionHelper";
const AchievementsListing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userPermissions } = useSelector((state) => state.user);
  const fetchStats = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getPaginatedAchievementService(
        pageIndex + 1,
        pageSize
      );
      if (response?.result?.data) {
        setAchievements(
          Array.isArray(response.result.data) ? response.result.data : []
        );
        setRowCount(response.result.totalRecords || 0);
      } else {
        setAchievements([]);
        setRowCount(0);
      }
    } catch (error) {
      setAchievements([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (id) => navigate(`/admin/settings/achievement/${id}`);
  const handleAdd = () => navigate("/admin/settings/achievement");

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this achievement?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteAchievementServiceById(id);
      toast.success("Achievement deleted successfully");
      setPagination((prev) => ({ ...prev }));
    } catch {
      toast.error("Failed to delete achievement");
    }
  };

  const handleChangeStatus = async (id, status) => {
    try {
      await updateAchievementAchievementStatus(
        id,
        status === true ? false : true
      );
      toast.success("Status updated successfully");
      setPagination((prev) => ({ ...prev }));
    } catch {
      toast.error("Failed to update status");
    }
  };

  const exportAchievements = async () => {
    await handleExportRows(getAllAchievementService, "achievements", {
      year: "Year",
      title: "Title",
      description: "Description",
      status: "Status",
      createdAt: "Created Date",
      updatedAt: "Updated Date",
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "year",
        header: "Year",
        size: 60,
        Cell: ({ renderedCellValue, row }) => (
          <Typography variant="caption">{renderedCellValue}</Typography>
        ),
      },
      {
        accessorKey: "title",
        header: "Title",
        size: 140,
        Cell: ({ renderedCellValue }) => (
          <Typography variant="caption">{renderedCellValue}</Typography>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 300,
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
                  !hasPermission(userPermissions, "toggle_active_achievement")
                }
                onChange={() => {
                  if (
                    hasPermission(userPermissions, "toggle_active_achievement")
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
      // {
      //   accessorKey: "createdAt",
      //   header: "Created Date",
      //   size: 80,
      //   Cell: ({ renderedCellValue }) => (
      //     <Typography variant="caption">
      //       {moment(renderedCellValue).format("L")}
      //     </Typography>
      //   ),
      // },
      // {
      //   accessorKey: "updatedAt",
      //   header: "Updated Date",
      //   size: 80,
      //   Cell: ({ renderedCellValue }) => (
      //     <Typography variant="caption">
      //       {moment(renderedCellValue).format("L")}
      //     </Typography>
      //   ),
      // },
    ],
    []
  );

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <CustomMaterialTable
        data={achievements}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Achievement"}
        tableTitle={"Achievements"}
        btnText={"Add Achievement"}
        handleExportRows={exportAchievements}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_achievement"}
        editPermission={"edit_achievement"}
        deletePermission={"delete_achievement"}
        exportPermission={"export_all_achievements"}
      />
      <DeleteConfirmationModal />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};
export default AchievementsListing;
