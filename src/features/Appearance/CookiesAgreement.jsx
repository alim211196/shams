import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import CustomEditor from "../../common/CustomEditor";
import { editorOptions } from "../../utils/helper";
import { CustomSwitch } from "../../layouts/helper";
import { FormControlLabel, Grid } from "@mui/material";
const CookiesAgreement = ({
  lang,
  activeLang,
  formData,
  handleChange,
  setFormData,
  handleEditorChange,
  handleToggle,
}) => {
  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);

  return (
    <>
      {hideInArabicFields && (
        <>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Show Cookies Agreement?" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <FormControlLabel
              control={
                <CustomSwitch
                  sx={{ m: 1 }}
                  checked={formData.show_cookies_agreement === "true"}
                  onChange={handleToggle("show_cookies_agreement")}
                />
              }
            />
          </Grid>
        </>
      )}

      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="Cookies Agreement Text" />
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomEditor
          name="cookies_agreement"
          value={formData.cookies_agreement}
          onChange={(content) =>
            handleEditorChange("cookies_agreement", content)
          }
          lang={lang}
          editorOptions={editorOptions}
        />
      </Grid>
    </>
  );
};

export default CookiesAgreement;
