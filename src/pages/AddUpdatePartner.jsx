import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Breadcrumbs,
  Container,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import LanguageTabs from "../common/LanguageTabs";
import { useSelector } from "react-redux";
import { NavigateNext } from "@mui/icons-material";
import PartnerForm from "../features/Forms/PartnerForm";
import {
  createPartnerService,
  getPartnerServiceById,
  updatePartnerService,
} from "../services/partnerService";
import { hasPermission } from "../utils/permissionHelper";
import { getS3ImageUrl } from "../utils/helper";

const AddUpdatePartner = () => {
  const { id } = useParams();
  const { languages } = useSelector((state) => state.languages);
  const isEditing = !!id;
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    isEditing ? "edit_partner" : "add_partner"
  );
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("en");
  const [partnerData, setPartnerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    partner_name: "",
    partner_description: "",
    partner_img: null,
    partner_img_preview: null,
    status: true,
  });

  const handleSubmit = async (data) => {
    setLoading(true);
    // ✅ Create FormData
    const formDataToSend = new FormData();

    // ✅ Remove preview field
    const { partner_img_preview, ...filteredData } = data;

    // ✅ Append all text fields
    Object.keys(filteredData).forEach((key) => {
      if (key !== "partner_img") {
        formDataToSend.append(key, filteredData[key]);
      }
    });

    // ✅ Append lang_code
    formDataToSend.append("lang_code", activeLang);

    // ✅ Append new image if selected
    if (filteredData.partner_img && filteredData.partner_img instanceof File) {
      formDataToSend.append("partner_img", filteredData.partner_img);

      // ✅ If updating, append old image for deletion
      if (isEditing && partnerData?.partner_img) {
        formDataToSend.append("old_partner_img", partnerData.partner_img);
      }
    }

    try {
      let response;
      if (id) {
        response = await updatePartnerService(id, formDataToSend);
      } else {
        response = await createPartnerService(formDataToSend);
      }
      if (response?.status === 200) {
        toast.success("Form Submitted Successfully");
        navigate("/admin/settings/partners-listing");
      }
    } catch (error) {
      console.error("Error submitting partner:", error);
    } finally {
      setLoading(false);
    }
  };
  const resetData = () => {
    setFormData({
      partner_name: "",
      partner_description: "",
      partner_img: null,
      partner_img_preview: null,
      status: true,
    });
  };

  useEffect(() => {
    if (isEditing) {
      const fetchPartnerData = async () => {
        try {
          const response = await getPartnerServiceById(id, activeLang);
          const data = response?.result;
          if (data) {
            setPartnerData(data);
            updateFormData(data);
          }
        } catch (error) {
          console.log("Error fetching partner:", error);
        }
      };
      resetData();
      fetchPartnerData();
    }
  }, [id, activeLang, isEditing]);

  const updateFormData = (data) => {
    setFormData({
      partner_name: data?.partner_name || "",
      partner_description: data?.partner_description || "",
      partner_img: { name: data?.partner_img || null },
      partner_img_preview: data?.partner_img
        ? getS3ImageUrl("partner", data?.partner_img)
        : null,
      status: data?.status || true,
    });
  };

  const handleChange = (event, newIndex) => {
    const newLang = languages[newIndex].code;
    setActiveLang(newLang);
    resetData();
    if (partnerData) {
      updateFormData(partnerData);
    }
  };

  const breadcrumbs = [
    <Typography key="1" sx={{ fontSize: "13px" }}>
      Settings
    </Typography>,
    <Link
      style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
      key="2"
      to="/admin/settings/partners-listing"
    >
      Our Partners
    </Link>,
    <Typography key="3" sx={{ fontSize: "13px" }}>
      {isEditing ? "Edit Partner" : "Create Partner"}
    </Typography>,
  ];

  return (
    <Container maxWidth="lg" sx={{ padding: "0px !important" }}>
      <Paper elevation={3}>
        <Box sx={{ p: 2 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {isEditing ? "Edit Partner" : "Create Partner"}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 9 }}>
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
          </Grid>
        </Box>
        <Box sx={{ px: 2, py: 1 }}>
          {isEditing ? (
            <LanguageTabs handleChange={handleChange} activeLang={activeLang}>
              {languages.map((lang) => (
                <div key={lang._id} style={{ overflow: "hidden" }}>
                  <PartnerForm
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    lang={lang}
                    activeLang={activeLang}
                    checkPermission={checkPermission}
                  />
                </div>
              ))}
            </LanguageTabs>
          ) : (
            <PartnerForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              loading={loading}
              checkPermission={checkPermission}
            />
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default AddUpdatePartner;
