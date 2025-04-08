import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Container,
  Paper,
  Typography,
  Breadcrumbs,
  Grid,
} from "@mui/material";
import LanguageForm from "../features/Forms/LanguageForm";
import {
  createLanguageService,
  getLanguageServiceById,
  updateLanguageService,
} from "../services/languageService";
import { fetchLanguages } from "../redux/slices/languageSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavigateNext } from "@mui/icons-material";
import { hasPermission } from "../utils/permissionHelper";
const AddUpdateLanguage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isEditing = !!id;
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    isEditing ? "edit_language" : "add_language"
  );
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    app_lang_code: "",
    rtl: "0",
    status: true,
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      let response;

      if (id) {
        // If ID exists, update the language
        response = await updateLanguageService(id, data);
      } else {
        // If no ID, create a new language
        response = await createLanguageService(data);
      }
      if (response?.status === 200) {
        toast.success("Form Submitted Successfully:");
        dispatch(fetchLanguages());
        navigate("/admin/languages-listing");
      }
    } catch (error) {
      console.error("Error submitting language:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      const fetchLanguageData = async () => {
        try {
          const response = await getLanguageServiceById(id);
          const data = response?.data?.result;
          if (data) {
            setFormData({
              name: data?.language?.name || "",
              code: data?.language?.code || "",
              app_lang_code: data?.language?.app_lang_code || "",
              rtl: data?.language?.rtl || "0",
              status: data?.language?.status || true,
            });
          }
        } catch (error) {
          console.log("Error fetching language:", error);
        }
      };

      fetchLanguageData();
    }
  }, [isEditing]);
  const breadcrumbs = [
    <Link
      key="2"
      style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
      to="/admin/languages-listing"
    >
      Languages
    </Link>,
    <Typography key="3" sx={{ fontSize: "13px" }}>
      {isEditing ? "Edit Language" : "Create Language"}
    </Typography>,
  ];
  return (
    <Container maxWidth="lg" sx={{ padding: "0px !important" }}>
      <Paper elevation={3}>
        <Box sx={{ p: 2 }}>
          <Grid container alignItems="center" spacing={2}>
            {/* Title Section */}
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {isEditing ? "Update Language" : "Create Language"}
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
          <LanguageForm
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

export default AddUpdateLanguage;
