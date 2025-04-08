import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import CustomMaterialTable from "../common/CustomMaterialTable";
import { getContactInquiriesService } from "../services/contactUsService";
import TableTypography from "../common/TableTypography";

const ContactInquiries = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { userPermissions } = useSelector((state) => state.user);
  const fetchInquiries = async (pageIndex, pageSize) => {
    try {
      setLoading(true);
      const response = await getContactInquiriesService(
        pageIndex + 1,
        pageSize
      );
      if (response?.result?.data) {
        setInquiries(
          Array.isArray(response.result.data) ? response.result.data : []
        );
        setRowCount(response.result.totalRecords || 0);
      } else {
        setInquiries([]);
        setRowCount(0);
      }
    } catch (error) {
      setInquiries([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries(pagination.pageIndex, pagination.pageSize);
  }, [pagination]);

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
        accessorKey: "email",
        header: "Email",
        size: 120,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 120,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "country",
        header: "Country",
        size: 120,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
      {
        accessorKey: "message",
        header: "Message",
        size: 300,
        Cell: ({ renderedCellValue }) => (
          <TableTypography value={renderedCellValue} />
        ),
      },
    ],
    []
  );

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <CustomMaterialTable
        data={inquiries}
        columns={columns}
        pagination={pagination}
        setPagination={setPagination}
        loading={loading}
        rowCount={rowCount}
        title={"Contact Inquiries"}
        tableTitle={"Contact Inquiries"}
        isMobile={isMobile}
      />
    </Box>
  );
};

export default ContactInquiries;
