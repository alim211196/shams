import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/slices/deleteModalSlice";
import DeleteConfirmationModal from "../features/DeleteConfirmationModal";
import { useTheme } from "@mui/material/styles";
import CustomFloatButton from "../common/CustomFloatButton";
import CustomMaterialTable from "../common/CustomMaterialTable";
import {
  deleteMeetingServiceById,
  getMeetingService,
} from "../services/meetingService";
import moment from "moment";
import TableTypography from "../common/TableTypography";
const MeetingListing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchMeetings = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getMeetingService(pageIndex + 1, pageSize);
      if (response?.result?.data) {
        setMeetings(
          Array.isArray(response.result.data) ? response.result.data : []
        );
        setRowCount(response.result.totalRecords || 0);
      } else {
        setMeetings([]);
        setRowCount(0);
      }
    } catch (error) {
      setMeetings([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (id) => navigate(`/admin/meeting/${id}`);
  const handleAdd = () => navigate("/admin/meeting");

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this meeting?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteMeetingServiceById(id);
      toast.success("Meeting deleted successfully");
      setPagination((prev) => ({ ...prev }));
    } catch {
      toast.error("Failed to delete meeting");
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "topic",
        header: "Topic",
        size: 180,
        Cell: ({ renderedCellValue, row }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "start_time",
        header: "Start Time",
        size: 180,
        Cell: ({ renderedCellValue }) => (
          <Typography variant="caption">
            {moment(renderedCellValue).calendar()}
          </Typography>
        ),
      },
      {
        accessorKey: "duration",
        header: "Duration",
        size: 80,
        Cell: ({ renderedCellValue }) => (
          <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
            {renderedCellValue + " " + "min"}
          </Typography>
        ),
      },
      {
        accessorKey: "timezone",
        header: "Timezone",
        size: 80,
        Cell: ({ renderedCellValue }) => (
          <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
            {renderedCellValue}
          </Typography>
        ),
      },
      // {
      //   accessorKey: "createdBy",
      //   header: "Created By",
      //   size: 140,
      //   Cell: ({ renderedCellValue }) => (
      //     <Typography variant="caption" sx={{ textTransform: "capitalize" }}>
      //       {/* {renderedCellValue} */}Alim
      //     </Typography>
      //   ),
      // },
      {
        accessorKey: "join_url",
        header: "Join Url",
        size: 80,
        Cell: ({ renderedCellValue }) => (
          <Link to={renderedCellValue}>link</Link>
        ),
      },
      {
        accessorKey: "start_url",
        header: "Start Url",
        size: 80,
        Cell: ({ renderedCellValue }) => (
          <Link to={renderedCellValue}>link</Link>
        ),
      },
    ],
    []
  );

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <CustomMaterialTable
        data={meetings}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Meeting"}
        tableTitle={"Meetings"}
        btnText={"Add Meeting"}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_meeting"}
        editPermission={"edit_meeting"}
        deletePermission={"delete_meeting"}
        exportPermission={"export_all_meetings"}
      />
      <DeleteConfirmationModal />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};
export default MeetingListing;
