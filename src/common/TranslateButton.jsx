import { GTranslate } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

const TranslateButton = () => {
  return (
    <Tooltip title="Translatable" arrow>
      <IconButton sx={{ color: "tomato", padding: "4px" }} size="small">
        <GTranslate sx={{ fontSize: 16 }} />
      </IconButton>
    </Tooltip>
  );
};

export default TranslateButton;
