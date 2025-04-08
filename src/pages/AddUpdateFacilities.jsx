import React, { memo, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Grid,
  Box,
  Breadcrumbs,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import LanguageTabs from "../common/LanguageTabs";
import { useSelector } from "react-redux";
import { NavigateNext } from "@mui/icons-material";
import { hasPermission } from "../utils/permissionHelper";
import { getS3ImageUrl } from "../utils/helper";
import {
  createFacilityService,
  getFacilityServiceById,
  updateFacilityService,
} from "../services/facilitiesService";
import FacilityForm from "../features/Forms/FacilityForm";

const AddUpdateFacilities = () => {
  const { id } = useParams();
  const { languages } = useSelector((state) => state.languages);
  const isEditing = !!id;
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    isEditing ? "edit_facility" : "add_facility"
  );
  const navigate = useNavigate();
  const [activeLang, setActiveLang] = useState("en");
  const [facilityData, setFacilityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    short_description: "",
    long_description: "",
    capacity: 0,
    price: 0,
    space_type_id: "",
    card_img: null,
    card_img_preview: null,
    banner_img: null,
    banner_img_preview: null,
    status: true,
  });

  const resetData = () => {
    setFormData({
      title: "",
      short_description: "",
      long_description: "",
      capacity: 0,
      price: 0,
      space_type_id: "",
      card_img: null,
      card_img_preview: null,
      banner_img: null,
      banner_img_preview: null,
      status: true,
    });
  };

  useEffect(() => {
    if (isEditing) {
      const fetchFacilityData = async () => {
        try {
          const response = await getFacilityServiceById(id, activeLang);
          const data = response?.result;
          if (data) {
            setFacilityData(data);
            updateFormData(data);
            const amenitiesIds = data?.amenities?.map((perm) => perm) || [];
            setSelectedAmenities(amenitiesIds);
          }
        } catch (error) {
          console.log("Error fetching Facility:", error);
        }
      };
      resetData();
      fetchFacilityData();
    }
  }, [id, activeLang, isEditing]);

  // Toggle amenities selection
  const handleToggleAmenities = (amenityId) => {
    setSelectedAmenities(
      (prev) =>
        prev.includes(amenityId)
          ? prev.filter((id) => id !== amenityId) // remove the item from the array
          : [...prev, amenityId] // add the item to the array
    );
  };

  const updateFormData = (data) => {
    setFormData({
      title: data?.title || "",
      short_description: data?.short_description || "",
      long_description: data?.long_description || "",
      capacity: data?.capacity || 0,
      price: data?.price || 0,
      space_type_id: data?.space_type_id || "",
      banner_img: { name: data?.banner_img || null },
      banner_img_preview: data?.banner_img
        ? getS3ImageUrl("facility", data?.banner_img)
        : null,
      card_img: { name: data?.card_img || null },
      card_img_preview: data?.card_img
        ? getS3ImageUrl("facility", data?.card_img)
        : null,
      status: data?.status ?? true,
    });
  };

  // Handle tab change without API call
  const handleChange = (event, newIndex) => {
    const newLang = languages[newIndex].code;
    setActiveLang(newLang);
    resetData();
    if (facilityData) {
      updateFormData(facilityData, newLang);
    }
  };

  const handleSubmit = async (data) => {
    setLoading(true);

    // ✅ Create FormData
    const formDataToSend = new FormData();

    // ✅ Remove preview field
    const { banner_img_preview, card_img_preview, ...filteredData } = data;

    // ✅ Append all text fields
    Object.keys(filteredData).forEach((key) => {
      if (key !== "banner_img" && key !== "card_img") {
        formDataToSend.append(key, filteredData[key]);
      }
    });

    // ✅ Append lang_code
    formDataToSend.append("lang_code", activeLang);

    // ✅ Append amenities
    if (Array.isArray(selectedAmenities)) {
      selectedAmenities.forEach((amenity) => {
        formDataToSend.append("amenities", amenity);
      });
    }

    // ✅ Append new banner image if selected
    if (filteredData.banner_img && filteredData.banner_img instanceof File) {
      formDataToSend.append("banner_img", filteredData.banner_img);

      // ✅ If updating, append old banner image for deletion
      if (isEditing && facilityData?.banner_img) {
        formDataToSend.append("old_banner_img", facilityData.banner_img);
      }
    }

    // ✅ Append new meta image if selected
    if (filteredData.card_img && filteredData.card_img instanceof File) {
      formDataToSend.append("card_img", filteredData.card_img);

      // ✅ If updating, append old meta image for deletion
      if (isEditing && facilityData?.card_img) {
        formDataToSend.append("old_card_img", facilityData.card_img);
      }
    }

    try {
      let response;
      if (id) {
        response = await updateFacilityService(id, formDataToSend);
      } else {
        response = await createFacilityService(formDataToSend);
      }

      if (response?.status === 200) {
        toast.success("Form Submitted Successfully");
        navigate("/admin/facilities-management/facilities-listing");
      }
    } catch (error) {
      console.error("Error submitting Facility:", error);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbs = [
    <Typography key="1" sx={{ fontSize: "13px" }}>
      Facilities Management
    </Typography>,
    <Link
      key="2"
      to="/admin/facilities-management/facilities-listing"
      style={{ fontSize: "13px", textDecoration: "none", color: "inherit" }}
    >
      Facilities
    </Link>,
    <Typography key="3" sx={{ fontSize: "13px" }}>
      {isEditing ? "Edit Facility" : "Create Facility"}
    </Typography>,
  ];

  return (
    <Container maxWidth="lg" sx={{ padding: "0px !important" }}>
      <Paper elevation={3}>
        <Box sx={{ p: 2 }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {isEditing ? "Edit Facility" : "Create Facility"}
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
                  <FacilityForm
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    lang={lang}
                    activeLang={activeLang}
                    checkPermission={checkPermission}
                    handleToggleAmenities={handleToggleAmenities}
                    selectedAmenities={selectedAmenities}
                  />
                </div>
              ))}
            </LanguageTabs>
          ) : (
            <FacilityForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              loading={loading}
              checkPermission={checkPermission}
              handleToggleAmenities={handleToggleAmenities}
              selectedAmenities={selectedAmenities}
            />
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default memo(AddUpdateFacilities);
