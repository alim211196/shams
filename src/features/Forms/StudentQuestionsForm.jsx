import React, { memo, useEffect, useState, useMemo, useCallback } from "react";
import { generateSlug, statusBooleanOptions } from "../../utils/helper";
import { getCategoryService } from "../../services/categoryService";
import { Paper, Grid } from "@mui/material";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import CustomLabel from "../../common/CustomLabel";
import CustomSelect from "../../common/CustomSelect";
import ImageUploadCard from "../../common/ImageUploadCard";
import CustomButton from "../../common/CustomButton";
import AddOptions from "../../common/AddOptions";

const StudentQuestionsForm = ({
  formData,
  setFormData,
  handleSubmit,
  loading,
  lang,
  activeLang = "en",
  checkPermission,
}) => {
  const [categories, setCategories] = useState([]);

  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await getCategoryService();
      setCategories(response.data.result?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title" && prev.slug === generateSlug(prev.title)
        ? { slug: generateSlug(value) }
        : {}),
    }));
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file); // For preview purposes
      setFormData((prev) => ({
        ...prev,
        [field]: file, // Store actual file object (not URL)
        [`${field}_preview`]: previewUrl, // Optional for UI preview
      }));
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: "0px !important" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
        encType="multipart/form-data"
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Title" isRequired>
              <TranslateButton />
            </CustomLabel>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={hideInArabicFields ? "Title" : ""}
              lang={lang}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Sub Title" isRequired>
              <TranslateButton />
            </CustomLabel>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder={hideInArabicFields ? "Sub Title" : ""}
              lang={lang}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Question" isRequired>
              <TranslateButton />
            </CustomLabel>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder={hideInArabicFields ? "Question" : ""}
              lang={lang}
              required
            />
          </Grid>

          {hideInArabicFields && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Question Image" isRequired />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <ImageUploadCard
                  field="ques_img"
                  formData={formData}
                  setFormData={setFormData}
                  handleImageUpload={handleImageUpload}
                />
              </Grid>
            </>
          )}

          {hideInArabicFields && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Status" isRequired />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomSelect
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={statusBooleanOptions}
                  placeholder="Select Status"
                  required
                />
              </Grid>
            </>
          )}
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Add Options" isRequired>
              <TranslateButton />
            </CustomLabel>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <AddOptions formData={formData} setFormData={setFormData} />
          </Grid>

          <Grid size={{ xs: 12 }} display="flex" justifyContent="flex-end">
            <CustomButton
              type="submit"
              color="primary"
              loading={loading}
              disabled={!checkPermission}
            >
              Save
            </CustomButton>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default memo(StudentQuestionsForm);
