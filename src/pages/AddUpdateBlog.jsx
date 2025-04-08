import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createBlogService,
  getBlogServiceById,
  updateBlogService,
} from "../services/blogsService";
import {
  Grid,
  Box,
  Breadcrumbs,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import BlogForm from "../features/Forms/BlogForm";
import LanguageTabs from "../common/LanguageTabs";
import { useSelector } from "react-redux";
import { NavigateNext } from "@mui/icons-material";
import { hasPermission } from "../utils/permissionHelper";
import { getS3ImageUrl } from "../utils/helper";
const AddUpdateBlog = () => {
  const { id } = useParams();
  const { languages } = useSelector((state) => state.languages);
  const isEditing = !!id;
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    isEditing ? "edit_meeting" : "add_meeting"
  );
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("en");
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    slug: "",
    banner_img: null,
    banner_img_preview: null,
    short_description: "",
    description: "",
    user_type: "",
    meta_title: "",
    meta_img: null,
    meta_img_preview: null,
    meta_description: "",
    meta_keywords: "",
    status: true,
    created_by: userData?._id,
  });

  const handleSubmit = async (data) => {
    setLoading(true);

    // ✅ Create FormData
    const formDataToSend = new FormData();

    // ✅ Remove preview field
    const { banner_img_preview, meta_img_preview, ...filteredData } = data;

    // ✅ Append all text fields
    Object.keys(filteredData).forEach((key) => {
      if (key !== "banner_img" && key !== "meta_img") {
        formDataToSend.append(key, filteredData[key]);
      }
    });

    // ✅ Append lang_code
    formDataToSend.append("lang_code", activeLang);

    // ✅ Append new banner image if selected
    if (filteredData.banner_img && filteredData.banner_img instanceof File) {
      formDataToSend.append("banner_img", filteredData.banner_img);

      // ✅ If updating, append old banner image for deletion
      if (isEditing && blogData?.banner_img) {
        formDataToSend.append("old_banner_img", blogData.banner_img);
      }
    }

    // ✅ Append new meta image if selected
    if (filteredData.meta_img && filteredData.meta_img instanceof File) {
      formDataToSend.append("meta_img", filteredData.meta_img);

      // ✅ If updating, append old meta image for deletion
      if (isEditing && blogData?.meta_img) {
        formDataToSend.append("old_meta_img", blogData.meta_img);
      }
    }

    try {
      let response;
      if (id) {
        response = await updateBlogService(id, formDataToSend);
      } else {
        response = await createBlogService(formDataToSend);
      }

      if (response?.status === 200) {
        toast.success("Form Submitted Successfully");
        navigate("/admin/blogs/blogs-listing");
      }
    } catch (error) {
      console.error("Error submitting Blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetData = () => {
    setFormData({
      category_id: "",
      title: "",
      slug: "",
      banner_img: null,
      banner_img_preview: null,
      short_description: "",
      description: "",
      user_type: "",
      meta_title: "",
      meta_img: null,
      meta_img_preview: null,
      meta_description: "",
      meta_keywords: "",
      status: true,
      created_by: "",
    });
  };

  useEffect(() => {
    if (isEditing) {
      const fetchBlogData = async () => {
        try {
          const response = await getBlogServiceById(id, activeLang);
          const data = response?.result;
          if (data) {
            setBlogData(data); // Store full data once
            updateFormData(data); // Set initial form data
          }
        } catch (error) {
          console.log("Error fetching Blog:", error);
        }
      };
      resetData();

      fetchBlogData();
    }
  }, [id, activeLang, isEditing]);

  const updateFormData = (data, lang) => {
    setFormData({
      category_id: data?.category_id?._id || "",
      title: data?.title || "",
      slug: data?.slug || "",
      banner_img: { name: data?.banner_img || null },
      banner_img_preview: data?.banner_img
        ? getS3ImageUrl("blog", data?.banner_img)
        : null,
      short_description: data?.short_description || "",
      description: data?.description || "",
      user_type: data?.user_type || "",
      meta_title: data?.meta_title || "",
      meta_img: { name: data?.meta_img || null },
      meta_img_preview: data?.meta_img
        ? getS3ImageUrl("blog", data?.meta_img)
        : null,
      meta_description: data?.meta_description || "",
      meta_keywords: data?.meta_keywords || "",
      status: data?.status ?? true,
      created_by: userData?._id,
    });
  };

  // Handle tab change without API call
  const handleChange = (event, newIndex) => {
    const newLang = languages[newIndex].code;
    setActiveLang(newLang);
    resetData();
    if (blogData) {
      updateFormData(blogData, newLang);
    }
  };

  const breadcrumbs = [
    <Link
      key="1"
      to="/admin/blogs/blogs-listing"
      style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
    >
      Blogs
    </Link>,

    <Typography key="3" sx={{ fontSize: "13px" }}>
      {isEditing ? "Edit Blog" : "Create Blog"}
    </Typography>,
  ];

  return (
    <Container maxWidth="lg" sx={{ padding: "0px !important" }}>
      <Paper elevation={3}>
        <Box sx={{ p: 2 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {isEditing ? "Edit Blog" : "Create Blog"}
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
                  <BlogForm
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
            <BlogForm
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

export default memo(AddUpdateBlog);
