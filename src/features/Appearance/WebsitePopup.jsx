import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import { editorOptions } from "../../utils/helper";
import { CustomSwitch } from "../../layouts/helper";
import { FormControlLabel, Grid } from "@mui/material";
import CustomEditor from "../../common/CustomEditor";
const WebsitePopup = ({
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
            <CustomLabel label="Show website popup?" />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <FormControlLabel
              control={
                <CustomSwitch
                  sx={{ m: 1 }}
                  checked={formData.show_website_popup === "true"}
                  onChange={handleToggle("show_website_popup")}
                />
              }
            />
          </Grid>
        </>
      )}

      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="Popup content" />
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomEditor
          name="popup_content"
          value={formData.popup_content}
          onChange={(content) => handleEditorChange("popup_content", content)}
          lang={lang}
          editorOptions={editorOptions}
        />
      </Grid>
    </>
  );
};

export default WebsitePopup;
