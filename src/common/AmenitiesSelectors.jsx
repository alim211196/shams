import React, { useEffect, useState } from "react";
import {
  Typography,
  FormControlLabel,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CustomSwitch } from "../layouts/helper";
import { toast } from "react-toastify";
import { getAllAmenitiesService } from "../services/amenitiesService";
import { getS3ImageUrl } from "../utils/helper";

const AmenitiesSelectors = ({ handleToggleAmenities, selectedAmenities }) => {
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await getAllAmenitiesService();
        if (response?.result) {
          setAmenities(Array.isArray(response.result) ? response.result : []);
        } else {
          setAmenities([]);
        }
      } catch (error) {
        toast.error("Failed to load amenities");
        setAmenities([]);
      } finally {
      }
    };
    fetchAmenities();
  }, []);

  return (
    <Accordion
      elevation={0}
      sx={{ my: 2, border: "1px solid #dee2e6", borderRadius: "5px" }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          background: "#dee2e6",
          minHeight: "40px!important",
          "& .MuiAccordionSummary-content": {
            margin: "0px!important",
          },
          border: "none",
          "& .MuiAccordionSummary-root.Mui-expanded": {
            minHeight: "40px!important",
          },
        }}
      >
        <Typography>Amenities</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          {amenities.map((amenity) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={amenity._id}>
              <Box
                sx={{
                  padding: 1,
                  fontSize: "12px",
                  border: "1px solid #dee2e6",
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  cursor: "pointer",
                  background: amenity.status === false && "#dee2e6",
                  ":hover": {
                    background: amenity.status === true && "#f9f9f9",
                  },
                }}
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <Avatar
                    src={getS3ImageUrl("amenity", amenity?.icon_img)}
                    alt="Icon"
                    variant="square"
                    sx={{ width: 24, height: "auto" }}
                  />
                  <Typography
                    sx={{
                      width: "100%",
                      textAlign: "left",
                      fontSize: "13px",
                      textTransform: "capitalize",
                    }}
                  >
                    {amenity.name.replace(/_/g, " ")}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <FormControlLabel
                    control={
                      <CustomSwitch
                        sx={{ m: 1 }}
                        id={`switch-${amenity._id}`}
                        checked={selectedAmenities.includes(amenity._id)}
                        onChange={() => {
                          amenity.status === true &&
                            handleToggleAmenities(amenity._id);
                        }}
                      />
                    }
                    label=""
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default AmenitiesSelectors;
