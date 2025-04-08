import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LanguageTabs from "../common/LanguageTabs";
import { useSelector } from "react-redux";
import VerticalTabs from "../common/VerticalTabs";
import HorizontalTabs from "../common/HorizontalTabs";
import {
  getPageContentService,
  updateWebPageContentService,
} from "../services/webPageService";
import { toast } from "react-toastify";
import { getS3ImageUrl } from "../utils/helper";
import FooterIndex from "../features/Footer";
import {
  createSettingsService,
  getAllSettingsService,
} from "../services/websiteSettingService";

const tabs = [
  "About Widget",
  "Contact Info Widget",
  "Link Widget One",
  "Link Widget Two",
  "Link Widget Three",
  "Opening Schedule",
  "Copyright Widget",
  "Social Link Widget",
  "Payment Methods Widget",
];

const Footer = () => {
  const { languages } = useSelector((state) => state.languages);
  const [formData, setFormData] = useState({ en: {}, ar: {} });
  const [loading, setLoading] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [tabValue, setTabValue] = useState(tabs[0]); // Set first tab as default

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

  const handleChangeTab = (newTab) => {
    setTabValue(newTab);
  };

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

  const handleEditorChange = (name, content) => {
    setFormData((prev) => ({
      ...prev,
      [activeLang]: {
        ...prev[activeLang], // Preserve existing language-specific values
        [name]: content, // Ensure content is a string
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
          Website Footer
        </Typography>
      </Box>
      <Paper elevation={3}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 2 }}>
            {isMobile ? (
              <HorizontalTabs
                handleChange={handleChangeTab}
                value={tabValue}
                tabs={tabs}
              />
            ) : (
              <VerticalTabs
                handleChange={handleChangeTab}
                value={tabValue}
                tabs={tabs}
              />
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 10 }}>
            <Paper elevation={0}>
              <LanguageTabs
                handleChange={handleTabChange}
                activeLang={activeLang}
              >
                {languages.map((lang) => (
                  <div key={lang._id} style={{ overflow: "hidden" }}>
                    <Paper elevation={2} sx={{ p: 3 }}>
                      {lang.code === activeLang && (
                        <FooterIndex
                          tabValue={tabValue}
                          lang={lang}
                          loading={loading}
                          activeLang={activeLang}
                          setFormData={setFormData}
                          formData={formData[activeLang]}
                          handleSubmit={handleSubmit}
                          handleChange={handleChange}
                          handleImageUpload={handleImageUpload}
                          handleEditorChange={handleEditorChange}
                          handleToggle={handleToggle}
                        />
                      )}
                    </Paper>
                  </div>
                ))}
              </LanguageTabs>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default memo(Footer);
