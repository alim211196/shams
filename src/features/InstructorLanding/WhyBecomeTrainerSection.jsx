import React, { useEffect, useState } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, IconButton } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import CustomEditor from "../../common/CustomEditor";
import { editorOptions } from "../../utils/helper";

const WhyBecomeTrainerSection = ({
  lang,
  hideInArabicFields,
  formData,
  setFormData,
  handleChange,
  handleEditorChange,
}) => {
  const [cards, setCards] = useState([]);

  // Populate cards from formData when component mounts
  useEffect(() => {
    const existingCards = Object.keys(formData)
      .filter((key) => key.startsWith("instructor_section2_card_title_"))
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
      [`instructor_section2_card_title_${newId}`]: "",
      [`instructor_section2_card_description_${newId}`]: "",
    }));
  };

  // Function to remove a card
  const removeCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));

    setFormData((prev) => {
      const updatedFormData = { ...prev };
      delete updatedFormData[`instructor_section2_card_title_${id}`];
      delete updatedFormData[`instructor_section2_card_description_${id}`];
      return updatedFormData;
    });
  };

  return (
    <Grid size={{ xs: 12 }}>
      {cards.map((card) => (
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
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomLabel label="Card Title">
              <TranslateButton />
            </CustomLabel>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name={`instructor_section2_card_title_${card.id}`}
              value={
                formData[`instructor_section2_card_title_${card.id}`] || ""
              }
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
              name={`instructor_section2_card_description_${card.id}`}
              value={
                formData[`instructor_section2_card_description_${card.id}`] ||
                ""
              }
              onChange={(content) =>
                handleEditorChange(
                  [`instructor_section2_card_description_${card.id}`],
                  content
                )
              }
              lang={lang}
              editorOptions={editorOptions}
            />
          </Grid>
        </Grid>
      ))}
      <Grid size={{ xs: 12, md: 4 }} />

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

export default WhyBecomeTrainerSection;
