import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createCourseService,
  getCourseServiceById,
} from "../services/courseService";
import {
  getCourseSectionService,
  getCourseSectionServiceById,
} from "../services/courseSectionService";
import { createCourseSectionService } from "../services/courseSectionService";
import {
  Grid,
  Box,
  Container,
  Paper,
  Breadcrumbs,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

import CourseForm from "../features/Forms/CourseForm";
import { NavigateNext } from "@mui/icons-material";
import { hasPermission } from "../utils/permissionHelper";

const AddUpdateCourse = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    isEditing ? "edit_course" : "add_course"
  );
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("en");
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sectionId, setSectionId] = useState(null);
  const [rowCount, setRowCount] = useState(0);
  const [sections, setSections] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    tutor_id: "",
    category_id: "",
    description: "",
    overview: "",
    price: "",
    certificate: "",
    duration: "",
    discount: "",
    featured: "",
    trending: "",
    session_type: "",
    tags: "",
    difficulty: "",
    status: "",
    section_name: "",
    section_duration: "",
    course_id: "",
    section_status: "",
  });

  const fetchCourseSections = useCallback(async () => {
    try {
      const response = await getCourseSectionService();
      setSections(response?.data?.result?.data || []);
    } catch (error) {
      setRowCount(0);
      console.error("Error fetching course Sections:", error);
    }
  }, []);

  const handleSubmit = async (data, tabValue = "courseInfo") => {
    setLoading(true);
    try {
      let response;
      if (id && tabValue === "Course") {
        response = await createCourseService({ ...data, id });
      } else {
        if (tabValue === "Course") {
          response = await createCourseService(data);
        } else {
          const obj = {
            id: sectionId,
            name: data.section_name,
            duration: data.section_duration,
            course_id: data.course_id,
            status: data.section_status,
          };
          response = await createCourseSectionService(obj);
        }
      }
      if (response?.status === 200 && tabValue === "Course") {
        toast.success("Form Submitted Successfully");
        navigate("/admin/course-listing");
      } else if (response?.status === 200 && tabValue === "Section") {
        toast.success("Form Submitted Successfully:");
        setFormData({
          ...formData,
          sectionId: null,
          section_name: "",
          section_duration: "",
          section_status: "",
          course_id: "",
        });
        fetchCourseSections();
      }
    } catch (error) {
      console.error("Error submitting admin:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEditing) {
      const fetchCourseData = async () => {
        try {
          const response = await getCourseServiceById(id);
          const data = response?.data?.result;
          console.log(data, "testing dtat");
          if (data) {
            setCourseData(data);
            updateFormData(data, activeLang);
          }
        } catch (error) {
          console.log("Error fetching admin:", error);
        }
      };

      fetchCourseData();
    }
  }, [activeLang, id, isEditing]);

  const getCourseSectionById = async (id) => {
    try {
      const response = await getCourseSectionServiceById(id);
      const data = response?.data?.result;
      if (data) {
        const element = document.getElementById("course-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setSectionId(id);
        setFormData({
          ...formData,
          section_name: data?.name || "",
          section_duration: data?.duration || "",
          section_status: data?.status || "",
          course_id: data?.course_id || "",
        });
      }
    } catch (error) {
      console.log("Error fetching section:", error);
    }
  };
  const updateFormData = (data, lang) => {
    setFormData({
      category_id: data?.category_id?._id || "",
      title: data?.title || "",
      slug: data?.slug || "",
      certificate: data?.certificate || "",
      duration: data?.duration || "",
      discount: data?.discount || "",
      featured: data?.featured || "",
      trending: data?.trending || "",
      session_type: data?.session_type || "",
      tags: data?.tags || "",
      difficulty: data?.difficulty || "",
      price: data?.price || "",
      tutor_id: data?.tutor_id?._id || "",
      overview: data?.overview || "",
      status: data?.status || true,
      language: data?.language || "",
      description: data?.description || "",
    });
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
        <Box sx={{ p: 2 }} id="course-section">
          <Grid container alignItems="center" spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {isEditing ? "Edit Course" : "Create Course"}
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
          <>
            <div style={{ overflow: "hidden" }}>
              <CourseForm
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                loading={loading}
                isEditing={isEditing}
                activeLang={activeLang}
                checkPermission={checkPermission}
                fetchCourseSections={fetchCourseSections}
                sections={sections}
                rowCount={rowCount}
                getCourseSectionById={getCourseSectionById}
              />
            </div>
          </>
        ) : (
          <CourseForm
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

export default AddUpdateCourse;
