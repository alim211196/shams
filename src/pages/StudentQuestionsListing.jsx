import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
import {
  deleteStudentQuestionServiceById,
  getAllPaginatedQuestionsService,
  getAllQuestionsService,
  updateStudentQuestionStatus,
} from "../services/studentsQuestionsService";
import TableTypography from "../common/TableTypography";
import { getS3ImageUrl } from "../utils/helper";

const StudentQuestionsListing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userPermissions } = useSelector((state) => state.user);
  const fetchQuestions = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getAllPaginatedQuestionsService(
        pageIndex + 1,
        pageSize
      );
      if (response?.result?.data) {
        setQuestions(
          Array.isArray(response.result.data) ? response.result.data : []
        );
        setRowCount(response.result.totalRecords || 0);
      } else {
        setQuestions([]);
        setRowCount(0);
      }
    } catch (error) {
      setQuestions([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (tid) => {
    navigate(`/admin/settings/student-question/${tid}`);
  };

  const handleAdd = () => {
    navigate("/admin/settings/student-question");
  };

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this question?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      const response = await deleteStudentQuestionServiceById(id);
      if (response.statusText === "OK") {
        toast.success("Question deleted successfully!");
        fetchQuestions(pagination.pageIndex, pagination.pageSize);
      } else {
        toast.error("Failed to delete question!");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the question.");
    }
  };

  const handleChangeStatus = async (id, status) => {
    const newStatus = status === true ? false : true;
    try {
      await updateStudentQuestionStatus(id, newStatus);
      toast.success("Question status updated successfully");
      fetchQuestions(pagination.pageIndex, pagination.pageSize);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const exportQuestions = async () => {
    await handleExportRows(getAllQuestionsService, "student_questions", {
      title: "Title",
      subtitle: "Sub Title",
      question: "Questions",
      options: "Options",
      status: "Status",
      created_at: "Created Date",
      updated_at: "Updated Date",
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 180,
        Cell: ({ renderedCellValue, row }) => (
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src={getS3ImageUrl("student_question", row.original?.ques_img)}
              alt="Icon"
              variant="square"
              sx={{ width: 40, height: "auto" }}
            />
            <TableTypography value={renderedCellValue} />
          </Box>
        ),
      },
      {
        accessorKey: "subtitle",
        header: "SubTitle",
        size: 120,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "question",
        header: "Question",
        size: 120,
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
                  !hasPermission(userPermissions, "toggle_active_question")
                }
                onChange={() => {
                  if (
                    hasPermission(userPermissions, "toggle_active_question")
                  ) {
                    handleChangeStatus(row.original._id, renderedCellValue);
                  }
                }}
              />
            }
          />
        ),
      },
    ],
    []
  );

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <CustomMaterialTable
        data={questions}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Question"}
        tableTitle={"Questions"}
        btnText={"Add Question"}
        handleExportRows={exportQuestions}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_question"}
        editPermission={"edit_question"}
        deletePermission={"delete_question"}
        exportPermission={"export_all_questions"}
      />
      <DeleteConfirmationModal />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};

export default StudentQuestionsListing;
