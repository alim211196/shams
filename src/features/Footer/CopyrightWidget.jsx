import React from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomEditor from "../../common/CustomEditor";
import { editorOptions } from "../../utils/helper";
import { Grid } from "@mui/material";
const CopyrightWidget = ({ lang, formData, handleEditorChange }) => {
  return (
    <>
      <Grid size={{ xs: 12, md: 4 }}>
        <CustomLabel label="Copyright Text">
          <TranslateButton />
        </CustomLabel>
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <CustomEditor
          name="copyright_text"
          value={formData.copyright_text}
          onChange={(content) => handleEditorChange("copyright_text", content)}
          lang={lang}
          editorOptions={editorOptions}
        />
      </Grid>
    </>
  );
};

export default CopyrightWidget;
