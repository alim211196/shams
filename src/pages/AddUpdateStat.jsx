import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Breadcrumbs,
  Container,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import LanguageTabs from "../common/LanguageTabs";
import { useSelector } from "react-redux";
import { NavigateNext } from "@mui/icons-material";
import {
  createStatService,
  getStatServiceById,
  updateStatService,
} from "../services/statService";
import StatForm from "../features/Forms/StatForm";
import { hasPermission } from "../utils/permissionHelper";
import { getS3ImageUrl } from "../utils/helper";

const AddUpdateStat = () => {
  const { id } = useParams();
  const { languages } = useSelector((state) => state.languages);
  const isEditing = !!id;
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    isEditing ? "edit_stat" : "add_stat"
  );
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("en");
  const [statData, setStatData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    stat_title: "",
    stat_count: "",
    stat_type: "",
    stat_icon: null,
    stat_icon_preview: null,
    status: true,
  });

  const handleSubmit = async (data) => {
    setLoading(true);

    // ✅ Create FormData
    const formDataToSend = new FormData();

    // ✅ Remove preview field
    const { stat_icon_preview, ...filteredData } = data;

    // ✅ Append all text fields
    Object.keys(filteredData).forEach((key) => {
      if (key !== "stat_icon") {
        formDataToSend.append(key, filteredData[key]);
      }
    });

    // ✅ Append lang_code
    formDataToSend.append("lang_code", activeLang);

    // ✅ Append new image if selected
    if (filteredData.stat_icon && filteredData.stat_icon instanceof File) {
      formDataToSend.append("stat_icon", filteredData.stat_icon);

      // ✅ If updating, append old image for deletion
      if (isEditing && statData?.stat_icon) {
        formDataToSend.append("old_stat_icon", statData.stat_icon);
      }
    }
    try {
      let response;
      if (id) {
        response = await updateStatService(id, formDataToSend);
      } else {
        response = await createStatService(formDataToSend);
      }
      if (response?.status === 200) {
        toast.success("Form Submitted Successfully");
        navigate("/admin/settings/stats-listing");
      }
    } catch (error) {
      console.error("Error submitting stat:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetData = () => {
    setFormData({
      stat_title: "",
      stat_count: "",
      stat_type: "",
      stat_icon: null,
      stat_icon_preview: null,
      status: true,
    });
  };

  useEffect(() => {
    if (isEditing) {
      const fetchStatData = async () => {
        try {
          const response = await getStatServiceById(id, activeLang);
          const data = response?.result;
          if (data) {
            setStatData(data);
            updateFormData(data);
          }
        } catch (error) {
          console.log("Error fetching stat:", error);
        }
      };

      resetData();
      fetchStatData();
    }
  }, [id, activeLang, isEditing]);

  const updateFormData = (data) => {
    setFormData({
      stat_title: data?.stat_title || "",
      stat_count: data?.stat_count || "",
      stat_type: data?.stat_type || "",
      stat_icon: { name: data?.stat_icon || null },
      stat_icon_preview: data?.stat_icon
        ? getS3ImageUrl("stat", data?.stat_icon)
        : null,
      status: data?.status || true,
    });
  };

  const handleChange = (event, newIndex) => {
    const newLang = languages[newIndex].code;
    setActiveLang(newLang);
    resetData();
    if (statData) {
      updateFormData(statData);
    }
  };

  const breadcrumbs = [
    <Typography key="1" sx={{ fontSize: "13px" }}>
      Settings
    </Typography>,
    <Link
      style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
      key="2"
      to="/admin/settings/stats-listing"
    >
      Stats
    </Link>,
    <Typography key="3" sx={{ fontSize: "13px" }}>
      {isEditing ? "Edit Stat" : "Create Stat"}
    </Typography>,
  ];

  return (
    <Container maxWidth="lg" sx={{ padding: "0px !important" }}>
      <Paper elevation={3}>
        <Box sx={{ p: 2 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {isEditing ? "Edit Stat" : "Create Stat"}
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
                  <StatForm
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
            <StatForm
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

export default AddUpdateStat;
