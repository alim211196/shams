import React, { Fragment, useEffect } from "react";
import { Button, IconButton, Grid } from "@mui/material";
import { AddCircleOutline, Close } from "@mui/icons-material";
import CustomTextField from "./CustomTextField";
const TranslatableLinks = ({
  links,
  setLinks,
  hideInArabicFields,
  lang,
  setFormData,
  activeLang,
  formData,
  labelField,
  urlField,
}) => {
  useEffect(() => {
    if (formData[labelField]?.length) {
      const prefilledLinks = formData[labelField].map((label, index) => ({
        [labelField]: label,
        [urlField]: formData[urlField]?.[index] || "",
      }));
      setLinks(prefilledLinks);
    }
  }, [formData, activeLang, setLinks]);

  // Add new link field
  const handleAdd = () => {
    setLinks([...links, { [labelField]: "", [urlField]: "" }]);
  };

  // Update link values
  const handleChange = (index, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    setLinks(updatedLinks);

    // Extract only day values as an array
    const labelValues = updatedLinks
      .map((link) => link[labelField])
      .filter(Boolean);
    const urlValues = updatedLinks
      .map((link) => link[urlField])
      .filter(Boolean);

    setFormData((prev) => ({
      ...prev,
      [activeLang]: {
        ...prev[activeLang],
        [labelField]: labelValues,
        [urlField]: urlValues,
      },
    }));
  };

  // Remove a link field
  const handleRemove = (index) => {
    const filteredLinks = links.filter((_, i) => i !== index);
    setLinks(filteredLinks);

    // Extract only day values as an array
    const labelValues = filteredLinks
      .map((link) => link[labelField])
      .filter(Boolean);
    const urlValues = filteredLinks
      .map((link) => link[urlField])
      .filter(Boolean);

    setFormData((prev) => ({
      ...prev,
      [activeLang]: {
        ...prev[activeLang],
        [labelField]: labelValues,
        [urlField]: urlValues,
      },
    }));
  };

  return (
    <Grid container spacing={2}>
      {links.map((link, index) => (
        <Fragment key={index}>
          <Grid size={{ xs: 12, md: hideInArabicFields ? 4 : 11 }}>
            <CustomTextField
              name={labelField}
              value={link[labelField]}
              onChange={(e) => handleChange(index, labelField, e.target.value)}
              placeholder={hideInArabicFields ? "Label" : ""}
              lang={lang}
            />
          </Grid>
          {hideInArabicFields && (
            <Grid size={{ xs: 12, md: 7 }}>
              <CustomTextField
                name={urlField}
                value={link[urlField]}
                onChange={(e) => handleChange(index, urlField, e.target.value)}
                placeholder={hideInArabicFields ? "https://" : ""}
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

export default TranslatableLinks;
