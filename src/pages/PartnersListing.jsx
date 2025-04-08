import { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, FormControlLabel, Avatar, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../redux/slices/deleteModalSlice";
import DeleteConfirmationModal from "../features/DeleteConfirmationModal";
import { CustomSwitch } from "../layouts/helper";
import { useTheme } from "@mui/material/styles";
import CustomFloatButton from "../common/CustomFloatButton";
import CustomMaterialTable from "../common/CustomMaterialTable";
import { handleExportRows } from "../utils/exportCsv";
import {
  deletePartnerServiceById,
  getAllPartnerService,
  getPaginatedPartnerService,
  updatePartnerStatusService,
} from "../services/partnerService";
import { hasPermission } from "../utils/permissionHelper";
import TableTypography from "../common/TableTypography";
import { getS3ImageUrl } from "../utils/helper";
const PartnersListing = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userPermissions } = useSelector((state) => state.user);
  const fetchPartners = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getPaginatedPartnerService(
        pageIndex + 1,
        pageSize
      );
      if (response?.result?.data) {
        setPartners(
          Array.isArray(response.result.data) ? response.result.data : []
        );
        setRowCount(response.result.totalRecords || 0);
      } else {
        setPartners([]);
        setRowCount(0);
      }
    } catch (error) {
      setPartners([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

  const handleEdit = (id) => navigate(`/admin/settings/partner/${id}`);
  const handleAdd = () => navigate("/admin/settings/partner");

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this partner?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deletePartnerServiceById(id);
      toast.success("Partner deleted successfully");
      setPagination((prev) => ({ ...prev }));
    } catch {
      toast.error("Failed to delete stat");
    }
  };

  const handleChangeStatus = async (id, status) => {
    try {
      await updatePartnerStatusService(id, status === true ? false : true);
      toast.success("Status updated successfully");
      setPagination((prev) => ({ ...prev }));
    } catch {
      toast.error("Failed to update status");
    }
  };

  const exportPartners = async () => {
    await handleExportRows(getAllPartnerService, "partners", {
      partner_name: "Partner Name",
      partner_description: "Partner Description",
      status: "Status",
      createdAt: "Created Date",
      updatedAt: "Updated Date",
    });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "partner_name",
        header: "Partner Name",
        size: 180,
        Cell: ({ renderedCellValue, row }) => (
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              src={getS3ImageUrl("partner", row.original?.partner_img)}
              alt="Icon"
              variant="square"
              sx={{ width: 40, height: "auto" }}
            />
            <TableTypography value={renderedCellValue} />
          </Box>
        ),
      },
      {
        accessorKey: "partner_description",
        header: "Partner Description",
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
                  !hasPermission(userPermissions, "toggle_active_partner")
                }
                onChange={() => {
                  if (hasPermission(userPermissions, "toggle_active_partner")) {
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
        data={partners}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Partner"}
        tableTitle={"Partners"}
        btnText={"Add Partner"}
        handleExportRows={exportPartners}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isMobile={isMobile}
        addPermission={"add_partner"}
        editPermission={"edit_partner"}
        deletePermission={"delete_partner"}
        exportPermission={"export_all_partners"}
      />
      <DeleteConfirmationModal />

      {isMobile && <CustomFloatButton handleAdd={handleAdd} />}
    </Box>
  );
};
export default PartnersListing;
