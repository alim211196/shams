import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createFaqService,
  getFaqServiceById,
  updateFaqService,
} from "../services/faqsService";
import {
  Grid,
  Box,
  Breadcrumbs,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import FaqForm from "../features/Forms/FaqForm";
import LanguageTabs from "../common/LanguageTabs";
import { useSelector } from "react-redux";
import { NavigateNext } from "@mui/icons-material";
import { hasPermission } from "../utils/permissionHelper";
const AddUpdateFaq = () => {
  const { id } = useParams();
  const { languages } = useSelector((state) => state.languages);
  const isEditing = !!id;
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    isEditing ? "edit_faq" : "add_faq"
  );
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("en");
  const [faqData, setFaqData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    description: "",
    user_type: "",
    status: true,
    is_featured: true,
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      let response;

      if (id) {
        // If ID exists, update the FAQ
        response = await updateFaqService(id, activeLang, data);
      } else {
        // If no ID, create a new FAQ
        response = await createFaqService(data);
      }

      if (response?.status === 200) {
        toast.success("Form Submitted Successfully:");
        navigate("/admin/faqs/faqs-listing");
      }
    } catch (error) {
      console.error("Error submitting FAQ:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetData = () => {
    setFormData({
      category_id: "",
      title: "",
      description: "",
      user_type: "",
      status: true,
      is_featured: true,
    });
  };

  useEffect(() => {
    if (isEditing) {
      const fetchFaqData = async () => {
        try {
          const response = await getFaqServiceById(id, activeLang);
          const data = response?.result;
          if (data) {
            setFaqData(data); // Store full data once
            updateFormData(data); // Set initial form data
          }
        } catch (error) {
          console.log("Error fetching FAQ:", error);
        }
      };
      resetData();
      fetchFaqData();
    }
  }, [id, activeLang, isEditing]);

  const updateFormData = (data) => {
    setFormData({
      category_id: data?.category_id?._id || "",
      title: data?.title || "",
      description: data?.description || "",
      user_type: data?.user_type || "",
      status: data?.status || true,
      is_featured: data?.is_featured || true,
    });
  };

  // Handle tab change without API call
  const handleChange = (event, newIndex) => {
    const newLang = languages[newIndex].code;
    setActiveLang(newLang);
    resetData();
    if (faqData) {
      updateFormData(faqData);
    }
  };

  const breadcrumbs = [
    <Typography key="1" sx={{ fontSize: "13px" }}>
      Settings
    </Typography>,
    <Link
      style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
      key="2"
      to="/admin/faqs/faqs-listing"
    >
      Faqs
    </Link>,
    <Typography key="3" sx={{ fontSize: "13px" }}>
      {isEditing ? "Edit Faq" : "Create Faq"}
    </Typography>,
  ];

  return (
    <Container maxWidth="lg" sx={{ padding: "0px !important" }}>
      <Paper elevation={3}>
        <Box sx={{ p: 2 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {isEditing ? "Edit Faq" : "Create Faq"}
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
                  <FaqForm
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
            <FaqForm
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

export default AddUpdateFaq;
