import { Add, Delete, Edit, GetApp, Person,Visibility } from "@mui/icons-material";
import { useMemo } from "react";
import { Box, Button, IconButton, Paper,Typography } from "@mui/material";
import {
  MaterialReactTable,
  MRT_ToggleFiltersButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleGlobalFilterButton,
  useMaterialReactTable,
} from "material-react-table";
import ActionMenuItem from "./ActionMenuItem";
import { useSelector } from "react-redux";
import { hasPermission } from "../utils/permissionHelper";

const CustomMaterialTable = ({
  data,
  columns,
  pagination,
  setPagination,
  loading,
  rowCount,
  tableTitle,
  title,
  btnText,
  handleExportRows,
  handleAdd,
  handleEdit,
  handleView,
  handleDelete,
  isMobile,
  isCourseListing=false,
  detailPanel=()=>{},
  addPermission,
  editPermission,
  deletePermission,
  viewPermission,
  exportPermission,
  viewSectionPermission,
}) => {
  const { userPermissions } = useSelector((state) => state.user);
  const canExport = hasPermission(userPermissions, exportPermission);
  const canAdd = hasPermission(userPermissions, addPermission);
  const canEdit = hasPermission(userPermissions, editPermission);
  const canDelete = hasPermission(userPermissions, deletePermission);
  const canViewSection = hasPermission(userPermissions, viewSectionPermission);
  const canView = hasPermission(userPermissions, viewPermission);
  const hideExport = useMemo(
    () => !["Page", "Permission", "Role"].includes(title),
    [title]
  );

  const hideEditList = useMemo(
    () => !["Permission", "Page"].includes(title),
    [title]
  );
  const hideDeleteList = useMemo(() => !["Page"].includes(title), [title]);
  const showOnPage = useMemo(() => ["Page"].includes(title), [title]);
  const viewDetails = useMemo(() => ["Student"].includes(title), [title]);
  const conditionalIds = (row) => {
    if (title === "Meeting") {
      return row.original.meeting_id;
    } else {
      return row.original._id;
    }
  };

  const hideActions = useMemo(
    () => ["Contact Inquiries"].includes(title),
    [title]
  );

  const table = useMaterialReactTable({
    columns,
    data: data?.length > 0 ? data : [],
    enableColumnActions: false,
    enableRowActions: hideActions ? false : true,
    enablePagination: true,
    enableExpandAll: false, 
    initialState: {
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
      pagination: {
        pageSize: pagination.pageSize,
        pageIndex: pagination.pageIndex,
      },
    },
    manualPagination: true,
    rowCount: rowCount ?? 0,
    onPaginationChange: setPagination,
    state: {
      isLoading: loading,
      pagination,
    },
    muiSkeletonProps: {
      animation: "pulse",
      height: 28,
      width: "80%",
    },
    muiPaginationProps: {
      color: "primary",
      shape: "rounded",
      showRowsPerPage: true,
      variant: "outlined",
      rowsPerPageOptions: [10, 50, 100, 200],
      showFirstButton: false,
      showLastButton: false,
    },
    paginationDisplayMode: "pages",
    muiTableBodyCellProps: ({ row }) => ({
      sx: {
        backgroundColor: row.index % 2 === 0 ? "#ffffff" : "#f5f5f5",
      },
    }),
    muiBottomToolbarProps: {
      sx: {
        borderTop: "none",
        backgroundColor: "#f5f5f5",
      },
    },
    muiTopToolbarProps: {
      sx: {
        backgroundColor: "white",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#f5f5f5",
        alignItems: "center",
      },
    },
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: "0",
        backgroundColor: "white",
      },
    },
    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => table.setExpanded({ [row.id]: !row.getIsExpanded() }), 
      sx: {
        transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
        transition: 'transform 0.2s',
      },
    }),
    muiTableContainerProps: {
      sx: {
        border: "1px solid #f5f5f5",
        borderRadius: 1,
        maxHeight: "400px",
        minHeight: "64vh",
      },
    },

    renderTopToolbarCustomActions: () => (
      <Box sx={{ mt: 1, ml: 1 }}>
        <Typography variant="h6" sx={{ margin: 0, fontWeight: "bold" }}>
          {tableTitle}
        </Typography>
      </Box>
    ),
    renderToolbarInternalActions: ({ table }) => (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <MRT_ToggleGlobalFilterButton table={table} />
          <MRT_ToggleFiltersButton table={table} />
          {canExport && hideExport && (
            <IconButton onClick={handleExportRows}>
              <GetApp />
            </IconButton>
          )}

          <MRT_ToggleFullScreenButton table={table} />
        </Box>

        {/* Right side Add Button */}
        {!isMobile && !hideActions && (
          <Button
            color="primary"
            variant="contained"
            startIcon={<Add />}
            onClick={handleAdd}
            disabled={!canAdd}
          >
            {btnText}
          </Button>
        )}
      </Box>
    ),
    renderDetailPanel: isCourseListing
    ? ({ row }) => detailPanel(row.original)
    : undefined, 
    renderRowActionMenuItems: ({ row, closeMenu, table }) =>
      [
        canEdit && hideEditList && (
          <ActionMenuItem
            icon={Edit}
            key="edit"
            label={`Edit ${title}`}
            onClick={() => handleEdit(conditionalIds(row), row.original.slug)}
            closeMenu={closeMenu}
            table={table}
            // disabled={!row.original.status}
          />
        ),
        
        canDelete && hideDeleteList && (
          <ActionMenuItem
            icon={Delete}
            key="delete"
            label={`Delete ${title}`}
            onClick={() => handleDelete(conditionalIds(row))}
            closeMenu={closeMenu}
            table={table}
            color="error.main"
          />
        ),
        canViewSection && showOnPage && (
          <ActionMenuItem
            key="view"
            icon={Visibility}
            label={`Edit Sections`}
            onClick={() => handleEdit(row.original._id, row.original.link_id)}
            closeMenu={closeMenu}
            table={table}
          />
        ),
        canView && viewDetails && (
          <ActionMenuItem
            key="view_user"
            icon={Person}
            label={`View Details`}
            onClick={() => handleView(row.original._id)}
            closeMenu={closeMenu}
            table={table}
          />
        ),
      ].filter(Boolean),
  });

  return (
    <>
    <Paper
      elevation={0}
      sx={{
        width: {
          xs: "100vw", // Full width on extra small screens (mobile)
          sm: "90vw", // Slightly reduced width on small screens
          md: "80vw", // Medium screens (e.g., tablets)
          lg: "calc(100vw - 303px)", // Large screens (deduct sidebar width)
          xl: "calc(100vw - 320px)", // Extra large screens (wider layouts)
        },
        maxWidth: "1200px", // Optional max width to avoid excessive stretching
        background: "white",
        overflow: "auto",
        margin: "auto", // Center the Paper in the available space
      }}
      detailPanel={isCourseListing ? detailPanel : undefined}
      muiSkeletonProps={{
        animation: "pulse",
        height: 28,
      }}
    >
      <MaterialReactTable
        table={table}
        state={{ isLoading: true }}
        muiCircularProgressProps={{
          color: "secondary",
          thickness: 5,
          size: 55,
        }}
        muiSkeletonProps={{
          animation: "pulse",
          height: 28,
        }}
      />
    </Paper>
    </>
  );
};

export default CustomMaterialTable;
