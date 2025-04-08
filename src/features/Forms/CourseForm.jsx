import { memo, useEffect, useState, useCallback, useMemo } from "react";
import { generateSlug } from "../../utils/helper";
import { getCategoryService } from "../../services/categoryService";
import { getInstructorService } from "../../services/instructorService";
import { getCourseService } from "../../services/courseService";
import {
  updateCourseSectionStatus,
  deleteCourseSectionServiceById,
} from "../../services/courseSectionService";
import {
  Box,
  Button,
  FormControlLabel,
  Paper,
  Typography,
  useMediaQuery,
  Grid,
} from "@mui/material";
import CustomButton from "../../common/CustomButton";
import { useTheme } from "@emotion/react";
import HorizontalTabs from "../../common/HorizontalTabs";
import { CustomSwitch } from "../../layouts/helper";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import CustomMaterialTable from "../../common/CustomMaterialTable";
import { openModal } from "../../redux/slices/deleteModalSlice";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import { Add } from "@mui/icons-material";
import AddSectionModal from "./AddSectionModal";
import {
  getCourseQuizService,
  getCourseLectureService,
  getCourseContentService,
  createCourseQuizService,
  createCourseContentService,
  createCourseLectureService,
  deleteCourseQuizServiceById,
  deleteCourseContentServiceById,
  deleteCourseLectureServiceById,
  getCourseContentServiceById,
  getCourseQuizServiceById,
  getCourseLectureServiceById,
} from "../../services/courseContentService";
import CourseContentForm from "../Course/CourseContentForm";
import SectionContentForm from "../Course/SectionContentForm";
import CourseSectionForm from "../Course/CourseSectionForm";
const tabNames = ["Course", "Section"];

