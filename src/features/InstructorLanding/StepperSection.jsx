import React from "react";
import CustomTextField from "../../common/CustomTextField";
import ImageUploadCard from "../../common/ImageUploadCard";
import CustomLabel from "../../common/CustomLabel";
import ListingSection from "./ListingSection";
import TranslateButton from "../../common/TranslateButton";
import { Grid } from "@mui/material";
const StepperSection = ({
  step,
  handleChange,
  hideInArabicFields,
  lang,
  handleImageUpload,
  formData,
  setFormData,
}) => {
  return (
    <Grid size={{ xs: 12 }}>
      <Grid
        container
        spacing={2}
        sx={{
          mb: 1,
          border: "1px dashed #ddd",
          p: 2,
          borderRadius: "5px",
        }}
      >
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label={`Step ${step}`}>
            <TranslateButton />
          </CustomLabel>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <CustomTextField
            name={`instructor_section4_step${step}`}
            value={formData[`instructor_section4_step${step}`]} // Accessing dynamic key from formData
            onChange={handleChange}
            placeholder={hideInArabicFields ? `Step ${step}` : ""}
            lang={lang}
          />
        </Grid>
        {hideInArabicFields && (
          <>
            <Grid size={{ xs: 12, md: 4 }}>
              <CustomLabel label={`Step${step} Image (560x520)`} />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <ImageUploadCard
                field={`instructor_section4_step${step}_img`}
                formData={formData}
                setFormData={setFormData}
                handleImageUpload={handleImageUpload}
              />
            </Grid>
          </>
        )}
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label="List Heading">
            <TranslateButton />
          </CustomLabel>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CustomTextField
            name={`instructor_section4_step${step}_list_heading`}
            value={
              formData?.[`instructor_section4_step${step}_list_heading`] || ""
            }
            onChange={handleChange}
            placeholder={hideInArabicFields ? "List Heading" : ""}
            lang={lang}
          />
        </Grid>
        <ListingSection
          step={step}
          lang={lang}
          hideInArabicFields={hideInArabicFields}
          handleChange={handleChange}
          formData={formData}
          setFormData={setFormData}
        />
      </Grid>
    </Grid>
  );
};

export default StepperSection;
