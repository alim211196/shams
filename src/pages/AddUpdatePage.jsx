import React, { memo, useEffect, useState } from "react";
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
  createWebPageService,
  getPagesServiceById,
  updateWebPageService,
} from "../services/webPageService";
import PageForm from "../features/Forms/PageForm";
import { hasPermission } from "../utils/permissionHelper";
import { getS3ImageUrl } from "../utils/helper";
const AddUpdatePage = () => {
  const { id } = useParams();
  const { languages } = useSelector((state) => state.languages);
  const isEditing = !!id;
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    isEditing ? "edit_page" : "add_page"
  );
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("en");
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    meta_title: "",
    meta_img: null,
    meta_img_preview: null,
    meta_description: "",
    meta_keywords: "",
    status: null,
  });
  const handleSubmit = async (data) => {
    setLoading(true);

    // ✅ Create FormData
    const formDataToSend = new FormData();

    // ✅ Remove preview field
    const { meta_img_preview, ...filteredData } = data;

    // ✅ Append all text fields
    Object.keys(filteredData).forEach((key) => {
      if (key !== "meta_img") {
        formDataToSend.append(key, filteredData[key]);
      }
    });

    // ✅ Append lang_code
    formDataToSend.append("lang_code", activeLang);

    // ✅ Append new meta image if selected
    if (filteredData.meta_img && filteredData.meta_img instanceof File) {
      formDataToSend.append("meta_img", filteredData.meta_img);

      // ✅ If updating, append old meta image for deletion
      if (isEditing && pageData?.meta_img) {
        formDataToSend.append("old_meta_img", pageData.meta_img);
      }
    }

    try {
      let response;
      if (id) {
        // If ID exists, update the blog
        response = await updateWebPageService(id, formDataToSend);
      } else {
        // If no ID, create a new blog
        response = await createWebPageService(formDataToSend);
      }

      if (response?.status === 200) {
        toast.success("Form Submitted Successfully");
        navigate("/admin/website/pages");
      }
    } catch (error) {
      console.error("Error submitting Blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetData = () => {
    setFormData({
      title: "",
      slug: "",
      description: "",
      meta_title: "",
      meta_img: null,
      meta_img_preview: null,
      meta_description: "",
      meta_keywords: "",
      status: null,
    });
  };

  useEffect(() => {
    if (isEditing) {
      const fetchPageData = async () => {
        try {
          const response = await getPagesServiceById(id, activeLang);
          const data = response?.result;
          if (data) {
            setPageData(data); // Store full data once
            updateFormData(data); // Set initial form data
          }
        } catch (error) {
          console.log("Error fetching Blog:", error);
        }
      };
      resetData();
      fetchPageData();
    }
  }, [id, activeLang, isEditing]);

  const updateFormData = (data) => {
    setFormData({
      title: data?.title || "",
      slug: data?.slug || "",
      link_id: data?.link_id || "",
      description: data?.description || "",
      meta_title: data?.meta_title || "",
      meta_img: { name: data?.meta_img || null },
      meta_img_preview: data?.meta_img
        ? getS3ImageUrl("webpage", data?.meta_img)
        : null,
      meta_description: data?.meta_description || "",
      meta_keywords: data?.meta_keywords || "",
      status: data?.status || true,
    });
  };

  // Handle tab change without API call
  const handleChange = (event, newIndex) => {
    const newLang = languages[newIndex].code;
    setActiveLang(newLang);
    resetData();
    if (pageData) {
      updateFormData(pageData);
    }
  };

  const breadcrumbs = [
    <Typography key="1" sx={{ fontSize: "13px" }}>
      Settings
    </Typography>,
    <Link
      style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
      key="2"
      to="/admin/website/pages"
    >
      Pages
    </Link>,
    isEditing && (
      <Link
        style={{
          fontSize: "13px",
          textDecoration: "none",
          color: "inherit",
          pointerEvents: !formData?.link_id ? "none" : "auto",
          opacity: !formData?.link_id ? 0.5 : 1,
        }}
        key="3"
        to={
          !formData?.link_id
            ? "#"
            : `/admin/website/custom-pages/sections/${id}?page=${formData?.link_id}`
        }
      >
        About Us Page
      </Link>
    ),
    <Typography key={isEditing ? "4" : "3"} sx={{ fontSize: "13px" }}>
      {isEditing ? "Edit Page" : "Add New Page"}
    </Typography>,
  ];

  return (
    <Container maxWidth="lg" sx={{ padding: "0px !important" }}>
      <Paper elevation={3}>
        <Box sx={{ p: 2 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {isEditing ? "Edit Page" : "Add New Page"}
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
                  <PageForm
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
            <PageForm
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

export default memo(AddUpdatePage);
