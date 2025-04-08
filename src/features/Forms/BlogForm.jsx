import React, { memo, useEffect, useState, useMemo, useCallback } from "react";
import {
  editorOptions,
  generateSlug,
  statusBooleanOptions,
  userType,
} from "../../utils/helper";
import { Paper, Grid } from "@mui/material";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import CustomLabel from "../../common/CustomLabel";
import CustomSelect from "../../common/CustomSelect";
import ImageUploadCard from "../../common/ImageUploadCard";
import CustomEditor from "../../common/CustomEditor";
import CustomButton from "../../common/CustomButton";
import { getAllBlogCategoryService } from "../../services/blogCategoryService";

const BlogForm = ({
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
      const response = await getAllBlogCategoryService();
      setCategories(response.result || []);
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
            <CustomLabel label="Blog Title" isRequired>
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

          {hideInArabicFields && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Category" isRequired />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomSelect
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  options={categories.map((cat) => ({
                    value: cat._id,
                    label: cat.name,
                  }))}
                  placeholder="Select Category"
                  required
                />
              </Grid>
            </>
          )}

          {hideInArabicFields && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Slug" isRequired />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomTextField
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="Slug"
                  required
                />
              </Grid>
            </>
          )}

          {hideInArabicFields && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Banner (1300x650)" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <ImageUploadCard
                  field="banner_img"
                  formData={formData}
                  setFormData={setFormData}
                  handleImageUpload={handleImageUpload}
                />
              </Grid>
            </>
          )}

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Short Description" isRequired>
              <TranslateButton />
            </CustomLabel>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomEditor
              name="short_description"
              value={formData.short_description}
              onChange={(content) =>
                setFormData((prev) => ({ ...prev, short_description: content }))
              }
              lang={lang}
              editorOptions={editorOptions}
            />
          </Grid>

          {hideInArabicFields && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="User Type" isRequired />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomSelect
                  name="user_type"
                  value={formData.user_type}
                  onChange={handleChange}
                  options={userType}
                  placeholder="Select user type"
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Status" />
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
            <CustomLabel label="Description">
              <TranslateButton />
            </CustomLabel>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomEditor
              name="description"
              value={formData.description}
              onChange={(content) =>
                setFormData((prev) => ({ ...prev, description: content }))
              }
              lang={lang}
              editorOptions={editorOptions}
            />
          </Grid>

          {hideInArabicFields && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Meta Title" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomTextField
                  name="meta_title"
                  value={formData.meta_title}
                  onChange={handleChange}
                  placeholder="Meta Title"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Meta Image (200x200)" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <ImageUploadCard
                  field="meta_img"
                  formData={formData}
                  setFormData={setFormData}
                  handleImageUpload={handleImageUpload}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Meta Description" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomEditor
                  name="meta_description"
                  value={formData.meta_description}
                  onChange={(content) =>
                    setFormData((prev) => ({
                      ...prev,
                      meta_description: content,
                    }))
                  }
                  lang={lang}
                  editorOptions={editorOptions}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Meta Keywords" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomTextField
                  name="meta_keywords"
                  value={formData.meta_keywords}
                  onChange={handleChange}
                  placeholder="Meta Keywords"
                />
              </Grid>
            </>
          )}

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

export default memo(BlogForm);
