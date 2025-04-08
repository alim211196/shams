import {
  Button,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const CustomButton = ({
  type = "button",
  variant = "contained",
  color = "primary",
  loading,
  children,
  disabled = false,
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Button
      fullWidth={isMobile}
      type={type}
      variant={variant}
      color={color}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: "white" }} />
      ) : (
        children
      )}
    </Button>
  );
};

export default CustomButton;
