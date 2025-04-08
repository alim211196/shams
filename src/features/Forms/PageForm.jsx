import React, { memo, useMemo } from "react";
import {
  editorOptions,
  generateSlug,
  statusBooleanOptions,
} from "../../utils/helper";
import { Paper, Grid } from "@mui/material";
import CustomTextField from "../../common/CustomTextField";
import CustomLabel from "../../common/CustomLabel";
import CustomSelect from "../../common/CustomSelect";
import ImageUploadCard from "../../common/ImageUploadCard";
import CustomEditor from "../../common/CustomEditor";
import CustomButton from "../../common/CustomButton";
import SlugTextField from "../../common/SlugTextField";
import TranslateButton from "../../common/TranslateButton";

const PageForm = ({
  formData,
  setFormData,
  handleSubmit,
  loading,
  lang,
  activeLang = "en",
  checkPermission,
}) => {
  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);

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
              placeholder={"Title"}
              lang={lang}
              required
            />
          </Grid>
          {hideInArabicFields && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Link" isRequired />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <SlugTextField
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="Slug"
                  baseURL="http://localhost:3000/"
                />
              </Grid>
            </>
          )}

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Description" isRequired>
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

              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Meta Title" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomTextField
                  name="meta_title"
                  value={formData.meta_title}
                  onChange={handleChange}
                  placeholder="Title"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Meta Description" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomTextField
                  name="meta_description"
                  value={formData.meta_description}
                  onChange={handleChange}
                  placeholder="Description"
                  multiline
                  minRows={5}
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
                  placeholder="Keyword, Keyword"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Meta Image" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <ImageUploadCard
                  field="meta_img"
                  formData={formData}
                  setFormData={setFormData}
                  handleImageUpload={handleImageUpload}
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
              Save Page
            </CustomButton>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default memo(PageForm);
