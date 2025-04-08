import React, { useMemo } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomEditor from "../../common/CustomEditor";
import { editorOptions, socialMediaLinks } from "../../utils/helper";
import {
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { CustomSwitch } from "../../layouts/helper";
import { AccountCircle } from "@mui/icons-material";
import * as Icons from "@mui/icons-material";
const SocialLinkWidget = ({
  activeLang,
  lang,
  formData,
  handleChange,
  handleToggle,
}) => {
  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);
  return (
    hideInArabicFields && (
      <>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label="Show Social Links?" />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <FormControlLabel
            control={
              <CustomSwitch
                sx={{ m: 1 }}
                checked={formData.show_social_links === "true"}
                onChange={handleToggle("show_social_links")}
              />
            }
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CustomLabel label="Social Links" />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={2}>
            {socialMediaLinks.map((link) => {
              const IconComponent = Icons[link.icon] || Icons.Public;
              return (
                <Grid size={{ xs: 12 }} key={link.name}>
                  <TextField
                    // value={link.label}
                    name={link.label}
                    value={formData[link.label]}
                    onChange={handleChange}
                    fullWidth
                    placeholder="https://"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            {IconComponent ? (
                              <IconComponent sx={{ color: "#BDBDBD" }} />
                            ) : null}
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </>
    )
  );
};

export default SocialLinkWidget;
