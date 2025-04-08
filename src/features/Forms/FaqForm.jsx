import React, { memo, useEffect, useState, useMemo, useCallback } from "react";
import { Paper, Grid } from "@mui/material";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import CustomLabel from "../../common/CustomLabel";
import CustomSelect from "../../common/CustomSelect";
import CustomButton from "../../common/CustomButton";
import {
  featuredOptions,
  statusBooleanOptions,
  userType,
} from "../../utils/helper";
import { getAllFaqCategoryService } from "../../services/faqCategoryService";

const FaqForm = ({
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
      const response = await getAllFaqCategoryService();
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
    }));
  };

  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: "0px !important" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
      >
        <Grid container spacing={2}>
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
                  placeholder="Select status"
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Is Featured" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomSelect
                  name="is_featured"
                  value={formData.is_featured}
                  onChange={handleChange}
                  options={featuredOptions}
                  placeholder="Select featured status"
                  required
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
            <CustomTextField
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder={hideInArabicFields ? "Description" : ""}
              required
              multiline
              minRows={5}
              lang={lang}
            />
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

export default memo(FaqForm);
