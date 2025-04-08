import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Box, Container, Paper, Typography, Grid } from "@mui/material";
import LanguageTabs from "../common/LanguageTabs";
import { useSelector } from "react-redux";
import { hasPermission } from "../utils/permissionHelper";
import {
  getAuthPageService,
  postAuthPageService,
} from "../services/authPageService";
import CustomLabel from "../common/CustomLabel";
import TranslateButton from "../common/TranslateButton";
import CustomTextField from "../common/CustomTextField";
import CustomButton from "../common/CustomButton";
import ImageUploadCard from "../common/ImageUploadCard";
import { getS3ImageUrl } from "../utils/helper";

const StudentAuth = () => {
  const { languages } = useSelector((state) => state.languages);
  const [activeLang, setActiveLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const page_key = window.location.pathname.split("/").pop();
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    "add_edit_student_auth"
  );
  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const response = await getAuthPageService(page_key, activeLang);
        const data = response?.result || {};
        const processedData = Object.keys(data).reduce((acc, key) => {
          if (key.endsWith("_img")) {
            acc[key] = { name: data[key] || null };
            acc[`${key}_preview`] = data[key]
              ? getS3ImageUrl("auth_page", data[key])
              : null;
          } else {
            acc[key] = data[key];
          }
          return acc;
        }, {});

        setFormData({
          ...data,
          ...processedData,
        });
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchAuthData();
  }, [page_key, activeLang]);

  const handleChangeTab = (event, newIndex) => {
    setFormData({});
    setActiveLang(languages[newIndex].code);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file); // For preview purposes
      setFormData((prev) => ({
        ...prev,
        [field]: file, // Store actual file object (not URL)
        [`${field}_preview`]: previewUrl, // Optional for UI preview
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Submitting formData:", formData); // ✅ Debugging step

      const formDataObj = new FormData();
      formDataObj.append("page_key", page_key);
      formDataObj.append("lang", activeLang);

      // Initialize page_data object
      let pageData = {};

      Object.keys(formData || {}).forEach((key) => {
        const value = formData[key];

        if (!key.endsWith("_preview")) {
          if (value instanceof File) {
            // Append actual image as a file
            formDataObj.append(key, value);
            // Store only filename in pageData
            pageData[key] = value.name;
          } else if (typeof value === "object" && value?.name) {
            // If image is already uploaded, store only filename
            pageData[key] = value.name;
          } else {
            // Store text values directly
            pageData[key] = value;
          }
        }
      });

      // Append `page_data` as a JSON string
      formDataObj.append("page_data", JSON.stringify(pageData));

      console.log("Final formDataObj:", [...formDataObj.entries()]); // ✅ Debugging step

      // ✅ Send FormData (Axios will handle Content-Type automatically)
      await postAuthPageService(formDataObj);

      toast.success("Form Submitted Successfully");
    } catch (error) {
      console.error("Error submitting:", error);
      toast.error("Failed to submit form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ padding: "0px !important" }}>
      <Paper elevation={3}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Student Auth Information
          </Typography>
        </Box>
        <Box sx={{ px: 2, py: 1 }}>
          <LanguageTabs handleChange={handleChangeTab} activeLang={activeLang}>
            {languages.map((lang) => (
              <form
                key={lang._id}
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <Paper elevation={0} sx={{ p: 2 }}>
                  {[
                    { key: "student_signup", label: "Sign Up" },
                    { key: "student_verify_account", label: "Verify Account" },
                    { key: "student_login", label: "Login" },
                    {
                      key: "student_forgot_password",
                      label: "Forgot Password",
                    },
                    { key: "student_verify_code", label: "Verify Code" },
                    { key: "student_reset_password", label: "Reset Password" },
                    {
                      key: "student_success_password",
                      label: "Success Password",
                    },
                  ].map(({ key, label }) => (
                    <Grid key={key} container spacing={2} sx={{ mb: 2 }}>
                      <Grid size={{ xs: 12 }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                          {label}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <Grid
                          container
                          spacing={2}
                          sx={{
                            mb: 1,
                            border: "1px dashed #ddd",
                            p: 2,
                            borderRadius: "5px",
                          }}
                        >
                          <Grid size={{ xs: 12, md: 4 }}>
                            <CustomLabel label="Title" isRequired>
                              <TranslateButton />
                            </CustomLabel>
                          </Grid>
                          <Grid size={{ xs: 12, md: 8 }}>
                            <CustomTextField
                              name={`${key}_title`}
                              value={formData[`${key}_title`] || ""}
                              onChange={handleChange}
                              placeholder={hideInArabicFields ? "Title" : ""}
                              lang={lang}
                              required
                            />
                          </Grid>
                          <Grid size={{ xs: 12, md: 4 }}>
                            <CustomLabel label="Description" isRequired>
                              <TranslateButton />
                            </CustomLabel>
                          </Grid>
                          <Grid size={{ xs: 12, md: 8 }}>
                            <CustomTextField
                              name={`${key}_description`}
                              value={formData[`${key}_description`] || ""}
                              onChange={handleChange}
                              placeholder={
                                hideInArabicFields ? "Description" : ""
                              }
                              lang={lang}
                              required
                              multiline
                              minRows={3}
                            />
                          </Grid>
                          {hideInArabicFields &&
                            ["student_signup", "student_login"].includes(
                              key
                            ) && (
                              <>
                                <Grid size={{ xs: 12, md: 4 }}>
                                  <CustomLabel label="Upload Image" />
                                </Grid>
                                <Grid size={{ xs: 12, md: 8 }}>
                                  <ImageUploadCard
                                    activeLang={activeLang}
                                    field={`${key}_banner_img`}
                                    formData={formData}
                                    setFormData={setFormData}
                                    handleImageUpload={handleImageUpload}
                                  />
                                </Grid>
                              </>
                            )}
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                  <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
                    <CustomButton
                      type="submit"
                      loading={loading}
                      disabled={!checkPermission}
                    >
                      Save
                    </CustomButton>
                  </Grid>
                </Paper>
              </form>
            ))}
          </LanguageTabs>
        </Box>
      </Paper>
    </Container>
  );
};

export default StudentAuth;
