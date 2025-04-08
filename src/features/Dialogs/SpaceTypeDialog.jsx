import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { hasPermission } from "../../utils/permissionHelper";
import LanguageTabs from "../../common/LanguageTabs";
import {
  createSpaceTypeService,
  getSpaceTypeServiceById,
  updateSpaceTypeService,
} from "../../services/spaceTypesService";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
const SpaceTypeDialog = ({
  open,
  onClose,
  refresh,
  editMode = false,
  selectedSpaceTypeId = null,
}) => {
  const [formData, setFormData] = useState({
    en: [{ name: "", status: true }],
    ar: [{ name: "", status: true }],
  });
  const { languages } = useSelector((state) => state.languages);
  const [loading, setLoading] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const { userPermissions } = useSelector((state) => state.user);
  const checkPermission = hasPermission(
    userPermissions,
    editMode ? "edit_space_type" : "add_space_type"
  );

  useEffect(() => {
    if (editMode && selectedSpaceTypeId && open) {
      const fetchSpaceTypeData = async () => {
        try {
          const response = await getSpaceTypeServiceById(
            selectedSpaceTypeId,
            activeLang
          );
          const data = response?.result;
          if (data) {
            setFormData((prev) => ({
              ...prev,
              [activeLang]: [
                {
                  id: data?._id || null,
                  name: data?.name,
                  status: data?.status,
                },
              ],
            }));
          } else {
            // If no data exists for that language, reset it
            setFormData((prev) => ({
              ...prev,
              [activeLang]: [{ name: "", status: true }],
            }));
          }
        } catch (error) {
          console.log("Error fetching space type:", error);
        }
      };

      fetchSpaceTypeData();
    }
  }, [editMode, open, selectedSpaceTypeId, activeLang]);
  const handleClose = () => {
    setFormData({
      en: [{ name: "", status: true }],
      ar: [{ name: "", status: true }],
    });
    onClose();
  };

  const handleSubmit = async () => {
    const data = formData[activeLang] || [];

    if (data.some((item) => !item.name)) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }

    setLoading(true);
    try {
      if (editMode) {
        const { name, status } = data[0];

        const updatePayload = {
          name,
          status,
          lang_code: activeLang,
        };

        await updateSpaceTypeService(selectedSpaceTypeId, updatePayload);
        toast.success("Space Type updated successfully!");
      } else {
        const payload = {
          space_types: data.map(({ name, status }) => ({
            name,
            status: status ?? true,
          })),
          lang_code: activeLang,
        };

        await createSpaceTypeService(payload);
        toast.success("Space Types added successfully!");
      }

      refresh();
      handleClose();
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      toast.error("Failed to save space types.");
    } finally {
      setLoading(false);
    }
  };

  // Handle tab change without API call
  const handleChange = (event, newIndex) => {
    const newLang = languages[newIndex].code;
    setActiveLang(newLang);
  };

  const handleTextChange = (index, event) => {
    const updated = [...(formData[activeLang] || [])];
    updated[index] = {
      ...updated[index],
      name: event.target.value,
    };

    setFormData((prev) => ({
      ...prev,
      [activeLang]: updated,
    }));
  };
  const addOption = () => {
    setFormData((prev) => ({
      ...prev,
      [activeLang]: [...(prev[activeLang] || []), { name: "", status: true }],
    }));
  };

  const removeOption = (index) => {
    setFormData((prev) => ({
      ...prev,
      [activeLang]: prev[activeLang].filter((_, i) => i !== index),
    }));
  };
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
      >
        <DialogTitle>
          <Typography variant="h6">
            {editMode ? "Edit Space Type" : "Add Space Types"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ color: "#757575", mb: 1, fontSize: "13px", fontWeight: 500 }}
          >
            {editMode
              ? "Update the Space Type details:"
              : "Add multiple Space Types:"}
          </Typography>
          {editMode ? (
            <LanguageTabs handleChange={handleChange} activeLang={activeLang}>
              {languages.map((lang) => (
                <div
                  key={lang._id}
                  style={{ overflow: "hidden", margin: "10px" }}
                >
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {(formData[activeLang] || []).map((option, index) => (
                      <TextField
                        key={index}
                        placeholder={`Option ${index + 1}`}
                        value={option.name}
                        onChange={(e) => handleTextChange(index, e)}
                        InputProps={{
                          endAdornment: !editMode && (
                            <InputAdornment position="end">
                              {index === 0 ? (
                                <IconButton color="primary" onClick={addOption}>
                                  <AddCircleIcon />
                                </IconButton>
                              ) : (
                                <IconButton
                                  color="error"
                                  onClick={() => removeOption(index)}
                                >
                                  <RemoveCircleIcon />
                                </IconButton>
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                    ))}
                  </Box>
                </div>
              ))}
            </LanguageTabs>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {(formData[activeLang] || []).map((option, index) => (
                <TextField
                  key={index}
                  placeholder={`Option ${index + 1}`}
                  value={option.name}
                  onChange={(e) => handleTextChange(index, e)}
                  InputProps={{
                    endAdornment: !editMode && (
                      <InputAdornment position="end">
                        {index === 0 ? (
                          <IconButton color="primary" onClick={addOption}>
                            <AddCircleIcon />
                          </IconButton>
                        ) : (
                          <IconButton
                            color="error"
                            onClick={() => removeOption(index)}
                          >
                            <RemoveCircleIcon />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              ))}
            </Box>
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

export default SpaceTypeDialog;
