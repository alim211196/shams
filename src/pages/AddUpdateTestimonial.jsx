import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createTestimonialService,
  getTestimonialServiceById,
  updateTestimonialService,
} from "../services/testimonialService";
import {
  Box,
  Breadcrumbs,
  Container,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import TestimonialForm from "../features/Forms/TestimonialForm";
import LanguageTabs from "../common/LanguageTabs";
import { useSelector } from "react-redux";
import { NavigateNext } from "@mui/icons-material";
import { hasPermission } from "../utils/permissionHelper";
import { getS3ImageUrl } from "../utils/helper";
const AddUpdateTestimonial = () => {
  const { id } = useParams();
  const { languages } = useSelector((state) => state.languages);
  const isEditing = !!id;
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    isEditing ? "edit_testimonial" : "add_testimonial"
  );
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("en");
  const [testimonialData, setTestimonialData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    company: "",
    message: "",
    rating: "",
    user_type: "",
    profile_img: null,
    profile_img_preview: null,
    status: true,
  });

  const handleSubmit = async (data) => {
    setLoading(true);

    // ✅ Create FormData
    const formDataToSend = new FormData();

    // ✅ Remove preview field
    const { profile_img_preview, ...filteredData } = data;

    // ✅ Append all text fields
    Object.keys(filteredData).forEach((key) => {
      if (key !== "profile_img") {
        formDataToSend.append(key, filteredData[key]);
      }
    });

    // ✅ Append lang_code
    formDataToSend.append("lang_code", activeLang);

    // ✅ Append new image if selected
    if (filteredData.profile_img && filteredData.profile_img instanceof File) {
      formDataToSend.append("profile_img", filteredData.profile_img);

      // ✅ If updating, append old image for deletion
      if (isEditing && testimonialData?.profile_img) {
        formDataToSend.append("old_profile_img", testimonialData.profile_img);
      }
    }
    try {
      let response;
      if (id) {
        response = await updateTestimonialService(id, formDataToSend);
      } else {
        response = await createTestimonialService(formDataToSend);
      }

      if (response?.status === 200) {
        toast.success("Form Submitted Successfully");
        navigate("/admin/settings/testimonials-listing");
      }
    } catch (error) {
      console.error("Error submitting Blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetData = () => {
    setFormData({
      name: "",
      designation: "",
      company: "",
      message: "",
      rating: "",
      user_type: "",
      profile_img: null,
      profile_img_preview: null,
      status: true,
    });
  };

  useEffect(() => {
    if (isEditing) {
      const fetchTestimonialData = async () => {
        try {
          const response = await getTestimonialServiceById(id, activeLang);
          const data = response?.result;
          if (data) {
            setTestimonialData(data); // Store full data once

            updateFormData(data); // Set initial form data
          }
        } catch (error) {
          console.log("Error fetching testimonial:", error);
        }
      };
      resetData();
      fetchTestimonialData();
    }
  }, [id, activeLang, isEditing]);

  const updateFormData = (data) => {
    setFormData({
      name: data?.name || "",
      designation: data?.designation || "",
      company: data?.company || "",
      message: data?.message || "",
      rating: data?.rating || "",
      profile_img: { name: data?.profile_img || null }, // Only storing name
      profile_img_preview: data?.profile_img
        ? getS3ImageUrl("testimonial", data?.profile_img)
        : null,
      user_type: data?.user_type || "",
      status: data?.status || true,
    });
  };

  // Handle tab change without API call
  const handleChange = (event, newIndex) => {
    const newLang = languages[newIndex].code;
    setActiveLang(newLang);
    resetData();
    if (testimonialData) {
      updateFormData(testimonialData);
    }
  };

  const breadcrumbs = [
    <Typography key="1" sx={{ fontSize: "13px" }}>
      Settings
    </Typography>,
    <Link
      style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
      key="2"
      to="/admin/settings/testimonials-listing"
    >
      Testimonials
    </Link>,
    <Typography key="3" sx={{ fontSize: "13px" }}>
      {isEditing ? "Edit Testimonial" : "Create Testimonial"}
    </Typography>,
  ];

  return (
    <Container maxWidth="lg" sx={{ padding: "0px !important" }}>
      <Paper elevation={3}>
        <Box sx={{ p: 2 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {isEditing ? "Edit Testimonial" : "Create Testimonial"}
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
                  <TestimonialForm
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
            <TestimonialForm
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

export default AddUpdateTestimonial;
