import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import LanguageTabs from "../common/LanguageTabs";
import { useSelector } from "react-redux";
import { NavigateNext } from "@mui/icons-material";
import {
  createAchievementService,
  getAchievementServiceById,
  updateAchievementService,
} from "../services/achievementService";
import AchievementForm from "../features/Forms/AchievementForm";
import { hasPermission } from "../utils/permissionHelper";

const AddUpdateAchievement = () => {
  const { id } = useParams();
  const { languages } = useSelector((state) => state.languages);
  const isEditing = !!id;
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    isEditing ? "edit_achievement" : "add_achievement"
  );
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("en");
  const [achievementData, setAchievementData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    year: "",
    title: "",
    description: "",
    status: true,
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      let response;

      if (id) {
        // If ID exists, update the achievement
        response = await updateAchievementService(id, activeLang, data);
      } else {
        // If no ID, create a new achievement
        response = await createAchievementService(data);
      }
      if (response?.status === 200) {
        toast.success("Form Submitted Successfully:");
        navigate("/admin/settings/achievements-listing");
      }
    } catch (error) {
      console.error("Error submitting achievement:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetData = () => {
    setFormData({
      year: "",
      title: "",
      description: "",
      status: true,
    });
  };

  useEffect(() => {
    if (isEditing) {
      const fetchAchievementData = async () => {
        try {
          const response = await getAchievementServiceById(id, activeLang);
          const data = response?.result;

          if (data) {
            setAchievementData(data); // Store full data
            updateFormData(data);
          }
        } catch (error) {
          console.log("Error fetching achievement:", error);
        }
      };

      // Clear formData immediately before API call to prevent flickering
      resetData();

      fetchAchievementData();
    }
  }, [id, activeLang, isEditing]);

  const updateFormData = (data) => {
    setFormData({
      year: data?.year || "",
      title: data?.title || "",
      description: data?.description || "",
      status: data?.status || true,
    });
  };
  const handleChange = (event, newIndex) => {
    const newLang = languages[newIndex].code;
    setActiveLang(newLang);

    // Clear form data immediately to prevent flashing old data
    resetData();

    // Ensure we have fresh data when API call completes
    if (achievementData) {
      updateFormData(achievementData, newLang);
    }
  };
  const breadcrumbs = [
    <Typography key="1" sx={{ fontSize: "13px" }}>
      Settings
    </Typography>,
    <Link
      style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
      key="2"
      to="/admin/settings/achievements-listing"
    >
      Achievements
    </Link>,
    <Typography key="3" sx={{ fontSize: "13px" }}>
      {isEditing ? "Edit Achievement" : "Create Achievement"}
    </Typography>,
  ];

  return (
    <Container maxWidth="lg" sx={{ padding: "0px !important" }}>
      <Paper elevation={3}>
        <Box sx={{ p: 2 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {isEditing ? "Edit Achievement" : "Create Achievement"}
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
        </Box>
        <Box sx={{ px: 2, py: 1 }}>
          {isEditing ? (
            <LanguageTabs handleChange={handleChange} activeLang={activeLang}>
              {languages.map((lang) => (
                <div key={lang._id} style={{ overflow: "hidden" }}>
                  <AchievementForm
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    lang={lang}
                    activeLang={activeLang}
                    checkPermission={checkPermission}
                  />
                </div>
              ))}
            </LanguageTabs>
          ) : (
            <AchievementForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              loading={loading}
              checkPermission={checkPermission}
            />
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default AddUpdateAchievement;
