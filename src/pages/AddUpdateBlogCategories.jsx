import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Grid,
  Box,
  Breadcrumbs,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import LanguageTabs from "../common/LanguageTabs";
import { useSelector } from "react-redux";
import { NavigateNext } from "@mui/icons-material";
import { hasPermission } from "../utils/permissionHelper";
import {
  createBlogCategoryService,
  getBlogCategoryServiceById,
  updateBlogCategoryService,
} from "../services/blogCategoryService";
import BlogCategoryForm from "../features/Forms/BlogCategoryForm";
const AddUpdateBlogCategories = () => {
  const { id } = useParams();
  const { languages } = useSelector((state) => state.languages);
  const isEditing = !!id;
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    isEditing ? "edit_post_category" : "add_post_category"
  );
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("en");
  const [blogCategoryData, setBlogCategoryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    status: true,
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      let response;

      if (id) {
        // If ID exists, update the Blog Category
        response = await updateBlogCategoryService(id, activeLang, data);
      } else {
        // If no ID, create a new Blog Category
        response = await createBlogCategoryService(data);
      }

      if (response?.status === 200) {
        toast.success("Form Submitted Successfully:");
        navigate("/admin/blogs/blogs-categories");
      }
    } catch (error) {
      console.error("Error submitting Blog Category:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetData = () => {
    setFormData({
      name: "",
      status: true,
    });
  };

  useEffect(() => {
    if (isEditing) {
      const fetchBlogCategoryData = async () => {
        try {
          const response = await getBlogCategoryServiceById(id, activeLang);
          const data = response?.result;
          if (data) {
            setBlogCategoryData(data); // Store full data once
            updateFormData(data); // Set initial form data
          }
        } catch (error) {
          console.log("Error fetching Blog Category:", error);
        }
      };
      resetData();
      fetchBlogCategoryData();
    }
  }, [id, activeLang, isEditing]);

  const updateFormData = (data) => {
    setFormData({
      name: data?.name || "",
      status: data?.status || true,
    });
  };

  // Handle tab change without API call
  const handleChange = (event, newIndex) => {
    const newLang = languages[newIndex].code;
    setActiveLang(newLang);
    resetData();
    if (blogCategoryData) {
      updateFormData(blogCategoryData);
    }
  };

  const breadcrumbs = [
    <Typography key="1" sx={{ fontSize: "13px" }}>
      Settings
    </Typography>,
    <Link
      style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
      key="2"
      to="/admin/blogs/blogs-categories"
    >
      Blogs
    </Link>,
    <Typography key="3" sx={{ fontSize: "13px" }}>
      {isEditing ? "Edit Blog Category" : "Create Blog Category"}
    </Typography>,
  ];

  return (
    <Container maxWidth="lg" sx={{ padding: "0px !important" }}>
      <Paper elevation={3}>
        <Box sx={{ p: 2 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {isEditing ? "Edit Blog Category" : "Create Blog Category"}
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
                  <BlogCategoryForm
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
            <BlogCategoryForm
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

export default AddUpdateBlogCategories;