const CourseForm = ({
  formData,
  setFormData,
  handleSubmit,
  loading,
  lang,
  isEditing = false,
  fetchCourseSections,
  sections,
  rowCount,
  getCourseSectionById,
  // activeLang = "en",
  // checkPermission,
}) => {
  const [categories, setCategories] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [courses, setCourses] = useState([]);
  const theme = useTheme();
  const [tabValue, setTabValue] = useState("Course");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [contentType, setContentType] = useState("external_content");
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [sectionContentId, setSectionContentId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [courseContent, setCourseContent] = useState([]);
  const [courseContentQuiz, setCourseContentQuiz] = useState([]);
  const [courseContentLesson, setCourseContentLesson] = useState([]);
  const [sectionTabValue, setSectionTabValue] = useState(0);
  const [contentFormData, setContentFormData] = useState({
    title: "",
    course_section_id: null,
    file: null,
  });
  const [videoFile, setVideoFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [quizFields, setQuizFields] = useState({
    title: "",
    question_text: "",
    question_type: "single_choice",
    options: [{ option_text: "", is_correct: false }],
    marks: 1,
  });

  const handleTabChange = (event, newValue) => {
    setSectionTabValue(newValue);
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  // Handle changes in quiz-specific fields
  const handleQuizFieldChange = (e) => {
    const { name, value } = e.target;
    setQuizFields((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes in quiz options
  const handleOptionChange = (index, field, value) => {
    const updatedOptions = quizFields.options.map((option, i) =>
      i === index ? { ...option, [field]: value } : option
    );
    setQuizFields((prev) => ({ ...prev, options: updatedOptions }));
  };

  // Add a new option field
  const addOption = () => {
    setQuizFields((prev) => ({
      ...prev,
      options: [...prev.options, { option_text: "", is_correct: false }],
    }));
  };

  // Remove an option field
  const removeOption = (index) => {
    const updatedOptions = quizFields.options.filter((_, i) => i !== index);
    setQuizFields((prev) => ({ ...prev, options: updatedOptions }));
  };

  const handleAddContent = (sectionId) => {
    setSelectedSectionId(sectionId);
    setIsOpen(true);
  };

  const handleClose = () => {
    setContentFormData({
      title: "",
      course_section_id: null,
      status: "1",
      file: null,
    });
    setQuizFields({
      title: "",
      question_text: "",
      question_type: "single_choice",
      options: [{ option_text: "", is_correct: false }],
      marks: 1,
    });
    setContentType("external_content");
    setSectionContentId(null);
    setSelectedSectionId(null);
    setPdfFile(null);
    setVideoFile(null);
    setIsOpen(false);
  };

  const handleContentTypeChange = (e) => {
    setContentType(e.target.value);
  };

  const fetchCategories = useCallback(async () => {
    try {
      const response = await getCategoryService();
      setCategories(response?.data?.result?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  const fetchTutors = useCallback(async () => {
    try {
      const response = await getInstructorService();
      setTutors(response?.data?.result?.data || []);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  }, []);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await getCourseService();
      setCourses(response?.data?.result?.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }, []);

  const fetchCourseContent = useCallback(async () => {
    try {
      const response = await getCourseContentService();
      if (response.data.success) {
        setCourseContent(response.data.result.data);
      }
    } catch (error) {
      console.error("Error fetching course content:", error);
    }
  }, []);

  const fetchCourseLecture = useCallback(async () => {
    try {
      const response = await getCourseLectureService();
      if (response.data.success) {
        setCourseContentLesson(response.data.result.data);
      }
    } catch (error) {
      console.error("Error fetching course content:", error);
    }
  }, []);

  const fetchCourseQuiz = useCallback(async () => {
    try {
      const response = await getCourseQuizService();
      if (response.data.success) {
        setCourseContentQuiz(response.data.result.data);
      }
    } catch (error) {
      console.error("Error fetching course content:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchTutors();
    fetchCourses();
  }, [fetchCategories, fetchTutors, fetchCourses]);

  useEffect(() => {
    if (tabValue === "Section") {
      fetchCourseSections();
      fetchCourseContent();
      fetchCourseQuiz();
      fetchCourseLecture();
    }
  }, [
    tabValue,
    fetchCourseSections,
    fetchCourseContent,
    fetchCourseQuiz,
    fetchCourseLecture,
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "title" && prev.slug === generateSlug(prev.title)
        ? { slug: generateSlug(value) }
        : {}),
    }));
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [field]: {
            name: file.name,
            size: file.size,
            type: file.type,
            base64: reader.result,
          },
        }));
      };
    }
  };

  const renderFormContent = () => {
    switch (tabValue) {
      case "Course":
        return (
          <CourseContentForm
            formData={formData}
            handleChange={handleChange}
            lang={lang}
            setFormData={setFormData}
            handleImageUpload={handleImageUpload}
            categories={categories}
            tutors={tutors}
          />
        );
      case "Section":
        return (
          <CourseSectionForm
            formData={formData}
            handleChange={handleChange}
            lang={lang}
            courses={courses}
          />
        );
      default:
        return (
          <CourseContentForm
            formData={formData}
            handleChange={handleChange}
            lang={lang}
            setFormData={setFormData}
            handleImageUpload={handleImageUpload}
            categories={categories}
            tutors={tutors}
          />
        );
    }
  };

  const handleChangeStatus = async (id, status) => {
    const newStatus = status === true ? "0" : "1";
    try {
      const response = await updateCourseSectionStatus(id, {
        status: newStatus,
      });
      if (response?.status === 200) {
        toast.success("Status Updated Successfully:", response.data);
        fetchCourseSections();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 200,
        Cell: ({ renderedCellValue }) => (
          <Typography variant="caption">{renderedCellValue}</Typography>
        ),
      },
      {
        accessorKey: "duration",
        header: "Duration",
        size: 300,
        Cell: ({ renderedCellValue }) => (
          <Typography variant="caption">{renderedCellValue}</Typography>
        ),
      },

      {
        accessorKey: "status",
        header: "Status",
        size: 80,
        Cell: ({ renderedCellValue, row }) => (
          <FormControlLabel
            control={
              <CustomSwitch
                sx={{ m: 1 }}
                id={`switch-${row.original._id}`}
                checked={renderedCellValue === true}
                onChange={() =>
                  handleChangeStatus(row.original._id, renderedCellValue)
                }
              />
            }
            label=""
          />
        ),
      },
    ],
    []
  );

  const handleContentSubmit = async () => {
    if (contentType === "quiz") {
      const quizData = {
        id: sectionContentId,
        title: quizFields.title,
        lesson_type: contentType,
        course_section_id: selectedSectionId,
        questions: [
          {
            question_text: quizFields.question_text,
            question_type: "single_choice",
            marks: quizFields.marks,
            options: quizFields.options.map((option) => ({
              option_text: option.option_text,
              is_correct: option.is_correct,
            })),
          },
        ],
      };
      try {
        let response;
        response = await createCourseQuizService(quizData);
        if (response.data.success) {
          toast.success("Quiz added successfully!");
          fetchCourseQuiz();
          handleClose();
        } else {
          toast.error("Failed to add quiz.");
        }
      } catch (error) {
        console.error("Error submitting quiz:", error);
        toast.error("An error occurred while adding quiz.");
      }
    } else {
      const formData = new FormData();
      formData.append("id", sectionContentId);
      formData.append("title", contentFormData.title);
      formData.append("course_section_id", selectedSectionId);
      formData.append("file", contentFormData.file);
      try {
        const response =
          contentType === "lesson"
            ? await createCourseLectureService(formData)
            : await createCourseContentService(formData);
        if (response.data.success) {
          toast.success("Content added successfully!");
          contentType === "lesson"
            ? fetchCourseLecture()
            : fetchCourseContent();
          handleClose();
        } else {
          toast.error("Failed to add content.");
        }
      } catch (error) {
        console.error("Error submitting content:", error);
        toast.error("An error occurred while adding content.");
      }
    }
  };

  const handleDeleteContent = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this section?",
        onConfirm: () => handleDeleteQuizConfirm(id),
      })
    );
  };

  const handleDeleteQuizConfirm = async (id) => {
    try {
      let response = "";
      if (sectionTabValue === 0) {
        response = await deleteCourseQuizServiceById(id);
        if (response.status === 200) {
          toast.success("Quiz deleted successfully!");
          fetchCourseSections(pagination.pageIndex, pagination.pageSize);
          fetchCourseQuiz();
        }
      } else if (sectionTabValue === 1) {
        response = await deleteCourseLectureServiceById(id);
        if (response.status === 200) {
          toast.success("content deleted successfully!");
          fetchCourseSections(pagination.pageIndex, pagination.pageSize);
          fetchCourseLecture();
        }
      } else {
        response = await deleteCourseContentServiceById(id);
        if (response.status === 200) {
          toast.success("content deleted successfully!");
          fetchCourseSections(pagination.pageIndex, pagination.pageSize);
          fetchCourseContent();
        }
      }
    } catch (error) {
      toast.error("An error occurred while deleting the sections.");
    }
  };

  const handleEditContent = async (contentId) => {
    try {
      let response = null;
      if (sectionTabValue === 0) {
        response = await getCourseQuizServiceById(contentId);
        setContentType("quiz");
        if (response.data.success) {
          const quizData = response.data.result;
          setSectionContentId(quizData._id);
          setSelectedSectionId(quizData.course_section_id);
          setQuizFields({
            title: quizData?.title,
            question_text: quizData?.questions[0].question_text,
            question_type: quizData?.questions[0].question_type,
            marks: quizData?.questions[0].marks,
            options: quizData?.questions[0].options.map((option) => ({
              option_text: option?.option_text,
              is_correct: option?.is_correct,
            })),
          });
        }
      } else if (sectionTabValue === 1) {
        response = await getCourseLectureServiceById(contentId);
        setContentType("lesson");
        if (response.data.success) {
          setSectionContentId(response.data.result._id);
          setSelectedSectionId(response.data.result.course_section_id);
          setContentFormData({
            title: response.data.result.title,
            course_section_id: response.data.result.course_section_id,
            file: response.data.result.file,
          });
          setVideoFile(response.data.result.file);
        }
      } else {
        response = await getCourseContentServiceById(contentId);
        setContentType("external_content");
        if (response.data.success) {
          setSectionContentId(response.data.result._id);
          setSelectedSectionId(response.data.result.course_section_id);
          setContentFormData({
            title: response.data.result.title,
            course_section_id: response.data.result.course_section_id,
            file: response.data.result.file,
          });
          setPdfFile(response.data.result.file);
        }
      }
      setIsOpen(true);
    } catch (error) {
      console.error("Error fetching content:", error);
      toast.error("An error occurred while fetching the content.");
    }
  };

  const handleDelete = (id) => {
    dispatch(
      openModal({
        description: "Do you want to delete this section?",
        onConfirm: () => handleDeleteConfirm(id),
      })
    );
  };

  const handleDeleteConfirm = async (id) => {
    try {
      const response = await deleteCourseSectionServiceById(id);
      if (response.status === 200) {
        toast.success("Section deleted successfully!");
        fetchCourseSections(pagination.pageIndex, pagination.pageSize);
      } else {
        toast.error("Failed to delete section!");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the sections.");
    }
  };

  const handleEdit = (tid) => {
    getCourseSectionById(tid);
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{ p: 3, borderRadius: "0px !important", overflow: "hidden" }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(formData, tabValue);
          }}
        >
          {/* <Grid container spacing={2}> */}
          {isEditing && (
            <Grid item xs={12} mb={2}>
              <HorizontalTabs
                handleChange={(newValue) => setTabValue(newValue)}
                value={tabValue}
                tabs={tabNames}
                isCouseSection={true}
              />
            </Grid>
          )}

          {renderFormContent()}

          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <CustomButton type="submit" color="primary" loading={loading}>
              Save
            </CustomButton>
          </Grid>
        </form>
        {tabValue === "Section" && (
          <CustomMaterialTable
            data={sections}
            columns={columns}
            pagination={pagination}
            setPagination={setPagination}
            loading={loading}
            rowCount={rowCount}
            title={"Section"}
            tableTitle={"Course Sections"}
            handleEdit={handleEdit}
            isCourseListing={true}
            handleDelete={handleDelete}
            isMobile={isMobile}
            detailPanel={(rowData) => {
              return (
                <Box sx={{ padding: "16px", backgroundColor: "#f9f9f9" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => handleAddContent(rowData._id)}
                  >
                    Add Content
                  </Button>
                  <Box>
                    <SectionContentForm
                      sectionId={rowData?._id}
                      courseContent={courseContent}
                      courseContentQuiz={courseContentQuiz}
                      courseContentLesson={courseContentLesson}
                      handleEditContent={handleEditContent}
                      handleDeleteContent={handleDeleteContent}
                      sectionTabValue={sectionTabValue}
                      handleTabChange={handleTabChange}
                    />
                  </Box>
                </Box>
              );
            }}
          />
        )}
        <AddSectionModal
          open={isOpen}
          handleClose={handleClose}
          handleContentTypeChange={handleContentTypeChange}
          contentType={contentType}
          selectedSectionId={selectedSectionId}
          handleSubmit={handleContentSubmit}
          setContentFormData={setContentFormData}
          contentFormData={contentFormData}
          setVideoFile={setVideoFile}
          setPdfFile={setPdfFile}
          pdfFile={pdfFile}
          videoFile={videoFile}
          handleQuizFieldChange={handleQuizFieldChange}
          addOption={addOption}
          removeOption={removeOption}
          handleOptionChange={handleOptionChange}
          quizFields={quizFields}
        />
        <DeleteConfirmationModal />
      </Paper>
    </>
  );
};
export default memo(CourseForm);
