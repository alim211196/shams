import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import { FormControlLabel, Grid } from "@mui/material";
import { CustomSwitch } from "../../layouts/helper";
import CustomTextField from "../../common/CustomTextField";
const HeaderSetting = ({
  lang,
  activeLang,
  formData,
  handleChange,
  handleToggle,
}) => {
  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);

  return (
    hideInArabicFields && (
      <>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label="Show Language Switcher?" />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <FormControlLabel
            control={
              <CustomSwitch
                sx={{ m: 1 }}
                checked={formData.show_language_switcher === "true"}
                onChange={handleToggle("show_language_switcher")}
              />
            }
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label="Enable sticky header?" />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <FormControlLabel
            control={
              <CustomSwitch
                sx={{ m: 1 }}
                checked={formData.enable_sticky_header === "true"}
                onChange={handleToggle("enable_sticky_header")}
              />
            }
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label="Help line number" />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <CustomTextField
            name="helpline_number"
            value={formData.helpline_number}
            onChange={handleChange}
            placeholder={"Help line number"}
            lang={lang}
          />
        </Grid>
      </>
    )
  );
};

export default HeaderSetting;
