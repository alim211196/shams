import React, { useEffect, useState } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid } from "@mui/material";
import CustomColorPicker from "../../common/CustomColorPicker";
import { AddCircleOutline } from "@mui/icons-material";
import CustomEditor from "../../common/CustomEditor";
import { editorOptions } from "../../utils/helper";

const AboutUsCardSection = ({
  lang,
  hideInArabicFields,
  handleChange,
  formData,
  setFormData,
  handleEditorChange,
}) => {
  const [cards, setCards] = useState([]);

  // Populate cards from formData when component mounts
  useEffect(() => {
    const existingCards = Object.keys(formData)
      .filter((key) => key.startsWith("about_us_section3_card_title_"))
      .map((key) => {
        const index = key.split("_").pop();
        return { id: parseInt(index) };
      });

    const uniqueCards = [
      ...new Map(existingCards.map((c) => [c.id, c])).values(),
    ].sort((a, b) => a.id - b.id);

    setCards(
      uniqueCards.length > 0
        ? uniqueCards
        : [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }]
    );
  }, [formData]);

  // Function to add a new card
  const addCard = () => {
    const newId = cards.length;
    setCards([...cards, { id: newId }]);

    setFormData((prev) => ({
      ...prev,
      [`about_us_section3_card_color_${newId}`]: "",
      [`about_us_section3_card_title_${newId}`]: "",
      [`about_us_section3_card_description_${newId}`]: "",
      [`about_us_section3_linkname_${newId}`]: "",
      [`about_us_section3_link_url_${newId}`]: "",
    }));
  };

  // Function to remove a card
  const removeCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));

    setFormData((prev) => {
      const updatedFormData = { ...prev };
      delete updatedFormData[`about_us_section3_card_color_${id}`];
      delete updatedFormData[`about_us_section3_card_title_${id}`];
      delete updatedFormData[`about_us_section3_card_description_${id}`];
      delete updatedFormData[`about_us_section3_linkname_${id}`];
      delete updatedFormData[`about_us_section3_link_url_${id}`];
      return updatedFormData;
    });
  };

  return (
    <Grid size={{ xs: 12 }}>
      {cards.map((card, index) => (
        <Grid
          container
          spacing={2}
          key={card.id}
          sx={{ mb: 1, border: "1px dashed #ddd", p: 2, borderRadius: "5px" }}
        >
          {/* Delete Button */}
          {cards.length > 1 && (
            <Grid size={{ xs: 12 }} display="flex" justifyContent="flex-end">
              <IconButton color="error" onClick={() => removeCard(card.id)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          )}

          {hideInArabicFields && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Color Code" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomColorPicker
                  name={`about_us_section3_card_color_${card.id}`}
                  value={
                    formData[`about_us_section3_card_color_${card.id}`] || ""
                  }
                  onChange={handleChange}
                />
              </Grid>
            </>
          )}

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Card Title">
              <TranslateButton />
            </CustomLabel>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name={`about_us_section3_card_title_${card.id}`}
              value={formData[`about_us_section3_card_title_${card.id}`] || ""}
              onChange={handleChange}
              placeholder={hideInArabicFields ? "Card Title" : ""}
              lang={lang}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Card Description">
              <TranslateButton />
            </CustomLabel>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomEditor
              name={`about_us_section3_card_description_${card.id}`}
              value={
                formData[`about_us_section3_card_description_${card.id}`] || ""
              }
              onChange={(content) =>
                handleEditorChange(
                  `about_us_section3_card_description_${card.id}`,
                  content
                )
              }
              lang={lang}
              editorOptions={editorOptions}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Link Name">
              <TranslateButton />
            </CustomLabel>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name={`about_us_section3_linkname_${card.id}`}
              value={formData[`about_us_section3_linkname_${card.id}`] || ""}
              onChange={handleChange}
              placeholder={hideInArabicFields ? "Link Name" : ""}
              lang={lang}
            />
          </Grid>

          {hideInArabicFields && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <CustomLabel label="Link URL" />
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <CustomTextField
                  name={`about_us_section3_link_url_${card.id}`}
                  value={
                    formData[`about_us_section3_link_url_${card.id}`] || ""
                  }
                  onChange={handleChange}
                  placeholder="Link URL"
                  lang={lang}
                />
              </Grid>
            </>
          )}
        </Grid>
      ))}

      {/* Add Button */}
      <Grid size={{ xs: 12, md: 8 }} sx={{ float: "right" }}>
        <Button
          color="secondary"
          fullWidth
          variant="text"
          onClick={addCard}
          startIcon={<AddCircleOutline />}
          sx={{ border: "1px dashed #ddd" }}
        >
          Add Another Card
        </Button>
      </Grid>
    </Grid>
  );
};

export default AboutUsCardSection;
