import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, Fab, FormControlLabel, useMediaQuery } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/slices/deleteModalSlice";
import DeleteConfirmationModal from "../features/DeleteConfirmationModal";
import { CustomSwitch } from "../layouts/helper";
import { useTheme } from "@mui/material/styles";
import {
  deleteLanguageServiceById,
  getAllLanguageService,
  updateLanguageStatus,
} from "../services/languageService";
import { fetchLanguages } from "../redux/slices/languageSlice";
import CustomMaterialTable from "../common/CustomMaterialTable";
import { handleExportRows } from "../utils/exportCsv";
import { hasPermission } from "../utils/permissionHelper";
import TableTypography from "../common/TableTypography";
const LanguageListing = () => {
  const { languages, totalRecords, currentPage, pageSize, loading } =
    useSelector((state) => state.languages);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState({
    pageIndex: currentPage,
    pageSize: pageSize,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userPermissions } = useSelector((state) => state.user);
  const handleEdit = (id) => navigate(`/admin/language/${id}`);
  const handleAdd = () => navigate("/admin/language");

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this language?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteLanguageServiceById(id);
      dispatch(fetchLanguages());
      toast.success("Language deleted successfully");
      setPagination((prev) => ({ ...prev }));
    } catch {
      toast.error("Failed to delete language");
    }
  };

  const handleChangeStatus = async (id, status) => {
    try {
      await updateLanguageStatus(id, status === true ? false : true);
      dispatch(fetchLanguages());
      toast.success("Status updated successfully");
      setPagination((prev) => ({ ...prev }));
    } catch {
      toast.error("Failed to update status");
    }
  };

  const exportLanguages = async () => {
    await handleExportRows(getAllLanguageService, "languages", {
      name: "Name",
      code: "Code",
      app_lang_code: "LanguageCode",
      rtl: "RTL",
      status: "Status",
      created_at: "Created Date",
      updated_at: "Updated Date",
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name", // access nested data with dot notation
        header: "Name",
        size: 180,
        Cell: ({ renderedCellValue, row }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "code",
        header: "Code",
        size: 140,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "app_lang_code",
        header: "Language Code",
        size: 140,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "rtl",
        header: "RTL",
        size: 140,
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
                  !hasPermission(userPermissions, "toggle_active_language")
                }
                onChange={() => {
                  if (
                    hasPermission(userPermissions, "toggle_active_language")
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
      //   accessorKey: "created_at",
      //   header: "Created Date",
      //   size: 80,
      //   Cell: ({ renderedCellValue }) => (
      //     <Typography variant="caption">
      //       {moment(renderedCellValue).format("L")}
      //     </Typography>
      //   ),
      // },
      // {
      //   accessorKey: "updated_at",
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
        data={languages}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={totalRecords}
        tableTitle={"Languages"}
        title={"Language"}
        btnText={"Add Language"}
        handleExportRows={exportLanguages}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_language"}
        editPermission={"edit_language"}
        deletePermission={"delete_language"}
        exportPermission={"export_all_languages"}
      />
      <DeleteConfirmationModal />

      {isMobile && (
        <Fab
          size="small"
          color="primary"
          aria-label="add"
          onClick={handleAdd}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1100,
          }}
        >
          <Add />
        </Fab>
      )}
    </Box>
  );
};

export default LanguageListing;
