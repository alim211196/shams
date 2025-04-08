import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { hasPermission } from "../../utils/permissionHelper";
import AddAmenities from "../../common/AddAmenities";
import {
  createAmenityService,
  getAmenityServiceById,
  updateAmenityService,
} from "../../services/amenitiesService";
import { getS3ImageUrl } from "../../utils/helper";
import LanguageTabs from "../../common/LanguageTabs";

const AmenityDialog = ({
  open,
  onClose,
  refresh,
  editMode = false,
  selectedAmenityId = null, // Single amenity for edit
}) => {
  const [formData, setFormData] = useState([
    { name: "", icon_img: null, icon_img_preview: null, status: true },
  ]);
  const { languages } = useSelector((state) => state.languages);
  const [loading, setLoading] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    editMode ? "edit_amenity" : "add_amenity"
  );

  useEffect(() => {
    if (editMode) {
      const fetchAmenityData = async () => {
        try {
          const response = await getAmenityServiceById(
            selectedAmenityId,
            activeLang
          );
          const data = response?.result;
          if (data) {
            setFormData([
              {
                id: data?._id || null,
                name: data?.name,
                status: data?.status,
                icon_img: { name: data?.icon_img || null },
                icon_img_preview: data?.icon_img
                  ? getS3ImageUrl("amenity", data?.icon_img)
                  : null,
              },
            ]);
          }
        } catch (error) {
          console.log("Error fetching Blog:", error);
        }
      };

      fetchAmenityData();
    }
  }, [editMode, selectedAmenityId, activeLang]);

  const handleClose = () => {
    setFormData([
      { name: "", icon_img: null, icon_img_preview: null, status: true },
    ]);
    onClose();
  };

  const handleSubmit = async (data) => {
    if (data.some((item) => !item.name)) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }

    setLoading(true);
    try {
      if (editMode) {
        const { name, icon_img, status } = data[0]; // Single edit mode
        const updateFormData = new FormData();
        updateFormData.append("name", name);
        updateFormData.append("status", status);
        updateFormData.append("lang_code", activeLang);
        // ✅ If user changed the image, append new image
        if (icon_img instanceof File) {
          updateFormData.append("icon_img", icon_img);

          // ✅ Append old image for deletion
          if (data?.icon_img) {
            updateFormData.append("old_icon_img", data.icon_img);
          }
        } else {
          // ✅ If no new image, send only the string filename (if required)
          updateFormData.append("icon_img", icon_img.name);
        }

        await updateAmenityService(selectedAmenityId, updateFormData);
        toast.success("Amenity updated successfully!");
      } else {
        // Bulk Create Logic
        const bulkFormData = new FormData();
        bulkFormData.append("lang_code", activeLang);

        const amenitiesArray = data.map(({ icon_img_preview, ...amenity }) => ({
          name: amenity.name,
          status: amenity.status ?? true,
        }));
        bulkFormData.append("amenities", JSON.stringify(amenitiesArray));

        data.forEach((amenity, index) => {
          if (amenity.icon_img instanceof File) {
            bulkFormData.append(
              `amenities[${index}][icon_img]`,
              amenity.icon_img
            );
          }
        });

        await createAmenityService(bulkFormData);
        toast.success("Amenities added successfully!");
      }

      refresh();
      handleClose();
    } catch (error) {
      console.error("API Error:", error.response?.data);
      toast.error("Failed to save amenities.");
    } finally {
      setLoading(false);
    }
  };

  // Handle tab change without API call
  const handleChange = (event, newIndex) => {
    const newLang = languages[newIndex].code;
    setActiveLang(newLang);
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
        encType="multipart/form-data"
      >
        <DialogTitle>
          <Typography variant="h6">
            {editMode ? "Edit Amenity" : "Add Amenities"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ color: "#757575", mb: 1, fontSize: "13px", fontWeight: 500 }}
          >
            {editMode
              ? "Update the Amenity details:"
              : "Add multiple Amenities:"}
          </Typography>
          {editMode ? (
            <LanguageTabs handleChange={handleChange} activeLang={activeLang}>
              {languages.map((lang) => (
                <div
                  key={lang._id}
                  style={{ overflow: "hidden", margin: "10px" }}
                >
                  <AddAmenities
                    formData={formData}
                    setFormData={setFormData}
                    editMode={editMode}
                    lang={lang}
                    activeLang={activeLang}
                  />
                </div>
              ))}
            </LanguageTabs>
          ) : (
            <AddAmenities
              formData={formData}
              setFormData={setFormData}
              editMode={editMode}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          {loading ? (
            <Button color="primary" variant="contained" disabled>
              <CircularProgress size={24} sx={{ color: "white" }} />
            </Button>
          ) : (
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={!checkPermission}
            >
              {editMode ? "Update" : "Save"}
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AmenityDialog;
