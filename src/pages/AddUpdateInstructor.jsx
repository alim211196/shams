import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createInstructorService,
  getInstructorServiceById,
} from "../services/instructorService";
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
import InstructorForm from "../features/Forms/InstructorForm";
import { NavigateNext } from "@mui/icons-material";
import { hasPermission } from "../utils/permissionHelper";

const AddUpdateInstructor = () => {
  const { id } = useParams();
  const { languages } = useSelector((state) => state.languages);
  const isEditing = !!id;
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    isEditing ? "edit_instructor" : "add_instructor"
  );
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("en");
  const [roleData, setRoleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    status: "",
    password: "",
    tutorType: "",
    licence: "",
    certification: "",
    experience: "",
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      let response;

      if (id) {
        // If ID exists, update the testimonial
        response = await createInstructorService({ ...data, id });
      } else {
        // If no ID, create a new testimonial
        response = await createInstructorService(data);
      }
      if (response?.status === 200) {
        toast.success("Form Submitted Successfully:", response.data);
        navigate("/admin/instructor-listing");
      }
    } catch (error) {
      console.error("Error submitting instructor:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      const fetchRoleData = async () => {
        try {
          const response = await getInstructorServiceById(id);
          const data = response?.data?.result;
          if (data) {
            setRoleData(data);
            updateFormData(data, activeLang);
          }
        } catch (error) {
          console.log("Error fetching instructor:", error);
        }
      };

      fetchRoleData();
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
    if (roleData) {
      updateFormData(roleData, newLang);
    }
  };

  const breadcrumbs = [
    <Typography key="1" sx={{ fontSize: "13px" }}>
      Admin
    </Typography>,
    <Link
      style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
      key="2"
      to="/admin/instructor-listing"
    >
      Instructor
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
                {isEditing ? "Edit Instructor" : "Create Instructor"}
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
                  <InstructorForm
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
          <InstructorForm
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

export default AddUpdateInstructor;
