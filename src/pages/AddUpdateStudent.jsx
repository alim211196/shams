import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createStudentService,
  getStudentServiceById,
} from "../services/studentService";
import {
  Box,
  Container,
  Breadcrumbs,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import LanguageTabs from "../common/LanguageTabs";
import { useSelector } from "react-redux";
import StudentForm from "../features/Forms/StudentForm";
import { NavigateNext } from "@mui/icons-material";
import { hasPermission } from "../utils/permissionHelper";

const AddUpdateStudent = () => {
  const { id } = useParams();
  const { languages } = useSelector((state) => state.languages);
  const isEditing = !!id;
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    isEditing ? "edit_student" : "add_student"
  );
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("en");
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    status: true,
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      let response;

      if (id) {
        response = await createStudentService({ ...data, id });
      } else {
        response = await createStudentService(data);
      }
      if (response?.status === 200) {
        toast.success("Form Submitted Successfully:", response.data);
        navigate("/admin/student-listing");
      }
    } catch (error) {
      console.error("Error submitting student:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      const fetchStudentData = async () => {
        try {
          const response = await getStudentServiceById(id);
          const data = response?.data?.result;
          if (data) {
            setStudentData(data);
            updateFormData(data, activeLang);
          }
        } catch (error) {
          console.log("Error fetching student:", error);
        }
      };

      fetchStudentData();
    }
  }, [activeLang, id, isEditing]);

  const updateFormData = (data, lang) => {
    setFormData({
      name: data?.role?.[lang]?.name || "",
      status: data?.role?.status || true,
    });
  };

  // Handle tab change without API call
  const handleChange = (event, newIndex) => {
    const newLang = languages[newIndex].code;
    setActiveLang(newLang);
    if (studentData) {
      updateFormData(studentData, newLang);
    }
  };

  const breadcrumbs = [
    <Typography key="1" sx={{ fontSize: "13px" }}>
      Admin
    </Typography>,
    <Link
      style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
      key="2"
      to="/admin/student-listing"
    >
      Students
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
                {isEditing ? "Edit Student" : "Create Student"}
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
                  <StudentForm
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
          <StudentForm
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

export default AddUpdateStudent;
