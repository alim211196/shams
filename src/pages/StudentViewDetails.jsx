import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getStudentWithInterestServiceById } from "../services/studentService";
import {
  Box,
  Container,
  Paper,
  Typography,
  Divider,
  CircularProgress,
  Breadcrumbs,
  Grid,
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
const InfoRow = ({ label, value }) => (
  <Grid size={{ xs: 12, sm: 6 }} display="flex" flexDirection="column">
    <Typography variant="subtitle2" color="primary">
      {label}
    </Typography>
    <Typography variant="caption" color="textSecondary">
      {value || "N/A"}
    </Typography>
  </Grid>
);

const StudentViewDetails = () => {
  const { id } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchStudentData = async () => {
        try {
          const response = await getStudentWithInterestServiceById(id);
          const data = response?.data?.result;
          if (data) {
            setStudentData(data);
          }
        } catch (error) {
          console.log("Error fetching student:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchStudentData();
    }
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="90vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!studentData) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h6" color="error">
          Student data not found.
        </Typography>
      </Box>
    );
  }

  const { user, answers } = studentData;

  const breadcrumbs = [
    <Link
      style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
      key="1"
      to="/admin/student-listing"
    >
      Student
    </Link>,
    <Typography key="2" sx={{ fontSize: "13px" }}>
      Student Information
    </Typography>,
  ];

  return (
    <Container maxWidth="lg" sx={{ padding: "0px !important" }}>
      <Paper elevation={2} sx={{ p: 3, borderRadius: "0px !important" }}>
        {/* Student Information Header */}

        <Grid container alignItems="center" spacing={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Student Information
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { xs: "flex-start", md: "flex-end" },
              }}
            >
              <Breadcrumbs
                separator={<NavigateNext fontSize="small" />}
                aria-label="breadcrumb"
              >
                {breadcrumbs}
              </Breadcrumbs>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 1 }} />

        {/* Student Details Section */}
        <Grid container spacing={3}>
          <InfoRow label="Name" value={user.name} />
          <InfoRow label="Email" value={user.email} />
          <InfoRow label="Status" value={user.status ? "Active" : "Inactive"} />
          <InfoRow label="Verified" value={user.is_verified ? "Yes" : "No"} />
          <InfoRow
            label="Created At"
            value={new Date(user.createdAt).toLocaleDateString()}
          />
          <InfoRow
            label="Updated At"
            value={new Date(user.updatedAt).toLocaleDateString()}
          />
        </Grid>

        {/* Student Interests & Choices Section */}
        <Box mt={4}>
          <Typography variant="h6" fontWeight="bold">
            Student Interests & Choices
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={2}>
            {answers?.map((item, index) => (
              <Grid size={{ xs: 12, sm: 6 }} key={index}>
                <Typography variant="subtitle2" color="primary">
                  {item.question}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {item.answer}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default StudentViewDetails;
