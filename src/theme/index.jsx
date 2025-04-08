import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#021340",
    },
    secondary: {
      main: "#ff9f43", // Custom secondary color
      light: "#FFEDD4",
    },
    background: {
      default: "#f4f4f4", // Default background color
      paper: "#fff",
    },
    text: {
      primary: "#333",
      secondary: "#666",
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        border: "none",
        root: {
          fontSize: "12px",
          textTransform: "none", // Disable uppercase text in buttons
          borderRadius: 8, // Customize button border-radius
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff", // White background for the AppBar
          color: "#1976d2", // Optional: You can set the primary color for text or icons
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#BDBDBD", // Initial color for the icon
          "&:hover": {
            color: "#021340", // Color when hovered
          },
          "&:focus": {
            outline: "none", // Removes the default focus outline
            border: "none", // Removes the border when focused
          },
          "&:active": {
            outline: "none", // Removes the active focus outline
            border: "none", // Removes the border when active
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            backgroundColor: "#FFFFFF",
            borderRadius: "0.375rem",
            color: "#383838",
            padding: ".375rem .75rem",
            border: "none",
            fontSize: "13px", // Reduce placeholder size
            "&::placeholder": {
              fontSize: "13px", // Ensure placeholder is also affected
            },
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#FFFFFF",
            borderRadius: "0.375rem",
            color: "#383838",
            fontSize: "13px",
            "& fieldset": {
              border: "1px solid #dee2e6",
            },
            // Remove hover effect (keep the same border)
            "&:hover fieldset": {
              border: "1px solid #dee2e6 !important",
            },

            // Remove focus effect (keep the same border)
            "&.Mui-focused fieldset": {
              border: "1px solid #dee2e6 !important",
            },
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: "0px !important", // Remove padding globally
          "& .MuiInputBase-input": {
            backgroundColor: "#FFFFFF",
            borderRadius: "0.375rem",
            padding: ".375rem .75rem", // Ensure text inside input has padding
            border: "none",
            fontSize: "13px",
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#FFFFFF",
            borderRadius: "0.375rem",
            fontSize: "13px",
            "& fieldset": {
              border: "1px solid #dee2e6",
            },
            "&:hover fieldset": {
              border: "1px solid #dee2e6 !important",
            },
            "&.Mui-focused fieldset": {
              border: "1px solid #dee2e6 !important",
            },
          },
          // Fix for password field (ensuring padding for inputs with adornments)
          "& .MuiOutlinedInput-inputAdornedEnd": {
            paddingRight: "40px !important", // Adjust space for icon
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          maxHeight: "2em",
          marginLeft: "8px",
          marginRight: "16px", // Ensuring spacing around the icon
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            backgroundColor: "#FFFFFF",
            borderRadius: "0.375rem",
            // color: "#383838",
            padding: ".375rem .75rem",
            border: "none",
            fontSize: "13px",
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#FFFFFF",
            borderRadius: "0.375rem",
            fontSize: "13px",
            // color: "#383838",
            "& fieldset": {
              border: "1px solid #dee2e6",
            },
            // Remove hover effect (keep the same border)
            "&:hover fieldset": {
              border: "1px solid #dee2e6 !important",
            },

            // Remove focus effect (keep the same border)
            "&.Mui-focused fieldset": {
              border: "1px solid #dee2e6 !important",
            },
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            backgroundColor: "#FFFFFF",
            borderRadius: "0.375rem",
            color: "#383838",
            padding: ".375rem .75rem",
            border: "none",
            fontSize: "13px",
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#FFFFFF",
            borderRadius: "0.375rem",
            color: "#383838",
            fontSize: "13px",
            "& fieldset": {
              border: "1px solid #dee2e6",
            },
            // Remove hover effect (keep the same border)
            "&:hover fieldset": {
              border: "1px solid #dee2e6 !important",
            },

            // Remove focus effect (keep the same border)
            "&.Mui-focused fieldset": {
              border: "1px solid #dee2e6 !important",
            },
          },
        },
        label: {
          fontSize: "13px",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            backgroundColor: "#FFFFFF",
            borderRadius: "0.375rem",
            color: "#383838",
            padding: ".375rem .75rem",
            border: "none",
            fontSize: "13px",
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#FFFFFF",
            borderRadius: "0.375rem",
            color: "#383838",
            fontSize: "13px",
            "& fieldset": {
              border: "1px solid #dee2e6",
            },
            // Remove hover effect (keep the same border)
            "&:hover fieldset": {
              border: "1px solid #dee2e6 !important",
            },

            // Remove focus effect (keep the same border)
            "&.Mui-focused fieldset": {
              border: "1px solid #dee2e6 !important",
            },
            "&.MuiOutlinedInput-root .MuiAutocomplete-input": {
              padding: ".375rem .75rem", // Updated padding
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            backgroundColor: "#FFFFFF",
            borderRadius: "0.375rem",
            // color: "#383838",
            padding: ".375rem .75rem",
            border: "none",
            fontSize: "13px",
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#FFFFFF",
            borderRadius: "0.375rem",
            fontSize: "13px",
            // color: "#383838",
            "& fieldset": {
              border: "1px solid #dee2e6",
            },
            // Remove hover effect (keep the same border)
            "&:hover fieldset": {
              border: "1px solid #dee2e6 !important",
            },

            // Remove focus effect (keep the same border)
            "&.Mui-focused fieldset": {
              border: "1px solid #dee2e6 !important",
            },
          },
        },
      },
    },
  },
});

export default theme;
