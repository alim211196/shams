import React, { memo, useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  FormControlLabel,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import LanguageTabs from "../common/LanguageTabs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getS3ImageUrl } from "../utils/helper";
import {
  createSettingsService,
  getAllSettingsService,
} from "../services/websiteSettingService";
import CustomLabel from "../common/CustomLabel";
import { CustomSwitch } from "../layouts/helper";
import CustomTextField from "../common/CustomTextField";
import CustomButton from "../common/CustomButton";
import ImageUploadCard from "../common/ImageUploadCard";
import TranslateButton from "../common/TranslateButton";
import NavBarMenu from "../features/Header/NavBarMenu";

const Header = () => {
  const { languages } = useSelector((state) => state.languages);
  const [formData, setFormData] = useState({ en: {}, ar: {} });
  const [loading, setLoading] = useState(false);
  const [activeLang, setActiveLang] = useState("en");

  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);
  useEffect(() => {
    const fetchSettings = async () => {
      setFormData((prev) => ({ ...prev, [activeLang]: {} }));
      try {
        const response = await getAllSettingsService(activeLang);
        const data = response?.data || {};
        const settingsObj = {};

        data.forEach((item) => {
          if (item.key.endsWith("_img")) {
            settingsObj[item.key] = { name: item.value || null };
            settingsObj[`${item.key}_preview`] = item.value
              ? getS3ImageUrl("settings", item.value)
              : null;
          } else {
            settingsObj[item.key] = item.value;
          }
        });
        setFormData((prev) => ({
          ...prev,
          [activeLang]: {
            ...settingsObj,
          },
        }));
      } catch (error) {
        setFormData((prev) => ({ ...prev, [activeLang]: {} }));
      }
    };
    fetchSettings();
  }, [activeLang]);

  const handleTabChange = (event, newIndex) => {
    setActiveLang(languages[newIndex].code);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [activeLang]: {
        ...prev[activeLang], // Preserve existing language-specific values
        [name]: Array.isArray(prev[activeLang]?.[name]) // Check if value is an array
          ? value.split(",") // Convert comma-separated input into an array
          : value, // Otherwise, store it as a normal value
      },
    }));
  };

  const handleToggle = (name) => (e) => {
    const { checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [activeLang]: {
        ...prev[activeLang],
        [name]: checked ? "true" : "false",
      },
    }));
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file); // For preview purposes
      setFormData((prev) => ({
        ...prev,
        [activeLang]: {
          ...prev[activeLang], // Preserve existing language data
          [field]: file, // Store actual file object
          [`${field}_preview`]: previewUrl, // Optional for UI preview
        },
      }));
    }
  };

  const handleSubmit = async (data) => {
    setLoading(true);

    const formData = new FormData();
    const settingsArray = [];

    // ✅ Filter out preview keys
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => !key.endsWith("_preview"))
    );

    // ✅ Append files and other fields separately
    Object.entries(filteredData).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value); // ✅ Append file directly
      } else if (typeof value === "object" && value?.name) {
        formData.append(key, value.name); // ✅ Extract filename from { name: "image.jpg" }
        settingsArray.push({ key, value: value.name, lang: activeLang }); // ✅ Store only the filename in JSON
      } else {
        settingsArray.push({ key, value, lang: activeLang });
      }
    });

    // ✅ Append settings as JSON string
    formData.append("settings", JSON.stringify(settingsArray));
    formData.append("lang", activeLang);

    try {
      await createSettingsService(formData);
      toast.success("Settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ padding: "0px !important" }}>
      <Box sx={{ p: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "1rem",
            fontWeight: "bold",
            textTransform: "capitalize",
            display: "flex",
            alignItems: "center",
          }}
        >
          Website Header
        </Typography>
      </Box>
      <Paper elevation={3}>
        <LanguageTabs handleChange={handleTabChange} activeLang={activeLang}>
          {languages.map((lang) => (
            <div key={lang._id} style={{ overflow: "hidden" }}>
              <Paper elevation={2} sx={{ p: 3 }}>
                {lang.code === activeLang && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(formData[activeLang]);
                    }}
                    encType="multipart/form-data"
                  >
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 4 }}>
                        <CustomLabel label="Promo Banner">
                          <TranslateButton />
                        </CustomLabel>
                      </Grid>
                      <Grid size={{ xs: 12, md: 8 }}>
                        <CustomTextField
                          name="promo_banner"
                          value={formData[activeLang].promo_banner}
                          onChange={handleChange}
                          placeholder={hideInArabicFields ? "Promo banner" : ""}
                          lang={lang}
                        />
                      </Grid>
                      {hideInArabicFields && (
                        <>
                          <Grid size={{ xs: 12, md: 4 }}>
                            <CustomLabel label="Enroll Link" />
                          </Grid>
                          <Grid size={{ xs: 12, md: 8 }}>
                            <CustomTextField
                              name="enroll_link"
                              value={formData[activeLang].enroll_link}
                              onChange={handleChange}
                              placeholder={"enroll link"}
                              lang={lang}
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 4 }}>
                            <CustomLabel label="Show Promo Banner?" />
                          </Grid>
                          <Grid size={{ xs: 12, md: 8 }}>
                            <FormControlLabel
                              control={
                                <CustomSwitch
                                  sx={{ m: 1 }}
                                  checked={
                                    formData[activeLang].show_promo_banner ===
                                    "true"
                                  }
                                  onChange={handleToggle("show_promo_banner")}
                                />
                              }
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 4 }}>
                            <CustomLabel label="Header Logo" />
                          </Grid>
                          <Grid size={{ xs: 12, md: 8 }}>
                            <ImageUploadCard
                              field="header_logo_img"
                              formData={formData[activeLang]}
                              setFormData={setFormData}
                              handleImageUpload={handleImageUpload}
                            />
                          </Grid>
                        </>
                      )}

                      {hideInArabicFields && (
                        <>
                          <Grid size={{ xs: 12, md: 4 }}>
                            <CustomLabel label="Enable explore dropdown?" />
                          </Grid>
                          <Grid size={{ xs: 12, md: 8 }}>
                            <FormControlLabel
                              control={
                                <CustomSwitch
                                  sx={{ m: 1 }}
                                  checked={
                                    formData[activeLang]
                                      .enable_explore_dropdown === "true"
                                  }
                                  onChange={handleToggle(
                                    "enable_explore_dropdown"
                                  )}
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
                                  checked={
                                    formData[activeLang]
                                      .enable_sticky_header === "true"
                                  }
                                  onChange={handleToggle(
                                    "enable_sticky_header"
                                  )}
                                />
                              }
                            />
                          </Grid>
                        </>
                      )}

                      <Grid size={{ xs: 12, md: 4 }}>
                        <CustomLabel label="Header Nav Menu">
                          <TranslateButton />
                        </CustomLabel>
                      </Grid>
                      <Grid size={{ xs: 12, md: 8 }}>
                        <NavBarMenu
                          hideInArabicFields={hideInArabicFields}
                          lang={lang}
                          formData={formData[activeLang]}
                          handleChange={handleChange}
                          setFormData={setFormData}
                          activeLang={activeLang}
                        />
                      </Grid>
                      {hideInArabicFields && (
                        <>
                          <Grid size={{ xs: 12, md: 4 }}>
                            <CustomLabel label="Show Language Switcher?" />
                          </Grid>
                          <Grid size={{ xs: 12, md: 8 }}>
                            <FormControlLabel
                              control={
                                <CustomSwitch
                                  sx={{ m: 1 }}
                                  checked={
                                    formData[activeLang]
                                      .show_language_switcher === "true"
                                  }
                                  onChange={handleToggle(
                                    "show_language_switcher"
                                  )}
                                />
                              }
                            />
                          </Grid>

                          <Grid size={{ xs: 12, md: 4 }}>
                            <CustomLabel label="Show Shop Option?" />
                          </Grid>
                          <Grid size={{ xs: 12, md: 8 }}>
                            <FormControlLabel
                              control={
                                <CustomSwitch
                                  sx={{ m: 1 }}
                                  checked={
                                    formData[activeLang].enable_shop_option ===
                                    "true"
                                  }
                                  onChange={handleToggle("enable_shop_option")}
                                />
                              }
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 4 }}>
                            <CustomLabel label="Show Login?" />
                          </Grid>
                          <Grid size={{ xs: 12, md: 8 }}>
                            <FormControlLabel
                              control={
                                <CustomSwitch
                                  sx={{ m: 1 }}
                                  checked={
                                    formData[activeLang].enable_login_button ===
                                    "true"
                                  }
                                  onChange={handleToggle("enable_login_button")}
                                />
                              }
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 4 }}>
                            <CustomLabel label="Show Join Now?" />
                          </Grid>
                          <Grid size={{ xs: 12, md: 8 }}>
                            <FormControlLabel
                              control={
                                <CustomSwitch
                                  sx={{ m: 1 }}
                                  checked={
                                    formData[activeLang].enable_join_now ===
                                    "true"
                                  }
                                  onChange={handleToggle("enable_join_now")}
                                />
                              }
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 4 }}>
                            <CustomLabel label="Show User Avatar?" />
                          </Grid>
                          <Grid size={{ xs: 12, md: 8 }}>
                            <FormControlLabel
                              control={
                                <CustomSwitch
                                  sx={{ m: 1 }}
                                  checked={
                                    formData[activeLang].enable_user_avatar ===
                                    "true"
                                  }
                                  onChange={handleToggle("enable_user_avatar")}
                                />
                              }
                            />
                          </Grid>
                        </>
                      )}
                      <Grid
                        size={{ xs: 12 }}
                        display="flex"
                        justifyContent="flex-end"
                      >
                        <CustomButton
                          type="submit"
                          color="primary"
                          loading={loading}
                          // disabled={!canEdit}
                        >
                          Save
                        </CustomButton>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Paper>
            </div>
          ))}
        </LanguageTabs>
      </Paper>
    </Container>
  );
};

export default memo(Header);
