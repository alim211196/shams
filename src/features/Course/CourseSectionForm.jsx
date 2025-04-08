import CustomTextField from "../../common/CustomTextField";
import CustomLabel from "../../common/CustomLabel";
import CustomSelect from "../../common/CustomSelect";
import { statusBooleanOptions } from "../../utils/helper";
import { Grid } from "@mui/material";

const CourseSectionForm = ({ formData, handleChange, lang, courses }) => {
  return (
    <>
      <Grid item xs={12} md={4}>
        <CustomLabel label="Section Name" isRequired />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <CustomTextField
          name="section_name"
          value={formData?.section_name || ""}
          onChange={handleChange}
          placeholder="Section Name"
          lang={lang}
          required
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <CustomLabel label="Duration" />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <CustomTextField
          name="section_duration"
          value={formData?.section_duration || ""}
          onChange={handleChange}
          placeholder="Duration"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <CustomLabel label="Course" isRequired />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <CustomSelect
          name="course_id"
          value={formData?.course_id || ""}
          onChange={handleChange}
          options={courses?.map((course) => ({
            value: course._id,
            label: course.title,
          }))}
          placeholder="Select Course"
          required
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <CustomLabel label="Status" />
      </Grid>
      <Grid item xs={12} md={8} mb={2}>
        <CustomSelect
          name="section_status"
          value={formData?.section_status || ""}
          onChange={handleChange}
          options={statusBooleanOptions}
          placeholder="Select Status"
        />
      </Grid>
    </>
  );
};

export default CourseSectionForm;
