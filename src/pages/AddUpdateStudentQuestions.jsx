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
import { hasPermission } from "../utils/permissionHelper";
import StudentQuestionsForm from "../features/Forms/StudentQuestionsForm";
import {
  addStudentQuestionService,
  getStudentQuestionServiceById,
  updateStudentQuestionService,
} from "../services/studentsQuestionsService";
import { getS3ImageUrl } from "../utils/helper";
const AddUpdateStudentQuestions = () => {
  const { id } = useParams();
  const { languages } = useSelector((state) => state.languages);
  const isEditing = !!id;
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    isEditing ? "edit_question" : "add_question"
  );
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("en");
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    ques_img: null,
    ques_img_preview: null,
    question: "",
    options: [{ text: "", icon: null, icon_preview: null }],
    status: true,
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    const formDataToSend = new FormData();
    const { ques_img_preview, options, ...filteredData } = data;

    Object.keys(filteredData).forEach((key) => {
      if (key !== "ques_img") {
        formDataToSend.append(key, filteredData[key]);
      }
    });

    formDataToSend.append("lang_code", activeLang);

    if (filteredData.ques_img && filteredData.ques_img instanceof File) {
      formDataToSend.append("ques_img", filteredData.ques_img);
      if (isEditing && questionData?.ques_img) {
        formDataToSend.append("old_ques_img", questionData.ques_img);
      }
    }

    options.forEach((option, index) => {
      formDataToSend.append(`options[${index}][text]`, option.text);
      if (option.icon && option.icon instanceof File) {
        formDataToSend.append(`options[${index}][icon]`, option.icon);
        if (isEditing && questionData?.options?.[index]?.icon) {
          formDataToSend.append(
            `options[${index}][old_icon]`,
            questionData.options[index].icon
          );
        }
      }
    });

    try {
      let response = id
        ? await updateStudentQuestionService(id, formDataToSend)
        : await addStudentQuestionService(formDataToSend);

      if (response?.status === 200) {
        toast.success("Form Submitted Successfully");
        navigate("/admin/settings/student-questions-listing");
      }
    } catch (error) {
      console.error("Error submitting question:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetData = () => {
    setFormData({
      title: "",
      subtitle: "",
      ques_img: null,
      ques_img_preview: null,
      question: "",
      options: [{ text: "", icon: null, icon_preview: null }],
      status: true,
    });
  };

  useEffect(() => {
    if (isEditing) {
      const fetchQuestionData = async () => {
        try {
          const response = await getStudentQuestionServiceById(id, activeLang);
          const data = response?.result;
          if (data) {
            setQuestionData(data); // Store full data once
            updateFormData(data); // Set initial form data
          }
        } catch (error) {
          console.log("Error fetching Blog:", error);
        }
      };
      resetData();

      fetchQuestionData();
    }
  }, [id, activeLang, isEditing]);

  const updateFormData = (data) => {
    setFormData({
      title: data?.title || "",
      subtitle: data?.subtitle || "",
      ques_img: { name: data?.ques_img || null }, // Only storing name
      ques_img_preview: data?.ques_img
        ? getS3ImageUrl("student_question", data?.ques_img)
        : null,
      question: data?.question || "",
      options: Array.isArray(data?.options)
        ? data.options.map((opt) => ({
            text: opt.text?.text || opt.text || "", // Extract text correctly
            icon: opt.icon || null,
            icon_preview: opt.icon
              ? getS3ImageUrl("student_question/options", opt.icon)
              : null,
          }))
        : [{ text: "", icon: null }], // Ensure at least one option exists
      status: data?.status ?? true, // Ensure status defaults to true
    });
  };

  // Handle tab change without API call
  const handleChange = (event, newIndex) => {
    const newLang = languages[newIndex].code;
    setActiveLang(newLang);
    resetData();
    if (questionData) {
      updateFormData(questionData);
    }
  };

  const breadcrumbs = [
    <Typography key="1" sx={{ fontSize: "13px" }}>
      Settings
    </Typography>,
    <Link
      key="2"
      to="/admin/settings/student-questions-listing"
      style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
    >
      Questions
    </Link>,

    <Typography key="3" sx={{ fontSize: "13px" }}>
      {isEditing ? "Edit Question" : "Create Question"}
    </Typography>,
  ];

  return (
    <Container maxWidth="lg" sx={{ padding: "0px !important" }}>
      <Paper elevation={3}>
        <Box sx={{ p: 2 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {isEditing ? "Edit Question" : "Create Question"}
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
                  <StudentQuestionsForm
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
            <StudentQuestionsForm
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

export default memo(AddUpdateStudentQuestions);
