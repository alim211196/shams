import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import ImageUploadCard from "../../common/ImageUploadCard";
import CustomTextField from "../../common/CustomTextField";
import { Grid } from "@mui/material";
const PaymentMethodsWidget = ({
  lang,
  activeLang,
  setFormData,
  formData,
  handleChange,
  handleImageUpload,
}) => {
  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);

  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="Payment acceptance message">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomTextField
          name="payment_acceptance_message"
          value={formData.payment_acceptance_message}
          onChange={handleChange}
          placeholder={hideInArabicFields ? "Payment acceptance message" : ""}
          lang={lang}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <CustomLabel label="Payment Methods">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      {hideInArabicFields && (
        <>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Visa" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <ImageUploadCard
              field="payment_visa_img"
              formData={formData}
              setFormData={setFormData}
              handleImageUpload={handleImageUpload}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Mastercard" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <ImageUploadCard
              field="payment_mastercard_img"
              formData={formData}
              setFormData={setFormData}
              handleImageUpload={handleImageUpload}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default PaymentMethodsWidget;
