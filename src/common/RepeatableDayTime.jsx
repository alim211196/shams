import React, { Fragment, useEffect } from "react";
import { Button, IconButton, Grid } from "@mui/material";
import { AddCircleOutline, Close } from "@mui/icons-material";
import CustomTextField from "./CustomTextField";
const RepeatableDayTime = ({
  links,
  setLinks,
  hideInArabicFields,
  lang,
  setFormData,
  activeLang,
  formData,
}) => {
  useEffect(() => {
    if (formData?.opening_days?.length) {
      const prefilledLinks = formData.opening_days.map((day, index) => ({
        day,
        time: formData.opening_timings?.[index] || "",
      }));
      setLinks(prefilledLinks);
    }
  }, [formData, activeLang, setLinks]);

  // Add new link field
  const handleAdd = () => {
    setLinks([...links, { day: "", time: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    setLinks(updatedLinks);

    // Extract only day values as an array
    const dayValues = updatedLinks.map((link) => link.day).filter(Boolean);
    const timeValues = updatedLinks.map((link) => link.time).filter(Boolean);

    setFormData((prev) => ({
      ...prev,
      [activeLang]: {
        ...prev[activeLang],
        opening_days: dayValues,
        opening_timings: timeValues,
      },
    }));
  };

  const handleRemove = (index) => {
    const filteredLinks = links.filter((_, i) => i !== index);
    setLinks(filteredLinks);

    // Extract only day values as an array
    const dayValues = filteredLinks.map((link) => link.day).filter(Boolean);
    const timeValues = filteredLinks.map((link) => link.time).filter(Boolean);

    setFormData((prev) => ({
      ...prev,
      [activeLang]: {
        ...prev[activeLang],
        opening_days: dayValues,
        opening_timings: timeValues,
      },
    }));
  };

  return (
    <Grid
      container
      spacing={2}
      //   sx={{ mb: 1, border: "1px dashed #ddd", p: 2, borderRadius: "5px" }}
    >
      {links.map((link, index) => (
        <Fragment key={index}>
          <Grid size={{ xs: 12, md: hideInArabicFields ? 4 : 11 }}>
            <CustomTextField
              name={"day"}
              value={link.day}
              onChange={(e) => handleChange(index, "day", e.target.value)}
              placeholder={hideInArabicFields ? "Day" : ""}
              lang={lang}
            />
          </Grid>
          {hideInArabicFields && (
            <Grid size={{ xs: 12, md: 7 }}>
              <CustomTextField
                name={"time"}
                value={link.time}
                onChange={(e) => handleChange(index, "time", e.target.value)}
                placeholder={hideInArabicFields ? "Time" : ""}
                lang={lang}
              />
            </Grid>
          )}

          <Grid size={{ xs: 12, md: 1 }}>
            <IconButton onClick={() => handleRemove(index)}>
              <Close color="secondary" style={{ fontSize: "16px" }} />
            </IconButton>
          </Grid>
        </Fragment>
      ))}
      <Grid size={{ xs: 12, md: 2 }}>
        <Button
          color="secondary"
          fullWidth
          variant="text"
          startIcon={<AddCircleOutline />}
          sx={{ border: "1px dashed #ddd" }}
          onClick={handleAdd}
        >
          Add New
        </Button>
      </Grid>
    </Grid>
  );
};

export default RepeatableDayTime;
