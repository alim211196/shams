import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import LanguageTabs from "../common/LanguageTabs";
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
const AdminAuth = () => {
  const { languages } = useSelector((state) => state.languages);
  const { userPermissions } = useSelector((state) => state.user);
  const [activeLang, setActiveLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ en: {}, ar: {} });
  const page_key = window.location.pathname.split("/").pop();
  const checkPermission = hasPermission(userPermissions, "add_edit_admin_auth");
  const hideInArabicFields = useMemo(() => activeLang === "en", [activeLang]);
  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const response = await getAuthPageService(page_key, activeLang);
        const data = response?.result || {};

        setFormData((prev) => ({
          ...prev,
          [activeLang]: {
            ...data,
            banner_image: { name: data?.banner_image || null },
            banner_image_preview: data?.banner_image
              ? getS3ImageUrl("auth_page", data?.banner_image)
              : null,
          },
        }));
      } catch (error) {
        if (error.status === 400) {
          setFormData((prev) => ({ ...prev, [activeLang]: {} }));
        }
      }
    };

    fetchAuthData();
  }, [page_key, activeLang]);

  const handleChangeTab = (event, newIndex) => {
    setActiveLang(languages[newIndex].code);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [activeLang]: { ...prev[activeLang], [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = { ...formData[activeLang] };

      // Remove the preview URL before sending
      delete formDataToSend.banner_image_preview;

      // If a file is selected, store only the filename in `page_data`
      if (formDataToSend.banner_image instanceof File) {
        formDataToSend.banner_image = formDataToSend.banner_image.name;
      }

      // Prepare FormData payload
      const formDataPayload = new FormData();
      formDataPayload.append("page_key", page_key);
      formDataPayload.append("lang", activeLang);
      formDataPayload.append("page_data", JSON.stringify(formDataToSend));

      // Append actual file for S3 upload
      if (formData[activeLang].banner_image instanceof File) {
        formDataPayload.append(
          "banner_image",
          formData[activeLang].banner_image
        );
      }

      const response = await postAuthPageService(formDataPayload);

      if (response?.status === 200) {
        toast.success("Form Submitted Successfully");
      }
    } catch (error) {
      console.error("Error submitting:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file); // Create preview URL
      setFormData((prev) => ({
        ...prev,
        [activeLang]: {
          ...prev[activeLang],
          [field]: file, // Store actual File object
          [`${field}_preview`]: previewUrl, // For UI preview
        },
      }));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ padding: "0px !important" }}>
      <Paper elevation={3}>
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Admin Auth Information
          </Typography>
        </Box>
        <Box sx={{ px: 2, py: 1 }}>
          <LanguageTabs handleChange={handleChangeTab} activeLang={activeLang}>
            {languages.map((lang) => (
              <div key={lang._id} style={{ overflow: "hidden" }}>
                <Paper elevation={0} sx={{ p: 2 }}>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Grid container spacing={2}>
                      {["heading1", "heading2", "title", "description"].map(
                        (field) => (
                          <React.Fragment key={field}>
                            <Grid size={{ xs: 12, md: 4 }}>
                              <CustomLabel label={field} isRequired>
                                <TranslateButton />
                              </CustomLabel>
                            </Grid>
                            <Grid size={{ xs: 12, md: 8 }}>
                              <CustomTextField
                                name={field}
                                value={formData[activeLang]?.[field] || ""}
                                onChange={handleChange}
                                placeholder={activeLang === "en" ? field : ""}
                                required
                                multiline={field === "description"}
                                minRows={field === "description" ? 5 : 1}
                                lang={lang}
                              />
                            </Grid>
                          </React.Fragment>
                        )
                      )}
                      {hideInArabicFields && (
                        <>
                          <Grid size={{ xs: 12, md: 4 }}>
                            <CustomLabel label="Upload Image" />
                          </Grid>
                          <Grid size={{ xs: 12, md: 8 }}>
                            <ImageUploadCard
                              activeLang={activeLang}
                              field="banner_image"
                              formData={formData[activeLang]}
                              setFormData={setFormData}
                              handleImageUpload={handleImageUpload}
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
                          disabled={!checkPermission}
                        >
                          Save
                        </CustomButton>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </div>
            ))}
          </LanguageTabs>
        </Box>
      </Paper>
    </Container>
  );
};

export default AdminAuth;
