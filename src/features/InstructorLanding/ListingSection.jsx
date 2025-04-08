import React, { useEffect, useState } from "react";
import CustomLabel from "../../common/CustomLabel";
import TranslateButton from "../../common/TranslateButton";
import CustomTextField from "../../common/CustomTextField";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, IconButton } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";

const ListingSection = ({
  lang,
  hideInArabicFields,
  formData,
  setFormData,
  handleChange,
  step,
}) => {
  const [cards, setCards] = useState([]);

  // Populate cards from formData when component mounts
  useEffect(() => {
    const existingCards = Object.keys(formData)
      .filter((key) => key.startsWith("instructor_section4_bullet_list_"))
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
        : [
            { id: 0 },
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
          ]
    );
  }, [formData]);

  // Function to add a new card
  const addCard = () => {
    const newId = cards.length;
    setCards([...cards, { id: newId }]);

    setFormData((prev) => ({
      ...prev,
      [`instructor_section4_step${step}_bullet_list_${newId}`]: "",
    }));
  };

  // Function to remove a card
  const removeCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));

    setFormData((prev) => {
      const updatedFormData = { ...prev };
      delete updatedFormData[
        `instructor_section4_step${step}_bullet_list_${id}`
      ];
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
            <CustomLabel label={`List ${step}`}>
              <TranslateButton />
            </CustomLabel>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <CustomTextField
              name={`instructor_section4_step${step}_bullet_list_${card.id}`}
              value={
                formData[
                  `instructor_section4_step${step}_bullet_list_${card.id}`
                ] || ""
              }
              onChange={handleChange}
              placeholder={hideInArabicFields ? `List ${step}` : ""}
              lang={lang}
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

export default ListingSection;
