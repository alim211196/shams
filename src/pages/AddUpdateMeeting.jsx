import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import {
  createMeetingService,
  getMeetingServiceById,
  updateMeetingService,
} from "../services/meetingService";
import MeetingForm from "../features/Forms/MeetingForm";
import moment from "moment";
import { useSelector } from "react-redux";
import { hasPermission } from "../utils/permissionHelper";

const AddUpdateMeeting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    isEditing ? "edit_meeting" : "add_meeting"
  );
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    start_time: moment().format("YYYY-MM-DDTHH:mm"),
    duration: 0,
    timezone: "",
    userId: "65d5f3e2b4e2f83a9c8d2b10",
    // enablePassword: false,
    // password: "",
  });

  useEffect(() => {
    if (isEditing) {
      const fetchMeetingData = async () => {
        try {
          const response = await getMeetingServiceById(id);
          const data = response?.data?.result;
          if (data) {
            const start_time = data?.start_time
              ? moment(data.start_time).format("YYYY-MM-DDTHH:mm")
              : moment().format("YYYY-MM-DDTHH:mm");
            setFormData({
              topic: data?.topic || "",
              start_time: start_time,
              duration: data?.duration || 0,
              timezone: data?.timezone || "",
              userId: data?.userId || "65d5f3e2b4e2f83a9c8d2b10",
              // enablePassword: data?.enablePassword || false,
              // password: data?.password,
            });
          }
        } catch (error) {
          console.log("Error fetching language:", error);
        }
      };

      fetchMeetingData();
    }
  }, [isEditing]);

  const breadcrumbs = [
    <Link
      style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
      key="1"
      to="/admin/meetings-listing"
    >
      Meeting
    </Link>,
    <Typography key="2" sx={{ fontSize: "13px" }}>
      {isEditing ? "Edit Meeting" : "Create Meeting"}
    </Typography>,
  ];

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      let response;
      if (id) {
        response = await updateMeetingService(id, data);
      } else {
        response = await createMeetingService(data);
      }
      if (response?.status === 200) {
        toast.success("Form Submitted Successfully:");
        navigate("/admin/meetings-listing");
      }
    } catch (error) {
      console.error("Error submitting language:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ padding: "0px !important" }}>
      <Paper elevation={3}>
        <Box sx={{ p: 2 }}>
          <Grid container alignItems="center" spacing={2}>
            {/* Title Section */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {isEditing ? "Update Meeting" : "Create Meeting"}
              </Typography>
            </Grid>
            {/* Breadcrumbs (Aligned Right on Larger Screens) */}
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
        </Box>
        <Box sx={{ px: 2, py: 1 }}>
          <Box sx={{ p: 2, gap: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Meeting Information
            </Typography>
          </Box>
          <Divider />
          <MeetingForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            loading={loading}
            checkPermission={checkPermission}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default AddUpdateMeeting;
