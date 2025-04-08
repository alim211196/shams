import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  editorOptions,
  generateSlug,
  statusBooleanOptions,
} from "../../utils/helper";
import { Box, Divider, Paper, Typography, Grid } from "@mui/material";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import CustomLabel from "../../common/CustomLabel";
import CustomSelect from "../../common/CustomSelect";
import ImageUploadCard from "../../common/ImageUploadCard";
import CustomEditor from "../../common/CustomEditor";
import CustomButton from "../../common/CustomButton";
import AmenitiesSelectors from "../../common/AmenitiesSelectors";
import { getAllSpaceTypesService } from "../../services/spaceTypesService";

const FacilityForm = ({
  formData,
  setFormData,
  handleSubmit,
  loading,
  lang,
  activeLang = "en",
  checkPermission,
  handleToggleAmenities,
  selectedAmenities,
}) => {
  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);
  const [spaceType, setSpaceType] = useState([]);
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

  const fetchSpaceTypes = useCallback(async () => {
    try {
      const response = await getAllSpaceTypesService();
      setSpaceType(response.result || []);
    } catch (error) {
      console.error("Error fetching space type:", error);
    }
  }, []);

  useEffect(() => {
    fetchSpaceTypes();
  }, [fetchSpaceTypes]);

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
            <CustomLabel label="Room Name" isRequired>
              <TranslateButton />
            </CustomLabel>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={hideInArabicFields ? "Room Name" : ""}
              lang={lang}
              required
            />
          </Grid>

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

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Long Description" isRequired>
              <TranslateButton />
            </CustomLabel>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomEditor
              name="long_description"
              value={formData.long_description}
              onChange={(content) =>
                setFormData((prev) => ({ ...prev, long_description: content }))
              }
              lang={lang}
              editorOptions={editorOptions}
            />
          </Grid>
          {hideInArabicFields && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Capacity" isRequired>
                  <TranslateButton />
                </CustomLabel>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomTextField
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleChange}
                  placeholder={hideInArabicFields ? "Capacity" : ""}
                  lang={lang}
                  required
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Price" isRequired>
                  <TranslateButton />
                </CustomLabel>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomTextField
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder={hideInArabicFields ? "Price" : ""}
                  lang={lang}
                  required
                />
              </Grid>
            </>
          )}
          {hideInArabicFields && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Space Type" isRequired>
                  <TranslateButton />
                </CustomLabel>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomSelect
                  name="space_type_id"
                  value={formData.space_type_id}
                  onChange={handleChange}
                  options={spaceType.map((st) => ({
                    value: st._id,
                    label: st.name,
                  }))}
                  placeholder="Select Space Type"
                  required
                />
              </Grid>
            </>
          )}

          {hideInArabicFields && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Card Image (600x350)" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <ImageUploadCard
                  field="card_img"
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
                <CustomLabel label="Banner (650x400)" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <ImageUploadCard
                  field="banner_img"
                  formData={formData}
                  setFormData={setFormData}
                  handleImageUpload={handleImageUpload}
                />
              </Grid>
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

          <Grid size={{ xs: 12 }}>
            <AmenitiesSelectors
              handleToggleAmenities={handleToggleAmenities}
              selectedAmenities={selectedAmenities}
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

export default memo(FacilityForm);
