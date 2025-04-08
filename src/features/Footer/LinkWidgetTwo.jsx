import React, { useMemo, useState } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import TranslatableLinks from "../../common/TranslatableLinks";
import { Grid } from "@mui/material";
const LinkWidgetTwo = ({
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
          name="link2_title"
          value={formData.link2_title}
          onChange={handleChange}
          placeholder={hideInArabicFields ? "Title" : ""}
          lang={lang}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <CustomLabel label="Links (Translatable Label)">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 12 }}>
        <TranslatableLinks
          hideInArabicFields={hideInArabicFields}
          lang={lang}
          links={links}
          setLinks={setLinks}
          formData={formData}
          handleChange={handleChange}
          setFormData={setFormData}
          activeLang={activeLang}
          labelField={"link_list2_label"}
          urlField={"link_list2_url"}
        />
      </Grid>
    </>
  );
};

export default LinkWidgetTwo;
