import CustomTextField from "../../common/CustomTextField";
import CustomLabel from "../../common/CustomLabel";
import CustomSelect from "../../common/CustomSelect";
import ImageUploadCard from "../../common/ImageUploadCard";
import CustomEditor from "../../common/CustomEditor";
import {
  editorOptions,
  sessionTypeOptions,
  difficultyOptions,
  trendingOptions,
  featuredOptions,
  certificateOptions,
  statusBooleanOptions,
} from "../../utils/helper";
import { Grid } from "@mui/material";

const CourseContentForm = ({
  formData,
  handleChange,
  handleImageUpload,
  lang,
  setFormData,
  categories,
  tutors,
}) => {
  return (
    <>
      <Grid item xs={12} md={4}>
        <CustomLabel label="Course Title" isRequired />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <CustomTextField
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          placeholder="Title"
          lang={lang}
          required
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CustomLabel label="Category" isRequired />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <CustomSelect
          name="category_id"
          value={formData.category_id || ""}
          onChange={handleChange}
          options={categories.map((cat) => ({
            value: cat._id,
            label: cat.name,
          }))}
          placeholder="Select Category"
          required
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CustomLabel label="Tutor" isRequired />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <CustomSelect
          name="tutor_id"
          value={formData.tutor_id || ""}
          onChange={handleChange}
          options={tutors.map((tut) => ({
            value: tut._id,
            label: tut.fname,
          }))}
          placeholder="Select Tutor"
          required
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CustomLabel label="Overview" />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <CustomEditor
          name="overview"
          value={formData.overview || ""}
          onChange={(content) =>
            setFormData((prev) => ({ ...prev, overview: content }))
          }
          lang={lang}
          editorOptions={editorOptions}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CustomLabel label="Description" isRequired />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <CustomEditor
          name="description"
          value={formData.description || ""}
          onChange={(content) =>
            setFormData((prev) => ({ ...prev, description: content }))
          }
          lang={lang}
          editorOptions={editorOptions}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CustomLabel label="Price" isRequired />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <CustomTextField
          name="price"
          value={formData.price || ""}
          onChange={handleChange}
          placeholder="Price"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CustomLabel label="Certificate" />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <CustomSelect
          name="certificate"
          value={formData.certificate || ""}
          onChange={handleChange}
          options={certificateOptions}
          placeholder="Enable Certificates"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CustomLabel label="Duration" />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <CustomTextField
          name="duration"
          value={formData.duration || ""}
          onChange={handleChange}
          placeholder="Duration"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CustomLabel label="Discount" />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <CustomTextField
          name="discount"
          value={formData.discount || ""}
          onChange={handleChange}
          placeholder="Discount"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CustomLabel label="Featured" />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <CustomSelect
          name="featured"
          value={formData.featured || ""}
          onChange={handleChange}
          options={featuredOptions}
          placeholder="Featured Course"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CustomLabel label="Trending" />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <CustomSelect
          name="trending"
          value={formData.trending || ""}
          onChange={handleChange}
          options={trendingOptions}
          placeholder="Trending Course"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CustomLabel label="Session Type" isRequired />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <CustomSelect
          name="session_type"
          value={formData.session_type || ""}
          onChange={handleChange}
          options={sessionTypeOptions}
          placeholder="Select Session Type"
          required
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CustomLabel label="Tags" />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <CustomTextField
          name="tags"
          value={formData.tags || ""}
          onChange={handleChange}
          placeholder="Tags"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CustomLabel label="Difficulty" />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <CustomSelect
          name="difficulty"
          value={formData.difficulty || ""}
          onChange={handleChange}
          options={difficultyOptions}
          placeholder="Select Difficulty"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CustomLabel label="Intro Video" />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <ImageUploadCard
          field="intro_video"
          formData={formData}
          setFormData={setFormData}
          handleImageUpload={handleImageUpload}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CustomLabel label="Thumbnail Image (1300x650)" isRequired />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <ImageUploadCard
          field="thumbnail_image"
          formData={formData}
          setFormData={setFormData}
          handleImageUpload={handleImageUpload}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CustomLabel label="Language" isRequired />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <CustomTextField
          name="language"
          value={formData.language || ""}
          onChange={handleChange}
          placeholder="Language"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <CustomLabel label="Status" />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <CustomSelect
          name="status"
          value={formData.status || ""}
          onChange={handleChange}
          options={statusBooleanOptions}
          placeholder="Select Status"
        />
      </Grid>
    </>
  );
};

export default CourseContentForm;
