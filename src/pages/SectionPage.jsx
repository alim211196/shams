import React, { memo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import LanguageTabs from "../common/LanguageTabs";
import { useSelector } from "react-redux";
import VerticalTabs from "../common/VerticalTabs";
import HorizontalTabs from "../common/HorizontalTabs";
import { Edit, NavigateNext } from "@mui/icons-material";
import AboutUsWebPage from "../features/AboutUs";
import {
  getPageContentService,
  updateWebPageContentService,
} from "../services/webPageService";
import { toast } from "react-toastify";
import { hasPermission } from "../utils/permissionHelper";
import ContactUs from "../features/ContactUs";
import FAQWebPage from "../features/FAQ";
import InstructorLanding from "../features/InstructorLanding";
import { getS3ImageUrl } from "../utils/helper";
import TermsAndConditions from "../features/TermsAndConditions";

const tabConfig = {
  "about-us": ["Section 1", "Section 2", "Section 3", "Section 4", "Section 5"],
  "terms-and-conditions": ["Section 1"],
  "contact-us": ["Section 1"],
  faq: ["Section 1", "Section 2", "Section 3"],
  "instructor-landing": [
    "Section 1",
    "Section 2",
    "Section 3",
    "Section 4",
    "Section 5",
    "Section 6",
  ],
};

const SectionPage = () => {
  const { id } = useParams();
  const { languages } = useSelector((state) => state.languages);
  const [formData, setFormData] = useState({ en: {}, ar: {} });
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || "default-page";
  const [loading, setLoading] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { userPermissions } = useSelector((state) => state.user);
  const canEdit = hasPermission(userPermissions, "edit_page");
  const canRedirectTo = hasPermission(userPermissions, "redirect_to_page");
  const tabNames = tabConfig[page] || [];

  const [tabValue, setTabValue] = useState(tabNames[0]); // Set first tab as default

  const handleChangeTab = (newTab) => {
    setTabValue(newTab);
  };
  const handleNavigateToEdit = () => {
    navigate(`/admin/website/custom-pages/edit/${id}`);
  };

  const breadcrumbs = [
    <Typography key="1" sx={{ fontSize: "13px" }}>
      Settings
    </Typography>,
    <Link
      key="2"
      to="/admin/website/pages"
      style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
    >
      Pages
    </Link>,
    <Typography key="3" sx={{ fontSize: "13px", textTransform: "capitalize" }}>
      {page.replace("-", " ")} Page
    </Typography>,
  ];

  const fetchPageContent = async (lang) => {
    setFormData((prev) => ({ ...prev, [activeLang]: {} }));
    try {
      const response = await getPageContentService(id, lang);
      const data = response?.result || {};

      const processedData = Object.keys(data).reduce((acc, key) => {
        if (key.endsWith("_img")) {
          acc[key] = { name: data[key] || null };
          acc[`${key}_preview`] = data[key]
            ? getS3ImageUrl("page_content", data[key])
            : null;
        } else {
          acc[key] = data[key];
        }
        return acc;
      }, {});

      setFormData((prev) => ({
        ...prev,
        [activeLang]: {
          ...processedData,
        },
      }));
    } catch (error) {
      setFormData((prev) => ({ ...prev, [activeLang]: {} }));
    }
  };

  useEffect(() => {
    if (activeLang) {
      fetchPageContent(activeLang);
    }
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
        [name]: value, // Update specific field
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

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append("lang", activeLang);

      Object.keys(formData[activeLang] || {}).forEach((key) => {
        const value = formData[activeLang][key];

        if (!key.endsWith("_preview")) {
          if (value instanceof File) {
            formDataObj.append(key, value); // ✅ Append File directly
          } else if (typeof value === "object" && value?.name) {
            formDataObj.append(key, value.name); // ✅ Extract filename from { name: "image.jpg" }
          } else {
            formDataObj.append(key, JSON.stringify(value)); // ✅ Append text as JSON string
          }
        }
      });

      // ✅ Send FormData (DO NOT set `Content-Type`, Axios will handle it)
      await updateWebPageContentService(id, formDataObj);
      toast.success("Page content updated successfully");
    } catch (error) {
      console.error("Failed to update page content:", error);
      toast.error("Failed to update page content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ padding: "0px !important" }}>
      <Paper elevation={3}>
        <Box sx={{ p: 2 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid size={{ xs: 6, sm: 6, md: 3 }} order={{ xs: 1, md: 1 }}>
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
                {page.replace(/-/g, " ")} Page
              </Typography>
            </Grid>
            <Grid
              size={{ xs: 12, sm: 6, md: 6, lg: 7 }}
              order={{ xs: 3, md: 1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "flex-start", md: "flex-end" },
                }}
              >
                <Breadcrumbs
                  separator={<NavigateNext fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  {breadcrumbs}
                </Breadcrumbs>
              </Box>
            </Grid>
            <Grid
              size={{ xs: 6, sm: 6, md: 3, lg: 2 }}
              order={{ xs: 2, md: 1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "flex-end" },
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<Edit />}
                  onClick={handleNavigateToEdit}
                  disabled={!canEdit}
                >
                  Edit Page
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 2 }}>
            {isMobile ? (
              <HorizontalTabs
                handleChange={handleChangeTab}
                value={tabValue}
                tabs={tabNames}
              />
            ) : (
              <VerticalTabs
                handleChange={handleChangeTab}
                value={tabValue}
                tabs={tabNames}
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
                      {page === "about-us" && lang?.code === activeLang && (
                        <AboutUsWebPage
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
                        />
                      )}
                      {page === "terms-and-conditions" &&
                        lang?.code === activeLang && (
                          <TermsAndConditions
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
                          />
                        )}
                      {page === "contact-us" && lang?.code === activeLang && (
                        <ContactUs
                          tabValue={tabValue}
                          lang={lang}
                          loading={loading}
                          activeLang={activeLang}
                          setFormData={setFormData}
                          formData={formData[activeLang]}
                          handleSubmit={handleSubmit}
                          handleChange={handleChange}
                          handleEditorChange={handleEditorChange}
                        />
                      )}
                      {page === "faq" && lang?.code === activeLang && (
                        <FAQWebPage
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
                        />
                      )}
                      {page === "instructor-landing" &&
                        lang?.code === activeLang && (
                          <InstructorLanding
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

export default memo(SectionPage);
