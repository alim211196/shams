import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addEditAdminService,
  getAdminServiceId,
} from "../services/adminService";
import {
  Grid,
  Box,
  Container,
  Paper,
  Breadcrumbs,
  Typography,
} from "@mui/material";
import LanguageTabs from "../common/LanguageTabs";
import { useSelector } from "react-redux";
import AdminForm from "../features/Forms/AdminForm";
import { NavigateNext } from "@mui/icons-material";

const AddUpdateAdmin = () => {
  const { id } = useParams();
  const { languages } = useSelector((state) => state.languages);
  const isEditing = !!id;
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("en");
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role_id: "",
    status: "",
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      let response;

      if (id) {
        // If ID exists, update the testimonial
        response = await addEditAdminService({ ...data, id });
      } else {
        // If no ID, create a new testimonial
        response = await addEditAdminService(data);
      }
      if (response?.status === 200) {
        toast.success("Form Submitted Successfully:", response.data);
        navigate("/admin/admin-listing");
      }
    } catch (error) {
      console.error("Error submitting admin:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      const fetchAdminData = async () => {
        try {
          const response = await getAdminServiceId(id);
          const data = response?.data?.result;
          console.log("Admin Data:", data);
          if (data) {
            setAdminData(data);
            updateFormData(data, activeLang);
          }
        } catch (error) {
          console.log("Error fetching admin:", error);
        }
      };

      fetchAdminData();
    }
  }, [activeLang, id, isEditing]);

  const updateFormData = (data, lang = "") => {
    setFormData({
      name: data?.name || "",
      email: data?.email || "",
      password: data?.password || "",
      phone: data.phone || "",
      role_id: data?.role_id || "",
      status: data?.status || "",
    });
  };

  // Handle tab change without API call
  const handleChange = (event, newIndex) => {
    const newLang = languages[newIndex].code;
    setActiveLang(newLang);
    if (adminData) {
      updateFormData(adminData, newLang);
    }
  };

  const breadcrumbs = [
    <Typography key="1" sx={{ fontSize: "13px" }}>
      Admin
    </Typography>,
    <Link
      style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
      key="2"
      to="/admin/course-listing"
    >
      Course
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
                {isEditing ? "Edit Admin" : "Create Admin"}
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
                  <AdminForm
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    lang={lang}
                    activeLang={activeLang}
                  />
                </div>
              ))}
          </LanguageTabs>
        ) : (
          <AdminForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        )}
      </Paper>
    </Container>
  );
};

export default AddUpdateAdmin;
