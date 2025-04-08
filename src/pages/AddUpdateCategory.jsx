import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createCategoryService,
  getCategoryServiceById,
} from "../services/categoryService";
import {
  Grid,
  Box,
  Container,
  Breadcrumbs,
  Paper,
  Typography,
} from "@mui/material";
import LanguageTabs from "../common/LanguageTabs";
import { useSelector } from "react-redux";
import CategoryForm from "../features/Forms/CategoryForm";
import { NavigateNext } from "@mui/icons-material";
import { hasPermission } from "../utils/permissionHelper";

const AddUpdateCategory = () => {
  const { id } = useParams();
  const { languages } = useSelector((state) => state.languages);
  const isEditing = !!id;
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    isEditing ? "edit_category" : "add_category"
  );
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("en");
  const [categoriesData, setCategoriesData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    status: "",
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      let response;

      if (id) {
        response = await createCategoryService({ ...data, id });
      } else {
        response = await createCategoryService(data);
      }
      if (response?.status === 200) {
        toast.success("Form Submitted Successfully:", response.data);
        navigate("/admin/category-listing");
      }
    } catch (error) {
      console.error("Error submitting category:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      const fetchCategoryData = async () => {
        try {
          const response = await getCategoryServiceById(id);
          const data = response?.data?.result;
          if (data) {
            setCategoriesData(data);
            updateFormData(data, activeLang);
          }
        } catch (error) {
          console.log("Error fetching category:", error);
        }
      };

      fetchCategoryData();
    }
  }, [activeLang, id, isEditing]);

  const updateFormData = (data, lang) => {
    setFormData({
      name: data?.role?.[lang]?.name || "",
      status: data?.role?.status || "",
    });
  };

  // Handle tab change without API call
  const handleChange = (event, newIndex) => {
    const newLang = languages[newIndex].code;
    setActiveLang(newLang);
    if (categoriesData) {
      updateFormData(categoriesData, newLang);
    }
  };

  const breadcrumbs = [
    <Typography key="1" sx={{ fontSize: "13px" }}>
      Admin
    </Typography>,
    <Link
      style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
      key="2"
      to="/admin/category-listing"
    >
      Category
    </Link>,
    <Typography key="3" sx={{ fontSize: "13px" }}>
      {isEditing ? "Edit Category" : "Create Category"}
    </Typography>,
  ];

  return (
    <Container maxWidth="lg" sx={{ padding: "0px !important" }}>
      <Paper elevation={3}>
        <Box sx={{ p: 2 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {isEditing ? "Edit Category" : "Create Category"}
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
        {isEditing ? (
          <LanguageTabs handleChange={handleChange} activeLang={activeLang}>
            {Array.isArray(languages) &&
              languages.map((lang) => (
                <div key={lang._id} style={{ overflow: "hidden" }}>
                  <CategoryForm
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
          <CategoryForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            loading={loading}
            checkPermission={checkPermission}
          />
        )}
      </Paper>
    </Container>
  );
};

export default AddUpdateCategory;
