import React, { useMemo, useState } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import RepeatableDayTime from "../../common/RepeatableDayTime";
import { Grid } from "@mui/material";
const OpeningSchedule = ({
  lang,
  activeLang,
  formData,
  handleChange,
  setFormData,
}) => {
  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);
  const [links, setLinks] = useState([]);
  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="Title">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomTextField
          name="schedule_title"
          value={formData.schedule_title}
          onChange={handleChange}
          placeholder={hideInArabicFields ? "Title" : ""}
          lang={lang}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <CustomLabel label="Opening Schedule (Translatable Days)">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <RepeatableDayTime
          hideInArabicFields={hideInArabicFields}
          lang={lang}
          links={links}
          setLinks={setLinks}
          setFormData={setFormData}
          activeLang={activeLang}
          formData={formData}
        />
      </Grid>
    </>
  );
};

export default OpeningSchedule;
